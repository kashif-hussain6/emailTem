'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectsForm from '../components/forms/ProjectsForm';
import { Project } from '../types/datatypes';
import { projects as initialProjects } from '../lib/data';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Load projects from localStorage or use initial data
  useEffect(() => {
    const savedProjects = localStorage.getItem('resumeProjects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error('Error parsing saved projects:', e);
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
    }
  }, []);
  
  // Save projects to localStorage when they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('resumeProjects', JSON.stringify(projects));
    }
  }, [projects]);
  
  const handleProjectsChange = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
  };
  
  return (
    <div className="min-h-screen bg-red-50">
      <Navbar activeSection="projects" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Projects</h1>
          <p className="text-gray-600 mb-6">
            Add, edit, or remove projects to showcase in your resume. These projects will be displayed in the Projects section.
          </p>
          
          <ProjectsForm 
            projects={projects} 
            onChange={handleProjectsChange} 
          />
        </div>
      </div>
    </div>
  );
} 