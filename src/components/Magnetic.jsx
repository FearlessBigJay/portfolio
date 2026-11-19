import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { hasFinePointer } from "../hooks/useSiteMotion";

/**
 * Pulls its child a few pixels toward the cursor, springing back on leave.
 * Only on fine pointers, and never with reduced motion.
 */
const Magnetic = ({ children, strength = 0.28 }) => {
  const { reducedMotion } = useTheme();
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (event) => {
    if (reducedMotion || !hasFinePointer() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} className="inline-flex" style={{ x, y }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.span>
  );
};

export default Magnetic;
