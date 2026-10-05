import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getInitialPortfolioData,
  subscribeToPortfolioData,
  updatePersonalInfo,
  saveProjectItem,
  deleteProjectItem,
  updateProjectsList,
  updateSkillsList,
  updateServicesList,
  updateStatsList,
  updateFaqsList,
  resetPortfolioToDefaults
} from '../services/portfolioDataService';

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => getInitialPortfolioData());

  useEffect(() => {
    const unsubscribe = subscribeToPortfolioData((updatedData) => {
      setData(updatedData);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const value = {
    personalInfo: data.personalInfo,
    projects: data.projects,
    skills: data.skills,
    services: data.services,
    stats: data.stats,
    faqs: data.faqs,
    // Admin Mutation Handlers
    updatePersonalInfo,
    saveProject: saveProjectItem,
    deleteProject: deleteProjectItem,
    updateProjects: updateProjectsList,
    updateSkills: updateSkillsList,
    updateServices: updateServicesList,
    updateStats: updateStatsList,
    updateFaqs: updateFaqsList,
    resetToDefaults: resetPortfolioToDefaults
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
