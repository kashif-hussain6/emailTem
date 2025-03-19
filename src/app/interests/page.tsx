'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Passion } from '../types/datatypes';
import { passion as initialPassion } from '../lib/data';

export default function InterestsPage() {
  const [interests, setInterests] = useState<Passion[]>([]);
  const [newInterest, setNewInterest] = useState<Omit<Passion, 'id'>>({
    title: '',
    name: '',
    description: '',
    icon: 'trophy' // Default icon
  });
  const [editingInterest, setEditingInterest] = useState<Passion | null>(null);
  
  // Load interests from localStorage or use initial data
  useEffect(() => {
    const savedInterests = localStorage.getItem('resumeInterests');
    if (savedInterests) {
      try {
        setInterests(JSON.parse(savedInterests));
      } catch (e) {
        console.error('Error parsing saved interests:', e);
        setInterests(initialPassion);
      }
    } else {
      setInterests(initialPassion);
    }
  }, []);
  
  // Save interests to localStorage when they change
  useEffect(() => {
    if (interests.length > 0) {
      localStorage.setItem('resumeInterests', JSON.stringify(interests));
    }
  }, [interests]);
  
  // Handle adding a new interest
  const handleAddInterest = () => {
    if (!newInterest.title.trim()) return;
    
    const newId = Math.max(0, ...interests.map(i => i.id)) + 1;
    const interestToAdd = {
      ...newInterest,
      id: newId,
      // Make sure name is set, fallback to title if it's not
      name: newInterest.name.trim() || newInterest.title.trim()
    };
    
    setInterests([...interests, interestToAdd]);
    setNewInterest({
      title: '',
      name: '',
      description: '',
      icon: 'trophy' // Default icon
    });
  };
  
  // Handle updating an interest
  const handleUpdateInterest = () => {
    if (!editingInterest) return;
    
    const updatedInterests = interests.map(interest => 
      interest.id === editingInterest.id ? editingInterest : interest
    );
    
    setInterests(updatedInterests);
    setEditingInterest(null);
  };
  
  // Handle removing an interest
  const handleRemoveInterest = (id: number) => {
    setInterests(interests.filter(interest => interest.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-red-50">
      <Navbar activeSection="interests" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Interests</h1>
          <p className="text-gray-600 mb-6">
            Add, edit, or remove interests and passions to showcase in your resume. These will be displayed in the Interests section.
          </p>
          
          {/* List of existing interests */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Your Interests</h3>
            
            {interests.map((interest) => (
              <div key={interest.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{interest.title}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingInterest(interest)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveInterest(interest.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                {interest.description && (
                  <p className="text-sm text-gray-600">{interest.description}</p>
                )}
              </div>
            ))}
          </div>
          
          {/* Edit interest form */}
          {editingInterest && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <h4 className="font-medium mb-3">Edit Interest</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingInterest.title}
                    onChange={(e) => setEditingInterest({...editingInterest, title: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingInterest.name}
                    onChange={(e) => setEditingInterest({...editingInterest, name: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={editingInterest.icon}
                    onChange={(e) => setEditingInterest({...editingInterest, icon: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., trophy, award, star"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    value={editingInterest.description}
                    onChange={(e) => setEditingInterest({...editingInterest, description: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setEditingInterest(null)}
                    className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateInterest}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Add new interest form */}
          {!editingInterest && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Add New Interest</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newInterest.title}
                    onChange={(e) => setNewInterest({...newInterest, title: e.target.value})}
                    placeholder="Interest title"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    value={newInterest.description}
                    onChange={(e) => setNewInterest({...newInterest, description: e.target.value})}
                    placeholder="Brief description of your interest"
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
                  <input
                    type="text"
                    value={newInterest.name}
                    onChange={(e) => setNewInterest({...newInterest, name: e.target.value})}
                    placeholder="Same as title if left empty"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input
                    type="text"
                    value={newInterest.icon}
                    onChange={(e) => setNewInterest({...newInterest, icon: e.target.value})}
                    placeholder="e.g., trophy, award, star"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddInterest}
                    disabled={!newInterest.title.trim()}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Interest
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