import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, SpiderIcon } from './Icons';
import SpiderLogo from './SpiderLogo';
import { useSpiderTheme } from '../context/SpiderThemeContext';
import portfolioData from '../data/portfolioData';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isSpiderMode, toggleSpiderMode } = useSpiderTheme();

  const { personal, social } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo with Scroll-Linked Avatar Transition */}
        <a
          href="#home"
          className={`nav-logo ${scrolled ? 'nav-logo-avatar-mode' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          title="Siva M // Back to Top"
        >
          {scrolled ? (
            <div className="nav-avatar-slot">
              <img src="/profile.jpg" alt="Siva" className="nav-avatar-img" />
              <div className="nav-avatar-ring-glow" />
            </div>
          ) : (
            <div className="nav-logo-spider">
              <SpiderLogo size={28} glow={isSpiderMode} animate={isSpiderMode} />
            </div>
          )}
          <div className="nav-logo-text">
            {personal.shortName.toUpperCase()}
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Actions + Spider-Verse Mode Toggle */}
        <div className="nav-actions">
          {/* Spider-Verse Master Theme Toggle Button (Square Icon Button Before GitHub) */}
          <button
            type="button"
            className={`nav-social-btn nav-spider-btn ${isSpiderMode ? 'active' : ''}`}
            onClick={toggleSpiderMode}
            title={isSpiderMode ? "Spider-Verse Theme: ON (Click for Normal Mode)" : "Spider-Verse Theme: OFF (Click for Spider-Man Mode)"}
            aria-label="Toggle Spider-Verse Theme"
          >
            <SpiderIcon size={20} active={isSpiderMode} />
          </button>

          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}

        {/* Mobile Socials + Spider Toggle */}
        <div className="mobile-socials">
          <button
            type="button"
            className={`nav-social-btn nav-spider-btn ${isSpiderMode ? 'active' : ''}`}
            onClick={toggleSpiderMode}
            title={isSpiderMode ? "Spider-Verse Theme: ON (Click for Normal Mode)" : "Spider-Verse Theme: OFF (Click for Spider-Man Mode)"}
            aria-label="Toggle Spider-Verse Theme"
          >
            <SpiderIcon size={20} active={isSpiderMode} />
          </button>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social-btn"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
