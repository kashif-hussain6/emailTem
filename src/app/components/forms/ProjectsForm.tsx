"use client";

import { useState } from 'react';
import { Project } from '../../types/datatypes';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ projects, onChange }) => {
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newTechnologies, setNewTechnologies] = useState<string[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    if (!newProjectTitle.trim()) return;
    
    const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
    const newProject: Project = {
      id: newId,
      title: newProjectTitle.trim(),
      name: newProjectName.trim() || newProjectTitle.trim(),
      description: newProjectDescription.trim(),
      technologies: [...newTechnologies]
    };
    
    onChange([...projects, newProject]);
    
    setNewProjectTitle('');
    setNewProjectName('');
    setNewProjectDescription('');
    setNewTechnologies([]);
  };

  const handleRemoveProject = (id: number) => {
    onChange(projects.filter(project => project.id !== id));
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;
    
    const updatedProjects = projects.map(project => 
      project.id === editingProject.id ? editingProject : project
    );
    
    onChange(updatedProjects);
    setEditingProject(null);
  };
  const handleAddTechnology = () => {
    if (!newTechnology.trim()) return;
    setNewTechnologies([...newTechnologies, newTechnology.trim()]);
    setNewTechnology('');
  };

  const handleRemoveTechnology = (index: number) => {
    setNewTechnologies(newTechnologies.filter((_, i) => i !== index));
  };

  const handleAddTechnologyToEditing = () => {
    if (!editingProject || !newTechnology.trim()) return;
    
    setEditingProject({
      ...editingProject,
      technologies: [...(editingProject.technologies || []), newTechnology.trim()]
    });
    
    setNewTechnology('');
  };

  const handleRemoveTechnologyFromEditing = (index: number) => {
    if (!editingProject) return;
    
    setEditingProject({
      ...editingProject,
      technologies: (editingProject.technologies || []).filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Projects</h3>
      
      <div className="space-y-4 mb-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{project.title}</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {editingProject && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <h4 className="font-medium mb-3">Edit Project</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editingProject.name}
                onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Typically same as title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {(editingProject.technologies || []).map((tech, index) => (
                  <div key={index} className="flex items-center bg-blue-100 px-2 py-1 rounded">
                    <span className="text-xs text-blue-800">{tech}</span>
                    <button
                      onClick={() => handleRemoveTechnologyFromEditing(index)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add technology"
                  className="flex-1 p-2 border rounded"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTechnology.trim() !== '') {
                      handleAddTechnologyToEditing();
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  onClick={handleAddTechnologyToEditing}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditingProject(null)}
                className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProject}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!editingProject && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Add New Project</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="Project title"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
              <input
                type="text"
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Same as title if left empty"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                placeholder="Project description"
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
              <div className="flex flex-wrap gap-1 mb-2">
                {newTechnologies.map((tech, index) => (
                  <div key={index} className="flex items-center bg-blue-100 px-2 py-1 rounded">
                    <span className="text-xs text-blue-800">{tech}</span>
                    <button
                      onClick={() => handleRemoveTechnology(index)}
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add technology"
                  className="flex-1 p-2 border rounded"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newTechnology.trim() !== '') {
                      handleAddTechnology();
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  onClick={handleAddTechnology}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddProject}
                disabled={!newProjectTitle.trim()}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm; 