import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import portfolioData from '../data/portfolioData';
import '../styles/footer.css';

export default function Footer() {
  const { personal, social, footer } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo footer-brand-text">
              {personal.shortName.toUpperCase()}<span>.DEV</span>
            </div>
            <p className="footer-tagline">{footer.tagline}</p>
          </div>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="footer-social-link"
              title="Email"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{footer.copyright}</span>
          <button className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
