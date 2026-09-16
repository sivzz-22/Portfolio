import { useEffect, useRef } from 'react';

export default function SpiderWebBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes for ambient web & floating embers
    const particleCount = Math.min(35, Math.floor(width / 40));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(230, 36, 41, ' : 'rgba(18, 102, 241, ',
        baseAlpha: Math.random() * 0.4 + 0.1,
      });
    }

    // Corner web nodes for Spider-Man geometry
    const drawCornerWeb = (originX, originY, radius, angleStart, angleEnd) => {
      const rings = 5;
      const spokes = 6;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx.lineWidth = 1;

      // Radial spokes
      for (let s = 0; s <= spokes; s++) {
        const angle = angleStart + (s / spokes) * (angleEnd - angleStart);
        const ex = originX + Math.cos(angle) * radius;
        const ey = originY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      // Concentric web rings
      for (let r = 1; r <= rings; r++) {
        const ringRadius = (r / rings) * radius;
        ctx.beginPath();
        for (let s = 0; s <= spokes; s++) {
          const angle = angleStart + (s / spokes) * (angleEnd - angleStart);
          const px = originX + Math.cos(angle) * ringRadius;
          const py = originY + Math.sin(angle) * ringRadius;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle corner web matrices
      const webSize = Math.min(width * 0.28, 380);
      drawCornerWeb(0, 0, webSize, 0, Math.PI / 2);
      drawCornerWeb(width, 0, webSize, Math.PI / 2, Math.PI);
      drawCornerWeb(0, height, webSize, -Math.PI / 2, 0);
      drawCornerWeb(width, height, webSize, Math.PI, (3 * Math.PI) / 2);

      // Update and draw floating ambient embers
      tick += 0.015;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(tick + i) * 0.15;
        const currentAlpha = Math.max(0.05, p.baseAlpha + pulse);

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color.includes('230') ? 'rgba(230, 36, 41, 0.6)' : 'rgba(18, 102, 241, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw gentle web linkages between close particles near screen edges
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const edgeDistance = Math.min(p.x, width - p.x, p.y, height - p.y);
            // Higher link opacity near edges, almost invisible in center to protect text
            const edgeFactor = Math.max(0, 1 - edgeDistance / (width * 0.35));
            const linkAlpha = (1 - dist / 120) * 0.08 * edgeFactor;

            if (linkAlpha > 0.005) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${linkAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
