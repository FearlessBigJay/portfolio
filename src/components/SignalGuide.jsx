import { useEffect, useRef } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { hasFinePointer, sections, useActiveSection, useScrolledPast } from "../hooks/useSiteMotion";

/**
 * A small "signal" companion that always points to the next section.
 * Its light leans a few pixels toward the cursor (fine pointers only, never
 * with reduced motion). At the last section it becomes "Back to top".
 */
const SignalGuide = () => {
  const { reducedMotion } = useTheme();
  const active = useActiveSection();
  const visible = useScrolledPast(typeof window !== "undefined" ? window.innerHeight * 0.6 : 400);
  const orbRef = useRef(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return undefined;
    if (reducedMotion || !hasFinePointer()) {
      orb.style.setProperty("--lx", "0px");
      orb.style.setProperty("--ly", "0px");
      return undefined;
    }

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = orb.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, dist / 240) * 5;
        orb.style.setProperty("--lx", `${((dx / dist) * reach).toFixed(2)}px`);
        orb.style.setProperty("--ly", `${((dy / dist) * reach).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  const index = Math.max(
    0,
    sections.findIndex((s) => s.id === active),
  );
  const next = sections[index + 1];
  const atEnd = !next;
  const target = atEnd ? sections[0] : next;

  return (
    <a
      className="signal"
      href={`#${target.id}`}
      data-hidden={!visible}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      aria-label={atEnd ? "Back to top" : `Next section: ${next.label}`}
    >
      <span ref={orbRef} className="signal-orb" aria-hidden="true">
        <span />
      </span>
      <span className="signal-text" aria-hidden="true">
        <small>
          {atEnd
            ? "End of page"
            : `Next · ${String(index + 2).padStart(2, "0")}/${String(sections.length).padStart(2, "0")}`}
        </small>
        <strong>{atEnd ? "Back to top" : next.label}</strong>
      </span>
      {atEnd ? (
        <FaArrowUp className="signal-arrow" aria-hidden="true" size={12} />
      ) : (
        <FaArrowDown className="signal-arrow" aria-hidden="true" size={12} />
      )}
    </a>
  );
};

export default SignalGuide;
