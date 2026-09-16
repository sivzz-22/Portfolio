import { useEffect, useRef, useState } from 'react';

export default function SpiderCrawlers() {
  const [enabled, setEnabled] = useState(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for evasion
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initialize 6 spiders around edges
    const spiderCount = 6;
    const spiders = [];

    for (let i = 0; i < spiderCount; i++) {
      spiders.push({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: 1.2 + Math.random() * 0.8,
        baseSpeed: 1.2 + Math.random() * 0.8,
        size: 14 + Math.random() * 4,
        legPhase: Math.random() * Math.PI * 2,
        pauseTicks: 0,
        color: i % 2 === 0 ? '#e61a22' : '#1e2430',
        accentColor: i % 2 === 0 ? '#ff4d55' : '#00d2ff',
      });
    }

    let animId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const sp of spiders) {
        // Check distance to mouse
        const dx = sp.x - mouseX;
        const dy = sp.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // EVASION: Scurry away if mouse is nearby!
        if (dist < 130) {
          sp.angle = Math.atan2(dy, dx); // Run away from mouse
          sp.speed = sp.baseSpeed * 2.8;
          sp.pauseTicks = 0;
        } else if (sp.pauseTicks > 0) {
          sp.pauseTicks--;
          sp.speed = 0;
        } else {
          sp.speed = sp.baseSpeed;
          // Random slight turn
          sp.angle += (Math.random() - 0.5) * 0.15;

          // Occasional random brief pause
          if (Math.random() < 0.008) {
            sp.pauseTicks = 30 + Math.floor(Math.random() * 45);
          }
        }

        // Move forward
        sp.x += Math.cos(sp.angle) * sp.speed;
        sp.y += Math.sin(sp.angle) * sp.speed;

        // Wrap around screen edges
        if (sp.x < -30) sp.x = width + 20;
        if (sp.x > width + 30) sp.x = -20;
        if (sp.y < -30) sp.y = height + 20;
        if (sp.y > height + 30) sp.y = -20;

        // Animate leg oscillation when moving
        if (sp.speed > 0) {
          sp.legPhase += 0.25 * (sp.speed / sp.baseSpeed);
        }

        // Draw Spider Body & 8 Animated Legs
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.angle + Math.PI / 2); // Rotate to face forward

        const s = sp.size;

        // 8 Animated Legs (4 pairs)
        ctx.strokeStyle = sp.color;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 4 leg angles relative to body
        const legAngles = [-0.9, -0.4, 0.4, 0.9];

        for (let j = 0; j < 4; j++) {
          const legPhaseOffset = j % 2 === 0 ? 0 : Math.PI;
          const swing = Math.sin(sp.legPhase + legPhaseOffset) * 0.35;

          // Left Leg
          ctx.beginPath();
          const lAngle = -Math.PI / 2 + legAngles[j] + swing;
          const lJointX = Math.cos(lAngle) * (s * 0.7);
          const lJointY = Math.sin(lAngle) * (s * 0.7);
          const lTipX = Math.cos(lAngle - 0.4) * (s * 1.35);
          const lTipY = Math.sin(lAngle - 0.4) * (s * 1.35);
          ctx.moveTo(0, 0);
          ctx.lineTo(lJointX, lJointY);
          ctx.lineTo(lTipX, lTipY);
          ctx.stroke();

          // Right Leg
          ctx.beginPath();
          const rAngle = Math.PI / 2 - legAngles[j] - swing;
          const rJointX = Math.cos(rAngle) * (s * 0.7);
          const rJointY = Math.sin(rAngle) * (s * 0.7);
          const rTipX = Math.cos(rAngle + 0.4) * (s * 1.35);
          const rTipY = Math.sin(rAngle + 0.4) * (s * 1.35);
          ctx.moveTo(0, 0);
          ctx.lineTo(rJointX, rJointY);
          ctx.lineTo(rTipX, rTipY);
          ctx.stroke();
        }

        // Spider Abdomen (Back)
        ctx.beginPath();
        ctx.ellipse(0, s * 0.3, s * 0.32, s * 0.45, 0, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.fill();

        // Spider Thorax & Head (Front)
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.25, s * 0.24, s * 0.28, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#0a0d14';
        ctx.fill();
        ctx.strokeStyle = sp.accentColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glowing Spider Eyes (Red / Cyan dots)
        ctx.fillStyle = sp.accentColor;
        ctx.beginPath();
        ctx.arc(-s * 0.1, -s * 0.4, 1.4, 0, Math.PI * 2);
        ctx.arc(s * 0.1, -s * 0.4, 1.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  return (
    <div className="spider-crawlers-layer">
      {enabled && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      )}
      {/* Spider Crawler Toggle Button */}
      <button
        className={`crawler-toggle-btn ${enabled ? 'active' : ''}`}
        onClick={() => setEnabled(!enabled)}
        title="Toggle screen-crawling spiders"
      >
        <span>🕷️ {enabled ? 'CRAWLERS: ON' : 'CRAWLERS: OFF'}</span>
      </button>
    </div>
  );
}
