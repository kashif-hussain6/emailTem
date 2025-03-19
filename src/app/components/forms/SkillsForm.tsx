import { SkillCategory } from '../../types/datatypes';
import { useState } from 'react';

interface SkillsFormProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newSkills, setNewSkills] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  const handleAdd = () => {
    if (newSkills.length === 0 || !categoryName.trim()) return;
    const newId = Math.max(0, ...data.map(x => x.id)) + 1;
    onChange([...data, { id: newId, name: categoryName, skills: [...newSkills] }]);
    setNewSkills([]);
    setCategoryName('');
  };

  const handleEdit = (index: number) => {
    const updated = [...data];
    updated[index] = { ...data[index], skills: [...newSkills] };
    onChange(updated);
    setEditIndex(null);
    setNewSkills([]);
  };

  const handleDelete = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const addSkill = () => {
    setNewSkills([...newSkills, '']);
  };

  const removeSkill = (index: number) => {
    setNewSkills(newSkills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...newSkills];
    updated[index] = value;
    setNewSkills(updated);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Skills</h3>
      
      <div className="space-y-4 mb-6">
        {data.map((category, index) => (
          <div key={category.id} className="border p-3 rounded">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setNewSkills([...category.skills]);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            placeholder="e.g., Programming Languages"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          {newSkills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkill(index, e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., JavaScript"
              />
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addSkill}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            + Add Skill
          </button>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          {editIndex !== null ? (
            <>
              <button
                onClick={() => {
                  setEditIndex(null);
                  setNewSkills([]);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEdit(editIndex)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={newSkills.length === 0}
            >
              Add Skill Category
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 