import { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { useSpiderTheme } from '../context/SpiderThemeContext';
import portfolioData from '../data/portfolioData';
import '../styles/hero.css';

export default function Hero() {
  const { personal } = portfolioData;
  const { isSpiderMode } = useSpiderTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      // Interpolate progress smoothly from 0 to 1 between 0px and 220px scroll
      const p = Math.min(Math.max(y / 220, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Spider-Man Atmospheric Vignette */}
      <div className={`hero-atmosphere-glow ${!isSpiderMode ? 'clean-glow' : ''}`} />

      <div className="container">
        <div className="hero-grid">
          {/* LEFT COLUMN: Hero Portrait Photo with Morphing Circle Scroll */}
          <div className="hero-photo-column">
            <div
              className={`hero-photo-wrapper ${scrollProgress > 0.7 ? 'morphed-circle' : ''}`}
              style={{
                transform: `translateY(-${scrollProgress * 75}px)`,
              }}
            >
              {/* Spider-Sense Pulse Waves (only in Spider-Man Mode) */}
              {isSpiderMode && (
                <div
                  className="spider-sense-waves"
                  style={{ opacity: 1 - scrollProgress * 1.2 }}
                >
                  <span className="sense-wave wave-1" />
                  <span className="sense-wave wave-2" />
                  <span className="sense-wave wave-3" />
                </div>
              )}

              {/* Pulsing Red / Blue Spider Energy Backlight */}
              <div
                className={`hero-photo-backlight ${!isSpiderMode ? 'clean-backlight' : ''}`}
                style={{
                  borderRadius: scrollProgress > 0.4 ? '50%' : '36px',
                }}
              />

              <div
                className="hero-photo-frame"
                style={{
                  borderRadius: `${26 + (50 - 26) * scrollProgress}%`,
                  width: `calc(360px - (360px - 140px) * ${scrollProgress})`,
                  height: `calc(460px - (460px - 140px) * ${scrollProgress})`,
                }}
              >
                {/* Tech Corner Brackets */}
                {isSpiderMode && (
                  <>
                    <span className="photo-bracket top-left" style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }} />
                    <span className="photo-bracket top-right" style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }} />
                    <span className="photo-bracket bottom-left" style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }} />
                    <span className="photo-bracket bottom-right" style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }} />
                  </>
                )}

                {/* Animated Spider-Verse Character Portrait */}
                <img
                  src="/profile.jpg"
                  alt={personal.name}
                  className="hero-photo-img"
                  loading="eager"
                />

                {/* Spider-Man High-Tech HUD Reticle Overlay (Laser lines removed as requested) */}
                {isSpiderMode && (
                  <div
                    className="spider-hud-reticle"
                    style={{ opacity: Math.max(0, 1 - scrollProgress * 1.5) }}
                  >
                    <svg viewBox="0 0 100 100" className="reticle-svg">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(230, 36, 41, 0.45)" strokeWidth="1" strokeDasharray="5 7" />
                      <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(0, 210, 255, 0.4)" strokeWidth="1" strokeDasharray="3 5" />
                      <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeDasharray="2 4" />
                    </svg>
                  </div>
                )}

                {/* Spider Emblem Watermark Accent */}
                {isSpiderMode && (
                  <div
                    className="photo-spider-watermark"
                    style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#e62429">
                      <circle cx="12" cy="11" r="3" fill="#e62429" />
                      <ellipse cx="12" cy="15" rx="3.5" ry="4" fill="#e62429" />
                      <path d="M12 2 L12 8 M7 6 L10 10 M17 6 L14 10 M5 12 L9 12 M19 12 L15 12 M6 18 L10 15 M18 18 L14 15" stroke="#e62429" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}

                {/* Futuristic HUD Badge */}
                <div
                  className="photo-hud-badge"
                  style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
                >
                  <span className="photo-hud-dot" />
                  <span>{isSpiderMode ? 'SIVA // SPIDER-VERSE DEV' : 'SIVA // SOFTWARE ENGINEER'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Hero Narrative */}
          <div className="hero-content">
            <p className="hero-greeting">HELLO, I'M</p>

            <h1 className="hero-name">
              {personal.name}
            </h1>

            {/* Miles Morales Inspired Dynamic Role Tag */}
            <div className="hero-role-wrapper">
              <div className="hero-role">
                <span className="hero-role-main">{personal.role}</span>
                <span className="hero-role-dot">•</span>
                <span className="hero-role-sub">{personal.degreeTag}</span>
              </div>
              <div className="miles-script-tag">
                <span>{isSpiderMode ? 'FULL STACK WEB-SLINGER' : 'FULL STACK DEVELOPER'}</span>
              </div>
            </div>

            <p className="hero-description">
              {personal.description}
            </p>

            <div className="hero-actions">
              <button
                className="btn-spider-primary"
                onClick={handleScrollToProjects}
                id="btn-view-work"
              >
                <span>VIEW MY WORK</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={personal.resumeUrl}
                download="Siva_Saravana_Kumar_Resume.pdf"
                className="btn-spider-secondary"
                id="btn-download-resume"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>

            {/* Quick Resume Badges */}
            <div className="hero-highlights">
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
