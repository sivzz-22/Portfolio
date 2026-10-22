import { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { useSpiderTheme } from '../context/SpiderThemeContext';
import portfolioData from '../data/portfolioData';
import '../styles/hero.css';

export default function Hero() {
  const { personal, social } = portfolioData;
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

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Seamless Ambient Vignette (No blue/black split) */}
      <div className="hero-atmosphere-glow" />

      <div className="container">
        <div className="hero-grid">
          {/* LEFT COLUMN: Clean Blended Hero Portrait (Matching Reference Image 2) */}
          <div className="hero-photo-column">
            <div
              className="hero-photo-blend-wrapper"
              style={{
                transform: `translateY(-${scrollProgress * 55}px)`,
              }}
            >
              {/* Bold Crimson Red Circle Backdrop (Image 2 style) */}
              <div className="hero-backdrop-circle hero-backdrop-circle-main" />
              <div className="hero-backdrop-circle hero-backdrop-circle-accent" />

              {/* Ambient Red Glow */}
              <div className="hero-circle-ambient-glow" />

              {/* Organic Portrait Stage with transparent bottom fade */}
              <div className="hero-portrait-stage">
                <img
                  src="/profile-cutout.png"
                  onError={(e) => {
                    // Graceful fallback to original photo if cutout missing
                    e.currentTarget.src = '/profile.jpg';
                  }}
                  alt={personal.name}
                  className="hero-blended-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Hero Narrative with Kinetic Scroll Parallax Animations */}
          <div
            className="hero-content"
            style={{
              transform: `translateY(-${scrollProgress * 40}px)`,
            }}
          >
            <p
              className="hero-greeting hero-anim-item"
              style={{
                transform: `translateX(-${scrollProgress * 15}px)`,
                opacity: Math.max(0.4, 1 - scrollProgress * 0.7),
              }}
            >
              HELLO, I'M
            </p>

            <h1
              className="hero-name hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 22}px)`,
              }}
            >
              {personal.name}
            </h1>

            {/* Role & Degree Dynamic Highlights */}
            <div
              className="hero-role-wrapper hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 18}px)`,
              }}
            >
              <div className="hero-role">
                <span className="hero-role-main">{personal.role}</span>
                <span className="hero-role-dot">•</span>
                <span className="hero-role-sub">{personal.degreeTag}</span>
              </div>
              <div className="miles-script-tag">
                <span>{isSpiderMode ? 'FULL STACK WEB-SLINGER' : 'FULL STACK DEVELOPER'}</span>
              </div>
            </div>

            <p
              className="hero-description hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 14}px)`,
              }}
            >
              {personal.description}
            </p>

            {/* "Find Me on" Quick Contact Details (Matching Reference Image 2) */}
            <div
              className="hero-find-me hero-anim-item"
              style={{
                transform: `translateY(-${scrollProgress * 10}px)`,
              }}
            >
              <span className="find-me-label">Find Me on</span>
              <div className="find-me-icons">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="find-me-btn"
                  title="GitHub"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="find-me-btn"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  className="find-me-btn"
                  title="Direct Email"
                  aria-label="Email Siva"
                >
                  <Mail size={16} />
                </a>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="find-me-btn"
                  title="Phone / WhatsApp"
                  aria-label="Call or WhatsApp"
                >
                  <Phone size={16} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToContact();
                  }}
                  className="find-me-btn"
                  title={`Location: ${personal.location}`}
                  aria-label="Location & Contact"
                >
                  <MapPin size={16} />
                </a>
              </div>
            </div>

            {/* Call to Action Buttons */}
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
