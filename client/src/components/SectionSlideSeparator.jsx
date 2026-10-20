import { useSpiderTheme } from '../context/SpiderThemeContext';
import '../styles/section-slide.css';

export default function SectionSlideSeparator({ number = "01", label = "NEXT SECTOR" }) {
  const { isSpiderMode } = useSpiderTheme();

  return (
    <div className={`section-slide-separator reveal-slide-up ${!isSpiderMode ? 'clean-separator' : ''}`} aria-hidden="true">
      <div className="separator-line separator-line-left" />
      <div className="separator-badge">
        <span className="separator-dot" />
        <span className="separator-num">{number}</span>
        <span className="separator-slash">//</span>
        <span className="separator-label">{label}</span>
        <span className="separator-dot" />
      </div>
      <div className="separator-line separator-line-right" />
    </div>
  );
}
