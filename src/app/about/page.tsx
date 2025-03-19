'use client';

import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-red-50">
      <Navbar activeSection="about" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">About Resume Builder</h1>
          
          <div className="prose max-w-none">
          <div>jgnroierh</div>
            <p className="text-gray-600 mb-4">
              Resume Builder is a powerful tool designed to help you create professional, 
              customizable resumes that stand out to employers. With our intuitive interface, 
              you can easily manage all aspects of your resume, from your professional experience 
              to your skills and interests.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Features</h2>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Professional Templates:</strong> Our resume template is designed to be clean, 
                professional, and ATS-friendly.
              </li>
              <li>
                <strong>Customizable Sections:</strong> Add, edit, or remove sections to tailor your 
                resume to specific job applications.
              </li>
              <li>
                <strong>Real-time Preview:</strong> See changes to your resume in real-time as you edit.
              </li>
              <li>
                <strong>PDF Export:</strong> Download your resume as a PDF file ready for submission.
              </li>
              <li>
                <strong>Data Persistence:</strong> Your resume data is saved locally, so you can 
                return to editing at any time.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How to Use</h2>
            
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Start with the Header:</strong> Add your personal information and contact details.
              </li>
              <li>
                <strong>Add Experience:</strong> Include your work history with detailed descriptions.
              </li>
              <li>
                <strong>Include Education:</strong> Add your educational background and achievements.
              </li>
              <li>
                <strong>Highlight Skills:</strong> Showcase your technical and soft skills.
              </li>
              <li>
                <strong>Add Projects:</strong> Feature your notable projects with descriptions and technologies used.
              </li>
              <li>
                <strong>Include Certifications:</strong> List relevant certifications to boost your credentials.
              </li>
              <li>
                <strong>Share Interests:</strong> Add personal interests to show your well-rounded personality.
              </li>
              <li>
                <strong>Download:</strong> When you're satisfied with your resume, download it as a PDF.
              </li>
            </ol>
            
            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Tips for a Great Resume</h2>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Be Concise:</strong> Keep your resume to 1-2 pages maximum.
              </li>
              <li>
                <strong>Use Action Verbs:</strong> Start bullet points with strong action verbs.
              </li>
              <li>
                <strong>Quantify Achievements:</strong> Use numbers and percentages to demonstrate impact.
              </li>
              <li>
                <strong>Tailor to the Job:</strong> Customize your resume for each application.
              </li>
              <li>
                <strong>Proofread:</strong> Check for spelling and grammar errors before submitting.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 