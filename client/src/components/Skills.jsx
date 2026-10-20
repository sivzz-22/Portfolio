import { useState } from 'react';
import { Cpu, Terminal, Layout, Server, Database, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import '../styles/skills.css';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const { skills } = portfolioData;

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'programming', label: 'Programming' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Databases' },
    { id: 'tools', label: 'Tools & Platforms' },
  ];

  // Helper function to dynamically select an icon
  const getSkillIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'java':
      case 'python':
      case 'javascript':
        return <Terminal size={20} />;
      case 'react.js':
      case 'react native':
      case 'html5':
      case 'css3':
      case 'bootstrap':
      case 'electron.js':
        return <Layout size={20} />;
      case 'node.js':
      case 'express.js':
      case 'rest apis':
      case 'jwt':
        return <Server size={20} />;
      case 'mongodb':
      case 'oracle db':
      case 'dbms':
        return <Database size={20} />;
      default:
        return <Wrench size={20} />;
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const renderSkillCards = (items) => (
    <div className="skills-grid">
      {items.map((skill, idx) => (
        <div
          key={idx}
          className="skill-card reveal-slide-up"
          style={{ transitionDelay: `${(idx % 8) * 0.05}s` }}
          onMouseMove={handleMouseMove}
        >
          <div className="skill-icon-wrap">
            {getSkillIcon(skill.name)}
          </div>
          <div className="skill-info">
            <span className="skill-name">{skill.name}</span>
            <span className="skill-sub">{skill.level}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="section-title">
            TECHNICAL <span className="accent-blue">SKILLS</span>
          </h2>
          <p className="section-subtitle">
            Curated toolkit derived from academic training, production projects, and verified certifications.
          </p>
          <div className="web-divider">
            <span />
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="skills-category-tabs reveal-slide-up">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skill-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Categorized Skills Grid */}
        {activeTab === 'all' ? (
          <div>
            <div className="skills-category-group reveal-slide-up">
              <div className="category-group-header">
                <Terminal size={18} color="var(--spider-red-glow)" />
                <h3 className="category-group-title">Programming Languages</h3>
                <span className="category-group-count">{skills.programming.length}</span>
              </div>
              {renderSkillCards(skills.programming)}
            </div>

            <div className="skills-category-group reveal-slide-up">
              <div className="category-group-header">
                <Layout size={18} color="var(--spider-blue-glow)" />
                <h3 className="category-group-title">Frontend & Mobile</h3>
                <span className="category-group-count">{skills.frontend.length}</span>
              </div>
              {renderSkillCards(skills.frontend)}
            </div>

            <div className="skills-category-group reveal-slide-up">
              <div className="category-group-header">
                <Server size={18} color="var(--spider-red-glow)" />
                <h3 className="category-group-title">Backend & APIs</h3>
                <span className="category-group-count">{skills.backend.length}</span>
              </div>
              {renderSkillCards(skills.backend)}
            </div>

            <div className="skills-category-group reveal-slide-up">
              <div className="category-group-header">
                <Database size={18} color="var(--spider-blue-glow)" />
                <h3 className="category-group-title">Databases</h3>
                <span className="category-group-count">{skills.database.length}</span>
              </div>
              {renderSkillCards(skills.database)}
            </div>

            <div className="skills-category-group reveal-slide-up">
              <div className="category-group-header">
                <Wrench size={18} color="var(--spider-blue-glow)" />
                <h3 className="category-group-title">Tools & Frameworks</h3>
                <span className="category-group-count">{skills.tools.length}</span>
              </div>
              {renderSkillCards(skills.tools)}
            </div>
          </div>
        ) : (
          <div className="skills-category-group reveal-slide-up">
            {renderSkillCards(skills[activeTab] || [])}
          </div>
        )}

        {/* Soft Skills & Professional Attributes */}
        <div className="reveal-slide-up" style={{ marginTop: '3.5rem' }}>
          <div className="category-group-header">
            <Sparkles size={18} color="var(--spider-red-glow)" />
            <h3 className="category-group-title">Professional Attributes & Soft Skills</h3>
          </div>
          <div className="soft-skills-container">
            {skills.softSkills.map((item, idx) => (
              <span key={idx} className="soft-pill">
                <CheckCircle2 size={16} color="var(--spider-blue-glow)" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
