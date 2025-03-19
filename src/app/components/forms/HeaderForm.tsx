import { HeaderData } from '../../types/datatypes';
import { useRef, useState } from 'react';

interface HeaderFormProps {
  data: HeaderData;
  onChange: (data: HeaderData) => void;
  profileImage: string;
  onProfileImageChange: (image: string) => void;
}

export default function HeaderForm({ data, onChange, profileImage, onProfileImageChange }: HeaderFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showTabletPreviewModal, setShowTabletPreviewModal] = useState(false);

  // Split name into first and last name, handling undefined case
  const nameParts = (data.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Split location into city and postal code, handling undefined case
  const locationParts = (data.location || '').split(',');
  const city = locationParts[0] || '';
  const postalCode = (locationParts[1] || '').trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Special handling for name fields
    if (name === 'firstName' || name === 'lastName') {
      const newFirstName = name === 'firstName' ? value : firstName;
      const newLastName = name === 'lastName' ? value : lastName;
      onChange({ ...data, name: `${newFirstName} ${newLastName}` });
      return;
    }

    // Special handling for location fields
    if (name === 'city' || name === 'postalCode') {
      const newCity = name === 'city' ? value : city;
      const newPostalCode = name === 'postalCode' ? value : postalCode;
      onChange({ ...data, location: newPostalCode ? `${newCity}, ${newPostalCode}` : newCity });
      return;
    }

    // Handle all other fields normally
    onChange({ ...data, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onProfileImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto ">
        <div className="bg-white  p-4 space-y-8">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Image</h2>
            <div className="flex items-center space-x-6">
              <div className="w-[115px] h-[115px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-gray-200">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/default-avatar.png";
                  }}
                />
              </div>
              <div className="flex-grow">
                <label 
                  htmlFor="profile-upload"
                  className="inline-flex items-center px-4 py-2 bg-[#1a4977] text-white text-sm font-medium rounded hover:bg-[#0d2b4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Choose Image
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Recommended: Square image, 400x400px or larger
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  placeholder="e.g., Jonathan"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="e.g., Doe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleChange}
                  placeholder="e.g., +1 234 567 890"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email || ''}
                  onChange={handleChange}
                  placeholder="e.g., john@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleChange}
                  placeholder="e.g., CA"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Professional Title</label>
              <input
                type="text"
                name="role"
                value={data.role || ''}
                onChange={handleChange}
                placeholder="e.g., Senior Full Stack Developer"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub Profile</label>
              <input
                type="text"
                name="github"
                value={data.github || ''}
                onChange={handleChange}
                placeholder="e.g., github.com/johndoe"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
              <textarea
                name="summary"
                value={data.summary || ''}
                onChange={handleChange}
                placeholder="Write a brief professional summary..."
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1a4977] focus:border-[#1a4977]"
              />
            </div>
          </div>

          {showTabletPreviewModal && (
            <div className="fixed inset-0 z-50 hidden sm:block md:hidden bg-gray-100">
            </div>
          )}

          <button
            onClick={() => setShowTabletPreviewModal(true)}
            className="hidden sm:flex md:hidden px-4 py-2 bg-[#1a4977] text-white rounded-md hover:bg-[#153a5f] transition-colors items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Preview Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}
