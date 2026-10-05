import React from 'react';
import { 
  Code2, 
  Cpu, 
  Flame, 
  Smartphone, 
  Layers, 
  GitBranch, 
  Globe, 
  Database 
} from 'lucide-react';

export const TechStrip = () => {
  const technologies = [
    { name: 'Python', icon: '🐍' },
    { name: 'React', icon: '⚛️' },
    { name: 'Flutter', icon: '💙' },
    { name: 'Dart', icon: '🎯' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'C++', icon: '⚙️' },
    { name: 'Git', icon: '🐙' }
  ];

  return (
    <section className="tech-strip-section" aria-label="Core Technologies">
      <div className="container">
        <p className="tech-strip-label">CORE TECHNOLOGIES &amp; TOOLCHAIN</p>
        <div className="tech-strip-grid">
          {technologies.map((tech, index) => (
            <div key={index} className="tech-strip-item">
              <span className="tech-strip-emoji">{tech.icon}</span>
              <span className="tech-strip-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
