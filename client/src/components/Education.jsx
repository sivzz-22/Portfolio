import { GraduationCap, Calendar, MapPin, CheckCircle } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import '../styles/education.css';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="section-title">
            MY <span className="accent-blue">EDUCATION</span>
          </h2>
          <p className="section-subtitle">
            Formal academic degrees and educational milestones.
          </p>
          <div className="web-divider">
            <span />
          </div>
        </div>

        {/* Education Timeline */}
        <div className="education-timeline-container">
          <div className="timeline-track" />

          {education.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-node" />

              <div className="timeline-card">
                <div className="timeline-header">
                  <h3 className="timeline-degree">{item.degree}</h3>
                  <span className="timeline-score-badge">{item.score}</span>
                </div>

                <div className="timeline-institution">{item.institution}</div>

                <div className="timeline-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} />
                    {item.yearLabel}
                  </span>
                  <span>•</span>
                  <span style={{ color: 'var(--spider-blue-glow)' }}>{item.status}</span>
                </div>

                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
