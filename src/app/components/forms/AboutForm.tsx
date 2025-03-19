import { Achievement, Certification, Language, Project, Passion, SkillCategory } from '../../types/datatypes';
import { useState } from 'react';
import ProjectsForm from './ProjectsForm';

interface AboutFormProps {
  achievements: Achievement[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  passion: Passion[];
  skills: SkillCategory[];
  onChange: (data: {
    achievements: Achievement[];
    certifications: Certification[];
    languages: Language[];
    projects: Project[];
    passion: Passion[];
    skills: SkillCategory[];
  }) => void;
}

export default function AboutForm({
  achievements,
  certifications,
  languages,
  projects,
  passion,
  skills,
  onChange
}: AboutFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySkills, setNewCategorySkills] = useState<string[]>([]);

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

    onChange({
      achievements,
      certifications,
      languages,
      projects,
      passion,
      skills: updatedSkills
    });
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

    onChange({
      achievements,
      certifications,
      languages,
      projects,
      passion,
      skills: updatedSkills
    });
  };

  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategorySkills.length === 0 || !newCategoryName.trim()) return;
    
    const newId = Math.max(0, ...skills.map(x => x.id)) + 1;
    onChange({
      achievements,
      certifications,
      languages,
      projects,
      passion,
      skills: [...skills, { id: newId, name: newCategoryName.trim(), skills: [...newCategorySkills] }]
    });
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

    onChange({
      achievements,
      certifications,
      languages,
      projects,
      passion,
      skills: updatedSkills
    });
  };

  // Handle projects update
  const handleProjectsChange = (updatedProjects: Project[]) => {
    onChange({
      achievements,
      certifications,
      languages,
      projects: updatedProjects,
      passion,
      skills
    });
  };

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Skills</h3>
        <div className="space-y-4">
          {skills.map((category) => (
            <div key={category.id} className="p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleCategoryNameChange(category.id, e.target.value)}
                className="font-medium mb-2 p-2 border rounded w-full"
                placeholder="Category name"
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-white px-3 py-1 rounded-full">
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(category.id, index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
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
          
          {/* New Category Form */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Add New Skill Category</h4>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Category name"
                className="p-2 border rounded"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {newCategorySkills.map((skill, index) => (
                  <div key={index} className="flex items-center bg-white px-3 py-1 rounded-full">
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => {
                        setNewCategorySkills(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill to new category"
                  className="flex-1 p-2 border rounded"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newSkill.trim() !== '') {
                      setNewCategorySkills(prev => [...prev, newSkill.trim()]);
                      setNewSkill('');
                    }
                  }}
                />
                <button
                  onClick={handleAddCategory}
                  disabled={newCategorySkills.length === 0 || !newCategoryName.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <ProjectsForm 
          projects={projects} 
          onChange={handleProjectsChange} 
        />
      </div>

      {/* Achievements Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <select
                  value={achievement.icon}
                  onChange={(e) => {
                    const updatedAchievements = achievements.map(a =>
                      a.id === achievement.id ? { ...a, icon: e.target.value } : a
                    );
                    onChange({
                      achievements: updatedAchievements,
                      certifications,
                      languages,
                      projects,
                      passion,
                      skills
                    });
                  }}
                  className="p-2 border rounded"
                >
                  <option value="trophy">Trophy</option>
                  <option value="medal">Medal</option>
                  <option value="award">Award</option>
                  <option value="achievement">Achievement</option>
                  <option value="cup">Cup</option>
                  <option value="ribbon">Ribbon</option>
                </select>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => {
                    const updatedAchievements = achievements.map(a =>
                      a.id === achievement.id ? { ...a, title: e.target.value } : a
                    );
                    onChange({
                      achievements: updatedAchievements,
                      certifications,
                      languages,
                      projects,
                      passion,
                      skills
                    });
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="Achievement title"
                />
                <button
                  onClick={() => {
                    onChange({
                      achievements: achievements.filter(a => a.id !== achievement.id),
                      certifications,
                      languages,
                      projects,
                      passion,
                      skills
                    });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <textarea
                value={achievement.description}
                onChange={(e) => {
                  const updatedAchievements = achievements.map(a =>
                    a.id === achievement.id ? { ...a, description: e.target.value } : a
                  );
                  onChange({
                    achievements: updatedAchievements,
                    certifications,
                    languages,
                    projects,
                    passion,
                    skills
                  });
                }}
                className="mt-2 w-full p-2 border rounded"
                placeholder="Achievement description"
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Passion Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Passion</h3>
        <div className="space-y-4">
          {passion.map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updatedPassion = passion.map(p =>
                      p.id === item.id ? { ...p, title: e.target.value } : p
                    );
                    onChange({
                      achievements,
                      certifications,
                      languages,
                      projects,
                      passion: updatedPassion,
                      skills
                    });
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="Passion title"
                />
                <button
                  onClick={() => {
                    onChange({
                      achievements,
                      certifications,
                      languages,
                      projects,
                      passion: passion.filter(p => p.id !== item.id),
                      skills
                    });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <textarea
                value={item.description}
                onChange={(e) => {
                  const updatedPassion = passion.map(p =>
                    p.id === item.id ? { ...p, description: e.target.value } : p
                  );
                  onChange({
                    achievements,
                    certifications,
                    languages,
                    projects,
                    passion: updatedPassion,
                    skills
                  });
                }}
                className="mt-2 w-full p-2 border rounded"
                placeholder="Passion description"
                rows={2}
              />
            </div>
          ))}
          <div className="p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              placeholder="Add new passion (press Enter)"
              className="w-full p-2 border rounded"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                  const newId = Math.max(0, ...passion.map(x => x.id)) + 1;
                  onChange({
                    achievements,
                    certifications,
                    languages,
                    projects,
                    passion: [...passion, { 
                      id: newId, 
                      title: e.currentTarget.value.trim(), 
                      name: e.currentTarget.value.trim(),
                      description: '',
                      icon: 'trophy'
                    }],
                    skills
                  });
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 