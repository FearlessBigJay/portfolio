import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { hasFinePointer } from "../hooks/useSiteMotion";

/**
 * Ambient "fireflies" behind the hero, in the brand colour: a lightweight
 * stand-in for a background video. They drift slowly and gather toward the
 * cursor, linking up near it. Pauses when the hero is off-screen or the tab is
 * hidden, and is not drawn at all with reduced motion.
 */
const HeroParticles = () => {
  const { reducedMotion, palette } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return undefined;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--signal").trim() || "#ffc629";
    const finePointer = hasFinePointer();

    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let inView = true;
    const pointer = { x: 0, y: 0, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, Math.max(22, (width * height) / 20000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const step = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      for (const p of particles) {
        let near = 0;
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            near = 1 - dist / 180;
            p.vx += (dx / dist) * 0.012 * near;
            p.vy += (dy / dist) * 0.012 * near;
          }
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx + Math.cos(time / 2400 + p.phase) * 0.12;
        p.y += p.vy + Math.sin(time / 2800 + p.phase) * 0.12;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        p.near = near;

        const twinkle = 0.45 + 0.35 * Math.sin(time / 900 + p.phase * 3);
        ctx.globalAlpha = Math.min(0.9, twinkle * 0.5 + near * 0.6) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = Math.min(1, twinkle + near * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Faint links between fireflies that are close to the cursor.
      if (pointer.active) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i += 1) {
          const a = particles[i];
          if (!a.near) continue;
          for (let j = i + 1; j < particles.length; j += 1) {
            const b = particles[j];
            if (!b.near) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 110) {
              ctx.globalAlpha = (1 - d / 110) * Math.min(a.near, b.near) * 0.7;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (inView && !document.hidden) frame = requestAnimationFrame(step);
    };

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    });
    io.observe(host);
    document.addEventListener("visibilitychange", start);
    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      ctx.clearRect(0, 0, width, height);
    };
  }, [reducedMotion, palette]);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
};

export default HeroParticles;
