'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { SkillCategory } from '../types/datatypes';
import { skills as initialSkills } from '../lib/data';

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySkills, setNewCategorySkills] = useState<string[]>([]);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  
  // Load skills from localStorage or use initial data
  useEffect(() => {
    const savedSkills = localStorage.getItem('resumeSkills');
    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills));
      } catch (e) {
        console.error('Error parsing saved skills:', e);
        setSkills(initialSkills);
      }
    } else {
      setSkills(initialSkills);
    }
  }, []);
  
  // Save skills to localStorage when they change
  useEffect(() => {
    if (skills.length > 0) {
      localStorage.setItem('resumeSkills', JSON.stringify(skills));
    }
  }, [skills]);
  
  // Handle adding a new skill to a category
  const handleAddSkill = (categoryId: number, skill: string) => {
    if (skill.trim() === '') return;
    
    const updatedSkills = skills.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          skills: [...category.skills, skill.trim()]
        };
      }
      return category;
    });

    setSkills(updatedSkills);
  };

  // Handle removing a skill from a category
  const handleRemoveSkill = (categoryId: number, skillIndex: number) => {
    const updatedSkills = skills.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          skills: category.skills.filter((_, index) => index !== skillIndex)
        };
      }
      return category;
    });

    setSkills(updatedSkills);
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategorySkills.length === 0 || !newCategoryName.trim()) return;
    
    const newId = Math.max(0, ...skills.map(x => x.id)) + 1;
    setSkills([...skills, { 
      id: newId, 
      name: newCategoryName.trim(), 
      skills: [...newCategorySkills] 
    }]);
    
    setNewCategorySkills([]);
    setNewCategoryName('');
  };

  // Handle editing a category name
  const handleCategoryNameChange = (categoryId: number, newName: string) => {
    const updatedSkills = skills.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          name: newName
        };
      }
      return category;
    });

    setSkills(updatedSkills);
  };
  
  // Handle removing a category
  const handleRemoveCategory = (categoryId: number) => {
    setSkills(skills.filter(category => category.id !== categoryId));
  };
  
  // Handle updating a category
  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    
    const updatedSkills = skills.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    );
    
    setSkills(updatedSkills);
    setEditingCategory(null);
  };
  
  return (
    <div className="min-h-screen bg-red-50">
      <Navbar activeSection="skills" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Skills</h1>
          <p className="text-gray-600 mb-6">
            Add, edit, or remove skill categories and skills to showcase in your resume. These skills will be displayed in the Skills section.
          </p>
          
          {/* List of existing skill categories */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Your Skill Categories</h3>
            
            {skills.map((category) => (
              <div key={category.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{category.name}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCategory(category)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveCategory(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="flex items-center bg-blue-100 px-2 py-1 rounded">
                      <span className="text-xs text-blue-800">{skill}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Add skill"
                    className="flex-1 p-2 border rounded"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                        handleAddSkill(category.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Edit category form */}
          {editingCategory && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <h4 className="font-medium mb-3">Edit Skill Category</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {editingCategory.skills.map((skill, index) => (
                      <div key={index} className="flex items-center bg-blue-100 px-2 py-1 rounded">
                        <span className="text-xs text-blue-800">{skill}</span>
                        <button
                          onClick={() => {
                            const updatedSkills = [...editingCategory.skills];
                            updatedSkills.splice(index, 1);
                            setEditingCategory({...editingCategory, skills: updatedSkills});
                          }}
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
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill"
                      className="flex-1 p-2 border rounded"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newSkill.trim() !== '') {
                          setEditingCategory({
                            ...editingCategory,
                            skills: [...editingCategory.skills, newSkill.trim()]
                          });
                          setNewSkill('');
                          e.preventDefault();
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newSkill.trim() !== '') {
                          setEditingCategory({
                            ...editingCategory,
                            skills: [...editingCategory.skills, newSkill.trim()]
                          });
                          setNewSkill('');
                        }
                      }}
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCategory}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Add new category form */}
          {!editingCategory && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Add New Skill Category</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {newCategorySkills.map((skill, index) => (
                      <div key={index} className="flex items-center bg-blue-100 px-2 py-1 rounded">
                        <span className="text-xs text-blue-800">{skill}</span>
                        <button
                          onClick={() => {
                            setNewCategorySkills(prev => prev.filter((_, i) => i !== index));
                          }}
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
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill to new category"
                      className="flex-1 p-2 border rounded"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newSkill.trim() !== '') {
                          setNewCategorySkills(prev => [...prev, newSkill.trim()]);
                          setNewSkill('');
                          e.preventDefault();
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newSkill.trim() !== '') {
                          setNewCategorySkills(prev => [...prev, newSkill.trim()]);
                          setNewSkill('');
                        }
                      }}
                      className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddCategory}
                    disabled={newCategorySkills.length === 0 || !newCategoryName.trim()}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 