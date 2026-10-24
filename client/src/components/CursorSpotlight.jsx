import { useEffect, useRef } from 'react';
import { useSpiderTheme } from '../context/SpiderThemeContext';

/**
 * CursorSpotlight — Ambient glow that smoothly follows the cursor.
 * Uses direct DOM manipulation (ref + RAF) for 60fps performance
 * without causing React re-renders on every mouse move.
 */
export default function CursorSpotlight() {
  const { isSpiderMode } = useSpiderTheme();
  const spotRef = useRef(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const current = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only on desktop with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth interpolation (lerp) — follows cursor gently
      const lerpFactor = 0.07;
      current.current.x += (pos.current.x - current.current.x) * lerpFactor;
      current.current.y += (pos.current.y - current.current.y) * lerpFactor;

      if (spotRef.current) {
        spotRef.current.style.left = `${current.current.x}px`;
        spotRef.current.style.top = `${current.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className={`cursor-spotlight${isSpiderMode ? ' spider-mode' : ''}`}
      aria-hidden="true"
    />
  );
}

