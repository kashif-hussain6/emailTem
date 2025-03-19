import { Education } from '../../types/datatypes';
import { useState } from 'react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newEducation, setNewEducation] = useState<Education>({
    id: 0,
    degree: '',
    institution: '',
    date: '',
    city: '',
    field: ''
  });

  const handleAdd = () => {
    const newId = Math.max(0, ...data.map(x => x.id)) + 1;
    onChange([...data, { ...newEducation, id: newId }]);
    setNewEducation({
      id: 0,
      degree: '',
      institution: '',
      date: '',
      city: '',
      field: ''
    });
  };

  const handleEdit = (index: number) => {
    const updated = [...data];
    updated[index] = { ...data[index], ...newEducation };
    onChange(updated);
    setEditIndex(null);
    setNewEducation({
      id: 0,
      degree: '',
      institution: '',
      date: '',
      city: '',
      field: ''
    });
  };

  const handleDelete = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Education</h3>
      
      {/* Existing Education */}
      <div className="space-y-4 mb-6">
        {data.map((edu, index) => (
          <div key={edu.id} className="border p-3 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{edu.degree}</h4>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.date} - {edu.city}</p>
                <p className="text-sm text-gray-500">Field: {edu.field}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setNewEducation(edu);
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

      {/* Add/Edit Form */}
      <div className="space-y-3 border-t pt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree
          </label>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Bachelor of Science in Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Institution
          </label>
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., University of Technology"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="text"
            value={newEducation.date}
            onChange={(e) => setNewEducation({ ...newEducation, date: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 2016 - 2020"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            value={newEducation.city}
            onChange={(e) => setNewEducation({ ...newEducation, city: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study
          </label>
          <input
            type="text"
            value={newEducation.field}
            onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Computer Science"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          {editIndex !== null ? (
            <>
              <button
                onClick={() => {
                  setEditIndex(null);
                  setNewEducation({
                    id: 0,
                    degree: '',
                    institution: '',
                    date: '',
                    city: '',
                    field: ''
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
              Add Education
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 