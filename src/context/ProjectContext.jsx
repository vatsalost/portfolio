import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from '../data/initialProjects';

const ProjectContext = createContext();

const STORAGE_KEY = 'vatsal_portfolio_projects_v4';

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load projects from localStorage:', e);
    }
    return INITIAL_PROJECTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects to localStorage:', e);
    }
  }, [projects]);

  const addProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: projectData.id || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`,
      year: projectData.year || new Date().getFullYear().toString(),
      featured: projectData.featured ?? false,
      gallery: projectData.gallery || [projectData.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'],
      metrics: projectData.metrics || [{ label: "Status", value: "Shipped" }],
      stack: Array.isArray(projectData.stack) ? projectData.stack : (projectData.stack ? projectData.stack.split(',').map(s => s.trim()) : ['React', 'GSAP'])
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updatedFields) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    }));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const toggleFeatured = (id) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    }));
  };

  const resetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    } catch (e) {
      console.error(e);
    }
  };

  const getProjectById = (id) => {
    return projects.find(p => p.id === id);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      toggleFeatured,
      resetProjects,
      getProjectById
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
