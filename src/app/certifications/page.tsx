'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Certification } from '../types/datatypes';
import { certifications as initialCertifications } from '../lib/data';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({
    title: '',
    organization: '',
    issuer: '',
    date: '',
    description: ''
  });
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  
  // Load certifications from localStorage or use initial data
  useEffect(() => {
    const savedCertifications = localStorage.getItem('resumeCertifications');
    if (savedCertifications) {
      try {
        setCertifications(JSON.parse(savedCertifications));
      } catch (e) {
        console.error('Error parsing saved certifications:', e);
        setCertifications(initialCertifications);
      }
    } else {
      setCertifications(initialCertifications);
    }
  }, []);
  
  // Save certifications to localStorage when they change
  useEffect(() => {
    if (certifications.length > 0) {
      localStorage.setItem('resumeCertifications', JSON.stringify(certifications));
    }
  }, [certifications]);
  
  // Handle adding a new certification
  const handleAddCertification = () => {
    if (!newCertification.title.trim()) return;
    
    const newId = Math.max(0, ...certifications.map(c => c.id)) + 1;
    const certificationToAdd = {
      ...newCertification,
      id: newId
    };
    
    setCertifications([...certifications, certificationToAdd]);
    setNewCertification({
      title: '',
      organization: '',
      issuer: '',
      date: '',
      description: ''
    });
  };
  
  // Handle updating a certification
  const handleUpdateCertification = () => {
    if (!editingCertification) return;
    
    const updatedCertifications = certifications.map(cert => 
      cert.id === editingCertification.id ? editingCertification : cert
    );
    
    setCertifications(updatedCertifications);
    setEditingCertification(null);
  };
  
  // Handle removing a certification
  const handleRemoveCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-red-50">
      <Navbar activeSection="certifications" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Certifications</h1>
          <p className="text-gray-600 mb-6">
            Add, edit, or remove certifications to showcase in your resume. These certifications will be displayed in the Certifications section.
          </p>
          
          {/* List of existing certifications */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Your Certifications</h3>
            
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{cert.title}</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingCertification(cert)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveCertification(cert.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Issuer:</span> {cert.issuer}
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Organization:</span> {cert.organization}
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Date:</span> {cert.date}
                </div>
                
                {cert.description && (
                  <p className="text-sm text-gray-600">{cert.description}</p>
                )}
              </div>
            ))}
          </div>
          
          {/* Edit certification form */}
          {editingCertification && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
              <h4 className="font-medium mb-3">Edit Certification</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingCertification.title}
                    onChange={(e) => setEditingCertification({...editingCertification, title: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input
                    type="text"
                    value={editingCertification.organization}
                    onChange={(e) => setEditingCertification({...editingCertification, organization: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                  <input
                    type="text"
                    value={editingCertification.issuer}
                    onChange={(e) => setEditingCertification({...editingCertification, issuer: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={editingCertification.date}
                    onChange={(e) => setEditingCertification({...editingCertification, date: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., May 2023"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    value={editingCertification.description}
                    onChange={(e) => setEditingCertification({...editingCertification, description: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setEditingCertification(null)}
                    className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateCertification}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Add new certification form */}
          {!editingCertification && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Add New Certification</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newCertification.title}
                    onChange={(e) => setNewCertification({...newCertification, title: e.target.value})}
                    placeholder="Certification title"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input
                    type="text"
                    value={newCertification.organization}
                    onChange={(e) => setNewCertification({...newCertification, organization: e.target.value})}
                    placeholder="Organization"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                  <input
                    type="text"
                    value={newCertification.issuer}
                    onChange={(e) => setNewCertification({...newCertification, issuer: e.target.value})}
                    placeholder="Issuing organization"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={newCertification.date}
                    onChange={(e) => setNewCertification({...newCertification, date: e.target.value})}
                    placeholder="e.g., May 2023"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    value={newCertification.description}
                    onChange={(e) => setNewCertification({...newCertification, description: e.target.value})}
                    placeholder="Brief description of the certification"
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddCertification}
                    disabled={!newCertification.title.trim()}
                    className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Certification
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