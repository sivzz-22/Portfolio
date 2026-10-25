import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, MessageSquare, Send, Check, X, Radio, ArrowDown, ExternalLink, Copy } from 'lucide-react';
import { useSpiderTheme } from '../context/SpiderThemeContext';
import portfolioData from '../data/portfolioData';

export default function SpideyTrackerHUD() {
  const { isSpiderMode } = useSpiderTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [swung, setSwung] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState(false);
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickMsg, setQuickMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { personal, social } = portfolioData;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMascotClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSwung(true);
    setIsOpen(true);
    setTimeout(() => setSwung(false), 800);
  };

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScrollToContact = () => {
    setIsOpen(false);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const [isSendingSignal, setIsSendingSignal] = useState(false);

  const handleSendQuickSignal = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!quickName.trim() || !quickEmail.trim() || !quickMsg.trim()) {
      setErrorMessage('Please fill in all fields (Name, Email & Message)');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quickEmail)) {
      setErrorMessage('Please provide a valid email address');
      return;
    }

    setIsSendingSignal(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickName.trim(),
          email: quickEmail.trim(),
          message: `[🕷️ SPIDER-SIGNAL TRANSMISSION]\n${quickMsg.trim()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      setSent(true);
      setQuickMsg('');
      setQuickName('');
      setQuickEmail('');
      setTimeout(() => {
        setSent(false);
      }, 5000);
    } catch (err) {
      console.warn('Backend signal transmission failed, fallback to mail client:', err);
      const subject = encodeURIComponent(`Spider-Signal Transmission from ${quickName}`);
      const body = encodeURIComponent(`From: ${quickName} (${quickEmail})\n\nMessage:\n${quickMsg}`);
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } finally {
      setIsSendingSignal(false);
    }
  };

  // When at top of page (scrollY < 40), Spidey is OUT and hanging directly below SIVZZ!
  // When scrolling down, Spidey retracts up into ceiling behind SIVZZ so he doesn't block content.
  const isAtTop = scrollY < 40;

  if (!isSpiderMode) return null;

  return (
    <>
      {/* -------------------------------------------------------------
          1. HANGING UPSIDE-DOWN SPIDER-MAN MASCOT (Directly below SIVZZ)
          ------------------------------------------------------------- */}
      <div
        id="spidey-contact-anchor"
        className={`hanging-spidey-anchor ${isAtTop ? 'out-at-top' : 'retracted-on-scroll'}`}
        onClick={handleMascotClick}
        title="Click Spidey for Quick Contact & Transmission!"
      >
        <div className={`hanging-spidey-pivot ${swung ? 'swing-active' : ''}`}>
          {/* Elastic Web Thread descending from bottom of SIVZZ */}
          <div className="hanging-web-thread" />

          {/* Hanging Upside-Down Spidey Silhouette */}
          <div className="hanging-spidey-body">
            <svg viewBox="0 0 60 75" width="46" height="58" fill="none">
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
            <span className="hanging-spidey-label">SPIDEY CONTACT</span>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. SPIDER-COMMS QUICK CONTACT HUD MODAL (Portaled to body)
          ------------------------------------------------------------- */}
      {isOpen &&
        createPortal(
          <div className="cyber-hud-overlay" onClick={() => setIsOpen(false)}>
            <div className="cyber-hud-window" onClick={(e) => e.stopPropagation()}>
              {/* CRT Scanline Overlay */}
              <div className="crt-scanlines" />

              {/* HUD Header */}
              <div className="hud-header">
                <div className="hud-title-wrap">
                  <Radio size={16} className="hud-pulse-icon" />
                  <span className="hud-title">SPIDER-COMMS // CONTACT TERMINAL</span>
                </div>
                <button
                  className="hud-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Contact HUD"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Direct Contact Comms */}
              <div className="hud-telemetry-body">
                <div className="hud-log-section">
                  <p className="hud-log-line text-cyan">&gt; SPIDER-BEACON ESTABLISHED: CONNECT WITH SIVA</p>
                  <p className="hud-log-line">&gt; TRANSMITTING DIRECT CHANNELS FOR FULL-STACK INQUIRIES...</p>
                </div>

                {/* Quick Communication Grid */}
                <div className="hud-stats-grid">
                  <div className="hud-stat-box cursor-pointer" onClick={handleCopyEmail} title="Click to copy email">
                    <div className="flex items-center justify-between">
                      <span className="hud-stat-title">DIRECT EMAIL</span>
                      {copied ? <Check size={14} className="text-green" /> : <Copy size={14} className="text-cyan" />}
                    </div>
                    <span className="hud-stat-val text-red" style={{ fontSize: '0.8rem', wordBreak: 'break-all' }}>
                      {personal.email}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: copied ? '#10b981' : '#94a3b8' }}>
                      {copied ? '✓ COPIED TO CLIPBOARD' : 'Click to copy address'}
                    </span>
                  </div>

                  <a href={`https://wa.me/${personal.phone.replace(/[^0-9]/g, '')}`} className="hud-stat-box" target="_blank" rel="noopener noreferrer">
                    <span className="hud-stat-title">WHATSAPP</span>
                    <span className="hud-stat-val">+91 770 885 7133</span>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Direct chat ↗</span>
                  </a>

                  <a href={social.linkedin} className="hud-stat-box" target="_blank" rel="noopener noreferrer">
                    <span className="hud-stat-title">LINKEDIN</span>
                    <span className="hud-stat-val text-yellow">/in/siva-saravana-kumar-m</span>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Connect on LinkedIn ↗</span>
                  </a>

                  <a href={social.github} className="hud-stat-box" target="_blank" rel="noopener noreferrer">
                    <span className="hud-stat-title">GITHUB</span>
                    <span className="hud-stat-val">/sivzz-22</span>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Inspect Repositories ↗</span>
                  </a>
                </div>

                {/* Quick Transmission Form */}
                <div className="hud-quick-signal-box">
                  <p className="hud-log-line text-cyan" style={{ marginBottom: '0.75rem' }}>
                    &gt; QUICK SPIDER-SIGNAL TRANSMISSION:
                  </p>
                  {sent ? (
                    <div className="quick-signal-success" style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={18} className="text-green" />
                        <span style={{ fontWeight: 600, color: '#4ade80' }}>SIGNAL TRANSMITTED TO SIVA!</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Your message has been received with your email address. Siva will respond to you shortly!
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleSendQuickSignal} className="quick-signal-form">
                      <div className="quick-signal-inputs">
                        <div className="quick-signal-row">
                          <input
                            type="text"
                            placeholder="Your Name / Organization"
                            className="quick-input"
                            value={quickName}
                            onChange={(e) => setQuickName(e.target.value)}
                            required
                          />
                          <input
                            type="email"
                            placeholder="Your Email Address"
                            className="quick-input"
                            value={quickEmail}
                            onChange={(e) => setQuickEmail(e.target.value)}
                            required
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Quick Message / Opportunity..."
                          className="quick-input msg-input"
                          value={quickMsg}
                          onChange={(e) => setQuickMsg(e.target.value)}
                          required
                        />
                        {errorMessage && (
                          <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errorMessage}</span>
                        )}
                        <button
                          type="submit"
                          className="btn-spider-primary quick-submit-btn"
                          disabled={isSendingSignal}
                        >
                          <Send size={14} />
                          <span>{isSendingSignal ? 'TRANSMITTING...' : 'SEND SIGNAL'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* HUD Footer Actions */}
              <div className="hud-footer">
                <button
                  className="hud-sling-btn"
                  onClick={handleScrollToContact}
                >
                  <ArrowDown size={15} />
                  <span>SLING DOWN TO FULL CONTACT SECTION</span>
                </button>

                <button
                  className="btn-spider-secondary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.75rem' }}
                  onClick={() => setIsOpen(false)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
