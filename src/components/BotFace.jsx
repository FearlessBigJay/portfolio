import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { hasFinePointer } from "../hooks/useSiteMotion";

/**
 * The BigJay AI assistant's face: two eyes that follow the cursor around the
 * page and blink now and then. With reduced motion (or on touch screens) the
 * eyes simply look forward.
 */
const BotFace = () => {
  const { reducedMotion } = useTheme();
  const faceRef = useRef(null);

  useEffect(() => {
    const face = faceRef.current;
    if (!face || reducedMotion) return undefined;

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = face.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 160) * 2.4;
        face.style.setProperty("--ex", `${((dx / dist) * reach).toFixed(2)}px`);
        face.style.setProperty("--ey", `${((dy / dist) * reach).toFixed(2)}px`);
      });
    };
    if (hasFinePointer()) window.addEventListener("pointermove", onMove, { passive: true });

    let blinkTimer = 0;
    const blink = () => {
      face.classList.add("is-blinking");
      window.setTimeout(() => face.classList.remove("is-blinking"), 170);
      blinkTimer = window.setTimeout(blink, 2800 + Math.random() * 3500);
    };
    blinkTimer = window.setTimeout(blink, 1800);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(blinkTimer);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  return (
    <span ref={faceRef} className="bot-face" aria-hidden="true">
      <span className="bot-eye">
        <i />
      </span>
      <span className="bot-eye">
        <i />
      </span>
    </span>
  );
};

export default BotFace;
