import { Experience } from '../../types/datatypes';
import { useState } from 'react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newExperience, setNewExperience] = useState<Experience>({
    id: 0,
    role: '',
    company: '',
    position: '',
    city: '',
    date: '',
    description: '',
    responsibilities: [''],
  });

  const handleAdd = () => {
    const newId = Math.max(0, ...data.map(x => x.id)) + 1;
    onChange([...data, { ...newExperience, id: newId }]);
    setNewExperience({
      id: 0,
      role: '',
      company: '',
      position: '',
      city: '',
      date: '',
      description: '',
      responsibilities: [''],
    });
  };

  const handleEdit = (index: number) => {
    const updated = [...data];
    updated[index] = { ...data[index], ...newExperience };
    onChange(updated);
    setEditIndex(null);
    setNewExperience({
      id: 0,
      role: '',
      company: '',
      position: '',
      city: '',
      date: '',
      description: '',
      responsibilities: [''],
    });
  };

  const handleDelete = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleResponsibilityChange = (value: string, index: number) => {
    const updated = [...newExperience.responsibilities];
    updated[index] = value;
    setNewExperience({ ...newExperience, responsibilities: updated });
  };

  const addResponsibility = () => {
    setNewExperience({
      ...newExperience,
      responsibilities: [...newExperience.responsibilities, ''],
    });
  };

  const removeResponsibility = (index: number) => {
    setNewExperience({
      ...newExperience,
      responsibilities: newExperience.responsibilities.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Experience</h3>
      
      <div className="space-y-4 mb-6">
        {data.map((exp, index) => (
          <div key={exp.id} className="border p-3 rounded">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{exp.role}</h4>
                <p className="text-sm text-gray-600">{exp.company} - {exp.city}</p>
                <p className="text-sm text-gray-500">{exp.date}</p>
                <p className="text-sm text-gray-500">Position: {exp.position}</p>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-1">Description: {exp.description}</p>
                )}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setNewExperience(exp);
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
            <ul className="list-disc list-inside text-sm text-gray-700">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            value={newExperience.role}
            onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Senior Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Tech Corp"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={newExperience.city}
            onChange={(e) => setNewExperience({ ...newExperience, city: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="text"
            value={newExperience.date}
            onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 2020 - Present"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief description of your role"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Responsibilities
          </label>
          {newExperience.responsibilities.map((resp, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={resp}
                onChange={(e) => handleResponsibilityChange(e.target.value, index)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a responsibility"
              />
              <button
                onClick={() => removeResponsibility(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addResponsibility}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            + Add Responsibility
          </button>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          {editIndex !== null ? (
            <>
              <button
                onClick={() => {
                  setEditIndex(null);
                  setNewExperience({
                    id: 0,
                    role: '',
                    company: '',
                    position: '',
                    city: '',
                    date: '',
                    description: '',
                    responsibilities: [''],
                  });
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
            >
              Add Experience
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 