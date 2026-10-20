import { Award, Trophy, Users, ShieldCheck, Star } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import '../styles/achievements.css';

export default function Achievements() {
  const { certifications, achievements } = portfolioData;

  return (
    <section id="achievements" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Trophy size={14} />
            <span>MILESTONES & HONORS</span>
          </div>
          <h2 className="section-title">
            CERTIFICATIONS & <span className="accent-red">ACHIEVEMENTS</span>
          </h2>
          <p className="section-subtitle">
            Industry credentials, competitive hackathon recognitions, and campus leadership.
          </p>
          <div className="web-divider">
            <span />
          </div>
        </div>

        <div className="achieve-cert-wrapper">
          {/* Professional Certifications */}
          <div className="reveal-slide-left">
            <h3 className="achieve-block-title">
              <ShieldCheck size={20} />
              <span>Professional Industry Certifications</span>
            </h3>

            <div className="cert-card-grid">
              {certifications.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-top">
                    <span className="cert-badge">{cert.credentialId}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <div className="cert-issuer">Issued by {cert.issuer}</div>
                  <p className="cert-desc">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Activities */}
          <div className="reveal-slide-right">
            <h3 className="achieve-block-title">
              <Star size={20} color="var(--spider-blue-glow)" />
              <span>Competitions & Club Activities</span>
            </h3>

            <div className="achieve-grid">
              {achievements.map((item, idx) => (
                <div key={idx} className="achieve-card">
                  <div className="achieve-card-header">
                    <div className="achieve-icon-wrap">
                      {idx < 2 ? <Trophy size={18} /> : <Users size={18} />}
                    </div>
                    <span className="achieve-pill">{item.badge}</span>
                  </div>
                  <h4 className="achieve-title">{item.title}</h4>
                  <p className="achieve-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
