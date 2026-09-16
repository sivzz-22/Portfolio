import { ArrowRight, Download, Sparkles, Zap } from 'lucide-react';
import ThreeScene from './ThreeScene';
import SpiderLogo from './SpiderLogo';
import portfolioData from '../data/portfolioData';
import '../styles/hero.css';

export default function Hero() {
  const { personal } = portfolioData;

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Spider-Man Atmospheric Vignette */}
      <div className="hero-atmosphere-glow" />

      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Narrative */}
          <div className="hero-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <SpiderLogo size={56} glow={true} animate={true} />
              <div className="hero-badge">
                <span className="hero-badge-pulse" />
                <span>{personal.statusBadge}</span>
              </div>
            </div>

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
                <span>FULL STACK WEB-SLINGER</span>
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

          {/* Right Column: 3D Spider-Man Developer Core */}
          <div className="hero-scene-column">
            <ThreeScene />
          </div>
        </div>
      </div>
    </section>
  );
}
