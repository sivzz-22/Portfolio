import { User, Code2, Compass, Heart, Award } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import '../styles/about.css';

export default function About() {
  const { about, personal } = portfolioData;

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <User size={14} />
            <span>DISCOVER MY JOURNEY</span>
          </div>
          <h2 className="section-title">
            ABOUT <span className="accent-red">ME</span>
          </h2>
          <div className="web-divider">
            <span />
          </div>
        </div>

        <div className="about-grid">
          {/* Left Narrative */}
          <div className="about-narrative reveal-slide-left">
            <h3 className="about-headline">
              {about.headline}
            </h3>

            {about.bio.map((paragraph, idx) => (
              <p key={idx} className="about-text">
                {paragraph}
              </p>
            ))}

            {/* Quick Resume Facts Grid */}
            <div className="about-facts-grid">
              {about.quickFacts.map((fact, idx) => (
                <div key={idx} className="fact-item">
                  <div className="fact-label">{fact.label}</div>
                  <div className="fact-value">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Holographic Details Card */}
          <div className="about-card-wrapper reveal-slide-right">
            <div className="about-holo-card">
              {/* Corner Spider Web SVG Graphic */}
              <svg className="about-card-corner-web" viewBox="0 0 100 100" fill="none">
                <path d="M100 0 L0 100" stroke="#e62429" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M100 30 C70 30 30 70 30 100" stroke="#1266f1" strokeWidth="1.2" />
                <path d="M100 60 C80 60 60 80 60 100" stroke="#ff3344" strokeWidth="1.2" />
                <path d="M100 85 C90 85 85 90 85 100" stroke="#00d2ff" strokeWidth="1" />
                <circle cx="95" cy="5" r="3" fill="#e62429" />
              </svg>

              <div className="card-header-tag">
                <Code2 size={16} />
                <span>PROFILE MATRIX // VERIFIED</span>
              </div>

              {/* Areas of Interest */}
              <div className="about-subgroup">
                <div className="about-subgroup-title">
                  <Compass size={14} />
                  <span>Areas of Interest</span>
                </div>
                <div className="interest-tags">
                  {about.areasOfInterest.map((item, idx) => (
                    <span key={idx} className="interest-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hobbies / Extracurriculars */}
              <div className="about-subgroup">
                <div className="about-subgroup-title">
                  <Heart size={14} />
                  <span>Interests & Hobbies</span>
                </div>
                <div className="interest-tags">
                  {about.hobbies.map((item, idx) => (
                    <span key={idx} className="interest-tag interest-tag-hobby">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language Proficiencies */}
              <div className="about-subgroup">
                <div className="about-subgroup-title">
                  <Award size={14} />
                  <span>Languages</span>
                </div>
                <div className="interest-tags">
                  {portfolioData.skills.languages.map((lang, idx) => (
                    <span key={idx} className="interest-tag">
                      {lang.language} ({lang.proficiency})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
