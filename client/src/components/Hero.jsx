import { useState, useEffect } from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { useSpiderTheme } from '../context/SpiderThemeContext';
import portfolioData from '../data/portfolioData';
import '../styles/hero.css';

export default function Hero() {
  const { personal } = portfolioData;
  const { isSpiderMode } = useSpiderTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Interpolate progress smoothly from 0 to 1 between 0px and 240px scroll
      const p = Math.min(Math.max(y / 240, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive 3D mouse parallax tracking
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    // Normalized coordinates from -1 to 1
    const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Seamless Ambient Vignette (Uniform deep black, no blue split) */}
      <div className="hero-atmosphere-glow" />

      <div className="container">
        <div className="hero-grid">
          {/* LEFT COLUMN: Interactive 3D Portrait & Dual-Themed Adaptive Backdrop */}
          <div className="hero-photo-column">
            <div
              className="hero-photo-blend-wrapper"
              style={{
                transform: `translateY(-${scrollProgress * 50}px)`,
              }}
            >
              {/* DYNAMIC ADAPTIVE BACKDROP:
                  - Normal Mode: Obsidian Dark Tech Disc with Luminous Electric-Cyan Rim Glow & Orbital Compass
                  - Spider-Verse Mode: Multiverse Neon Web Radar Halo with Concentric Crimson/Cyan Energy
              */}
              <div className={`hero-backdrop-system ${isSpiderMode ? 'theme-spider' : 'theme-normal'}`}>
                {/* Ambient Depth Aura */}
                <div className="backdrop-ambient-glow" />

                {/* Primary Geometric Depth Disc with mouse parallax */}
                <div
                  className="backdrop-disc-main"
                  style={{
                    transform: `translate(calc(-50% + ${mousePos.x * -16}px), calc(-50% + ${mousePos.y * -14}px))`,
                  }}
                >
                  <div className="backdrop-inner-grid" />
                  <div className="backdrop-specular-sheen" />
                </div>

                {/* Rotating Orbital Compass / Web Radar Ring */}
                <div
                  className="backdrop-orbit-ring"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${mousePos.x * 15}deg)`,
                  }}
                />

                {/* Floating Secondary Accent Glass Sphere */}
                <div
                  className="backdrop-accent-sphere"
                  style={{
                    transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 18}px)`,
                  }}
                />
              </div>

              {/* Floating Chip 1 — Top Left */}
              <div
                className="hero-floating-chip chip-top-left"
                style={{
                  transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -10}px)`,
                }}
              >
                <span className="chip-icon">{isSpiderMode ? '🎬' : '🚀'}</span>
                <span className="chip-text">{isSpiderMode ? 'Digital Editing' : 'Full Stack Dev'}</span>
              </div>

              {/* Floating Chip 2 — Bottom Right */}
              <div
                className="hero-floating-chip chip-bottom-right"
                style={{
                  transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 12}px)`,
                }}
              >
                <span className="chip-icon">{isSpiderMode ? '✍️' : '🎨'}</span>
                <span className="chip-text">{isSpiderMode ? 'Content Design' : 'UI & UX Design'}</span>
              </div>

              {/* Floating Chip 3 — Bottom Left */}
              <div
                className="hero-floating-chip chip-bottom-left"
                style={{
                  transform: `translate(${mousePos.x * -10}px, ${mousePos.y * 14}px)`,
                }}
              >
                <span className="chip-icon">{isSpiderMode ? '💪' : '🤖'}</span>
                <span className="chip-text">{isSpiderMode ? 'Fitness Blog' : 'AI & ML'}</span>
              </div>

              {/* 3D Organic Portrait Stage with mouse tilt & bottom fade */}
              <div
                className="hero-portrait-stage"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 6}deg)`,
                }}
              >
                <img
                  src="/profile-cutout.png"
                  onError={(e) => {
                    e.currentTarget.src = '/profile.jpg';
                  }}
                  alt={personal.name}
                  className="hero-blended-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean, Refined Hero Narrative (Neat Typography, No Clutter) */}
          <div
            className="hero-content"
            style={{
              transform: `translateY(-${scrollProgress * 35}px)`,
            }}
          >
            {/* Clean Greeting Badge */}
            <div
              className="hero-greeting-badge hero-anim-item"
              style={{
                transform: `translateX(-${scrollProgress * 14}px)`,
                opacity: Math.max(0.4, 1 - scrollProgress * 0.7),
              }}
            >
              <span className="hero-greeting-dot" />
              <span className="hero-greeting-text">HELLO, I'M</span>
            </div>

            {/* Neat Balanced Heading */}
            <h1
              className="hero-name hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 20}px)`,
              }}
            >
              {personal.name}
            </h1>

            {/* Role & Degree Line (No redundant red badge) */}
            <div
              className="hero-role-wrapper hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 15}px)`,
              }}
            >
              <div className="hero-role">
                <span className="hero-role-main">{personal.role}</span>
                <span className="hero-role-dot">•</span>
                <span className="hero-role-sub">{personal.degreeTag}</span>
              </div>
            </div>

            {/* Description (Neat & Breathable) */}
            <p
              className="hero-description hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 12}px)`,
              }}
            >
              {personal.description}
            </p>

            {/* CTA Buttons with Sliding Interactive Micro-Animations */}
            <div
              className="hero-actions hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 8}px)`,
              }}
            >
              <button
                className="btn-spider-primary"
                onClick={handleScrollToProjects}
                id="btn-view-work"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight size={17} className="btn-arrow-slide" />
              </button>

              <a
                href={personal.resumeUrl}
                download="Siva_Saravana_Kumar_Resume.pdf"
                className="btn-spider-secondary"
                id="btn-download-resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={17} className="btn-download-icon" />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>

            {/* Clean Highlight Chips */}
            <div
              className="hero-highlights hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 5}px)`,
              }}
            >
              <div className="highlight-item">
                <span className="highlight-label">Institution</span>
                <span className="highlight-value">Kongu Engineering College</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Graduation</span>
                <span className="highlight-value">2027 (CGPA: 7.39)</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Location</span>
                <span className="highlight-value">Tiruppur, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
