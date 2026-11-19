import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { hasFinePointer } from "../hooks/useSiteMotion";
import { portfolioProfile } from "../data/portfolioProfile";
import LocalTime from "./LocalTime";

// The layers of a full-stack product, connected to the person who builds them.
// Coordinates are percentages of the square stage.
const nodes = [
  { label: "Interface", detail: "React", x: 12, y: 15, depth: 14, color: "var(--signal)" },
  { label: "AI", detail: "inference", x: 88, y: 11, depth: 20, color: "var(--violet)" },
  { label: "API", detail: "Node.js", x: 93, y: 58, depth: 10, color: "var(--coral)" },
  { label: "Data", detail: "MongoDB · SQL", x: 8, y: 66, depth: 16, color: "var(--signal)" },
];

const HeroNetwork = () => {
  const { reducedMotion } = useTheme();
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    if (reducedMotion || !hasFinePointer()) {
      stage.style.setProperty("--px", "0");
      stage.style.setProperty("--py", "0");
      return undefined;
    }

    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        stage.style.setProperty("--px", x.toFixed(3));
        stage.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  return (
    <div ref={stageRef} className="net">
      <svg className="net-lines" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <circle cx="50" cy="50" r="47" vectorEffect="non-scaling-stroke" />
        <circle cx="50" cy="50" r="40" vectorEffect="non-scaling-stroke" />
        {nodes.map((node, i) => (
          <line
            key={node.label}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            vectorEffect="non-scaling-stroke"
            style={{ "--i": i }}
          />
        ))}
      </svg>

      <div className="net-portrait">
        <img
          src="/HeroImg.png"
          width="728"
          height="968"
          alt="Portrait of Jah'swill Uchechi Emmanuel in a dark suit and tie"
          fetchPriority="high"
        />
      </div>

      <ul className="m-0 p-0 list-none" aria-hidden="true">
        {nodes.map((node, i) => (
          <li
            key={node.label}
            className="net-node"
            style={{ left: `${node.x}%`, top: `${node.y}%`, "--depth": `${node.depth}px`, "--c": node.color, "--i": i }}
          >
            <i />
            {node.label} <small>{node.detail}</small>
          </li>
        ))}
      </ul>

      <div className="status-card">
        <p className="status m-0" style={{ color: "var(--text)" }}>
          <span className="status-dot" aria-hidden="true" />
          {portfolioProfile.availability}
        </p>
        <p className="status m-0">
          <span className="sr-only">Local time in </span>
          {portfolioProfile.city} · <LocalTime />
        </p>
      </div>
    </div>
  );
};

export default HeroNetwork;
