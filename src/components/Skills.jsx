import React from 'react';
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Database, 
  BrainCircuit, 
  Wrench,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { skillsData } from '../data/initialData';

export const Skills = () => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Programming Languages':
        return <Code2 size={20} color="#4F8CFF" />;
      case 'Web Development':
        return <Globe size={20} color="#38BDF8" />;
      case 'Mobile Development':
        return <Smartphone size={20} color="#8B5CF6" />;
      case 'Backend & Cloud':
        return <Database size={20} color="#10B981" />;
      case 'AI & Systems Exploration':
        return <BrainCircuit size={20} color="#F59E0B" />;
      case 'Developer Tools':
        return <Wrench size={20} color="#AAB3C2" />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <section id="skills" className="section-wrapper" style={{ background: 'rgba(18, 23, 34, 0.25)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">02 // Technical Capabilities</span>
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p className="section-desc">
            Organized strictly by verified hands-on capability and active technical exploration. No inflated percentages or arbitrary ratings.
          </p>
        </div>

        <div className="skills-grid">
          {skillsData.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-category-title">
                {getCategoryIcon(cat.category)}
                <span>{cat.category}</span>
              </div>
              <p className="skill-category-desc">{cat.description}</p>

              <div className="skill-items-list">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-row">
                    <div className="skill-name-col">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-note">{skill.note}</span>
                    </div>

                    <span className={`badge ${
                      skill.level === 'Learning'
                        ? 'badge-learning'
                        : skill.level === 'Exploration'
                        ? 'badge'
                        : 'badge-accent'
                    }`}>
                      {skill.level === 'Learning' ? (
                        <>
                          <Clock size={12} />
                          Learning
                        </>
                      ) : skill.level === 'Exploration' ? (
                        'Exploring'
                      ) : (
                        <>
                          <CheckCircle2 size={12} />
                          Core
                        </>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
