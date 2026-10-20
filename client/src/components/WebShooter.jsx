import { useState, useEffect, useRef } from 'react';
import { useSpiderTheme } from '../context/SpiderThemeContext';

export default function WebShooter() {
  const { isSpiderMode } = useSpiderTheme();
  const [webs, setWebs] = useState([]);
  const [splats, setSplats] = useState([]);
  const nextId = useRef(0);

  // Shoot a web ball and create an impact pasted spider web
  const shootWeb = (targetX, targetY) => {
    const id = nextId.current++;
    // Origin is bottom right or bottom left depending on click position
    const originX = targetX < window.innerWidth / 2 ? 0 : window.innerWidth;
    const originY = window.innerHeight;

    // Control point for curved elastic web trajectory
    const midX = (originX + targetX) / 2 + (targetX < window.innerWidth / 2 ? 50 : -50);
    const midY = (originY + targetY) / 2 - 40;

    const newWeb = {
      id,
      startX: originX,
      startY: originY,
      targetX,
      targetY,
      midX,
      midY,
    };

    setWebs((prev) => [...prev, newWeb]);

    // Fast flight time for web ball (180ms)
    setTimeout(() => {
      // Add pasted web splat at target
      const splatId = id;
      const rotation = Math.random() * 360;
      const scale = 0.85 + Math.random() * 0.35;

      setSplats((prev) => [
        ...prev,
        {
          id: splatId,
          x: targetX,
          y: targetY,
          rotation,
          scale,
        },
      ]);

      // Remove splat after 2.8 seconds
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== splatId));
      }, 2800);
    }, 180);

    // Remove the web flight strand after 1.2s
    setTimeout(() => {
      setWebs((prev) => prev.filter((w) => w.id !== id));
    }, 1200);
  };

  useEffect(() => {
    if (!isSpiderMode) return;

    const handleClick = (e) => {
      const target = e.target;
      // Ignore clicks on inputs, buttons, or links
      if (
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.theme-master-toggle') ||
        target.closest('.hanging-spidey-anchor')
      ) {
        return;
      }

      shootWeb(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isSpiderMode]);

  if (!isSpiderMode) return null;

  return (
    <div className="web-shooter-layer">
      {/* SVG Canvas for dynamic web strands & flight ball */}
      <svg className="web-shooter-svg">
        <defs>
          <filter id="silkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00d2ff" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.9" />
          </filter>
        </defs>

        {webs.map((w) => (
          <g key={w.id} className="web-strand-group">
            {/* Outer Cyan Glow Silk Strand */}
            <path
              d={`M ${w.startX} ${w.startY} Q ${w.midX} ${w.midY} ${w.targetX} ${w.targetY}`}
              stroke="#00d2ff"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              className="web-strand-glow"
            />
            {/* Core White Silk Line */}
            <path
              d={`M ${w.startX} ${w.startY} Q ${w.midX} ${w.midY} ${w.targetX} ${w.targetY}`}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              className="web-strand-core"
            />

            {/* High-Velocity Flying Web Ball Projectile */}
            <circle
              cx={w.startX}
              cy={w.startY}
              r="7"
              fill="#ffffff"
              filter="url(#silkGlow)"
              className="web-ball-projectile"
              style={{
                '--start-x': `${w.startX}px`,
                '--start-y': `${w.startY}px`,
                '--target-x': `${w.targetX}px`,
                '--target-y': `${w.targetY}px`,
              }}
            />
          </g>
        ))}
      </svg>

      {/* Realistic Pasted Spider Webs on the screen upon impact */}
      {splats.map((s) => (
        <div
          key={`splat-${s.id}`}
          className="pasted-web-splat"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg) scale(${s.scale})`,
          }}
        >
          <svg viewBox="0 0 140 140" width="120" height="120" fill="none">
            {/* Outer Web Ring Anchors */}
            <polygon
              points="70,10 115,28 128,70 112,112 70,130 28,112 12,70 25,28"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.2"
              fill="rgba(255, 255, 255, 0.04)"
            />
            {/* Middle Web Ring */}
            <polygon
              points="70,26 102,40 112,70 100,100 70,114 40,100 28,70 38,40"
              stroke="rgba(255, 255, 255, 0.75)"
              strokeWidth="1.5"
              fill="rgba(0, 210, 255, 0.06)"
            />
            {/* Inner Web Ring */}
            <polygon
              points="70,44 88,52 94,70 88,88 70,96 52,88 46,70 52,52"
              stroke="#ffffff"
              strokeWidth="1.8"
              fill="rgba(255, 255, 255, 0.15)"
            />

            {/* Radial Web Spokes Extending from Center */}
            <line x1="70" y1="70" x2="70" y2="8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="70" x2="118" y2="25" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="132" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="70" x2="115" y2="115" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="70" y2="132" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="70" x2="25" y2="115" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="8" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="70" x2="22" y2="25" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

            {/* Center Core Silk Knot */}
            <circle cx="70" cy="70" r="6" fill="#ffffff" />
            <circle cx="70" cy="70" r="10" stroke="#00d2ff" strokeWidth="1.5" fill="none" opacity="0.8" />

            {/* Sticky Web Droplets */}
            <circle cx="68" cy="22" r="2.2" fill="#ffffff" />
            <circle cx="106" cy="42" r="2" fill="#ffffff" />
            <circle cx="114" cy="74" r="2.5" fill="#ffffff" />
            <circle cx="66" cy="116" r="2" fill="#ffffff" />
            <circle cx="34" cy="98" r="2.2" fill="#ffffff" />
            <circle cx="26" cy="66" r="2" fill="#ffffff" />
          </svg>
        </div>
      ))}
    </div>
  );
}
