import { useState, useEffect } from 'react';
import { Terminal, X, ShieldAlert, Cpu, Radio, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function SpideyTrackerHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [swung, setSwung] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { personal } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMascotClick = () => {
    setSwung(true);
    setIsOpen(true);
    setTimeout(() => setSwung(false), 800);
  };

  // When at top of page, Spidey stays retracted/peeking at top
  // When scrolling down, Spidey extends web thread and comes down into view!
  const isAtTop = scrollY < 40;
  const threadLength = isAtTop ? 18 : Math.min(210, 45 + Math.floor(scrollY * 0.22));

  return (
    <>
      {/* -------------------------------------------------------------
          1. HANGING UPSIDE-DOWN SPIDER-MAN MASCOT (Image 3 Concept)
          Suspended from top on an elastic web strand:
          - Tucked at top when scrollY is 0
          - Descends smoothly down as you scroll down the page!
          ------------------------------------------------------------- */}
      <div
        className={`hanging-spidey-anchor ${swung ? 'swing-active' : ''} ${isAtTop ? 'at-top' : 'descended'}`}
        onClick={handleMascotClick}
        title="Click Spidey to open Cyber Tracker Telemetry HUD!"
      >
        {/* Dynamic Elastic Web Thread that lengthens on scroll */}
        <div
          className="hanging-web-thread"
          style={{ height: `${threadLength}px` }}
        />

        {/* Hanging Upside-Down Spidey Silhouette */}
        <div className="hanging-spidey-body">
          <svg viewBox="0 0 60 75" width="48" height="60" fill="none">
            {/* Hanging Web Loop around feet */}
            <path d="M 30 0 L 30 15 C 28 17 32 17 30 20" stroke="#ffffff" strokeWidth="1.5" />

            {/* Inverted Torso & Red Suit */}
            <path
              d="M 22 20 L 38 20 L 36 38 L 30 45 L 24 38 Z"
              fill="#e61a22"
              stroke="#990a0f"
              strokeWidth="1.2"
            />
            {/* Blue Suit Side Accents */}
            <path d="M 22 20 L 26 22 L 25 36 L 24 38 Z" fill="#1266f1" />
            <path d="M 38 20 L 34 22 L 35 36 L 36 38 Z" fill="#1266f1" />

            {/* Inverted Head (Upside Down) */}
            <ellipse cx="30" cy="55" rx="11" ry="13" fill="#e61a22" stroke="#990a0f" strokeWidth="1.2" />

            {/* Iconic Angled White Spider Eyes */}
            <path
              d="M 23 52 Q 28 50 28 58 Q 23 58 23 52 Z"
              fill="#ffffff"
              stroke="#06070a"
              strokeWidth="1"
            />
            <path
              d="M 37 52 Q 32 50 32 58 Q 37 58 37 52 Z"
              fill="#ffffff"
              stroke="#06070a"
              strokeWidth="1"
            />

            {/* Upside Down Spider Arms Crossed */}
            <path d="M 22 28 C 15 35 18 45 27 42" stroke="#e61a22" strokeWidth="3" strokeLinecap="round" />
            <path d="M 38 28 C 45 35 42 45 33 42" stroke="#e61a22" strokeWidth="3" strokeLinecap="round" />
          </svg>

          {/* Floating Tag */}
          <span className="hanging-spidey-label">SPIDEY TRACKER</span>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. RETRO-FUTURISTIC CYBER-SPIDEY HUD TERMINAL MODAL (Image 3)
          ------------------------------------------------------------- */}
      {isOpen && (
        <div className="cyber-hud-overlay" onClick={() => setIsOpen(false)}>
          <div className="cyber-hud-window" onClick={(e) => e.stopPropagation()}>
            {/* CRT Scanline Overlay */}
            <div className="crt-scanlines" />

            {/* HUD Header */}
            <div className="hud-header">
              <div className="hud-title-wrap">
                <Radio size={16} className="hud-pulse-icon" />
                <span className="hud-title">SPIDEY TRACKER // OS v4.2.0</span>
              </div>
              <button
                className="hud-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close HUD"
              >
                <X size={18} />
              </button>
            </div>

            {/* Telemetry Grid */}
            <div className="hud-telemetry-body">
              <div className="hud-log-section">
                <p className="hud-log-line text-cyan">&gt; INITIALIZING SPIDEY TRACKER v4.2.0...</p>
                <p className="hud-log-line">&gt; BOOTING CORE SERVICES [OK]</p>
                <p className="hud-log-line">&gt; LOADING DEVELOPER PROFILE: <span className="text-red font-bold">{personal.name}</span></p>
                <p className="hud-log-line">&gt; EDUCATION PIPELINE: <span className="text-cyan">Kongu Engineering College (CGPA: 7.39)</span></p>
                <p className="hud-log-line">&gt; SYSTEM STATUS: <span className="text-green">[100% OPERATIONAL]</span></p>
                <p className="hud-log-line">&gt; TECH CORE: Java SE 17 • Python • React Native • Node.js • MongoDB</p>
                <p className="hud-log-line">&gt; WEB-SHOOTER PROTOCOL: CALIBRATED (Click anywhere to sling webs)</p>
                <p className="hud-log-line text-cyan">&gt; CAREER DIRECTIVE: Available for Software Engineering Roles</p>
              </div>

              {/* High-Tech Diagnostic Cards */}
              <div className="hud-stats-grid">
                <div className="hud-stat-box">
                  <span className="hud-stat-title">ROLE</span>
                  <span className="hud-stat-val text-red">{personal.role}</span>
                </div>
                <div className="hud-stat-box">
                  <span className="hud-stat-title">LOCATION</span>
                  <span className="hud-stat-val text-cyan">Tiruppur, India</span>
                </div>
                <div className="hud-stat-box">
                  <span className="hud-stat-title">PROJECTS</span>
                  <span className="hud-stat-val">3 Featured</span>
                </div>
                <div className="hud-stat-box">
                  <span className="hud-stat-title">CERTIFICATION</span>
                  <span className="hud-stat-val text-yellow">Oracle Java 17</span>
                </div>
              </div>
            </div>

            {/* HUD Footer Actions */}
            <div className="hud-footer">
              <span className="hud-status-blink">● LIVE TELEMETRY ACTIVE</span>
              <button
                className="btn-spider-primary"
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
                onClick={() => setIsOpen(false)}
              >
                RETURN TO VIEWPORT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
