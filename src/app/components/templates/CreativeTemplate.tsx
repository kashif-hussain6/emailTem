
"use client";

import { FC } from 'react';
import { ResumeData, HeaderData } from '../../types/datatypes';

import ExperienceSection from '../Experience';
import EducationSection from '../Education';
import Languages from '../Languages';
import Skills from '../Skills';
import Achievements from '../Achievements';
import ProfileImage from '../ProfileImage';
import Projects from '../Projects';
import Passions from '../Passions';

interface TemplateProps extends Omit<ResumeData, 'header'> {
  header: HeaderData;
  profileImage: string;
}

const CreativeTemplate: FC<TemplateProps> = ({ 
  header = { email: '', phone: '', location: '', github: '', name: '', title: '', summary: '' }, 
  experience = [],  // Default value added here
  education = [],   // Default value added here
  languages, 
  skills, 
  achievements, 
  projects, 
  passion,
  profileImage
}) => {
  return (
    <div className="bg-white w-full h-full font-sans">
      <div className="resume-container w-[210mm] h-[297mm]">
        <div className="bg-white w-[210mm] h-[297mm] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-600"></div>
          <div className="absolute top-12 left-0 w-16 h-16 rounded-full bg-blue-100 opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-purple-100 opacity-20"></div>
          
          <div className="flex h-full">
            {/* Left sidebar - 30% */}
            <div className="w-[30%] bg-gray-50 p-8 flex flex-col">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <ProfileImage src={profileImage} />
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
                  <span className="relative z-10 px-2 bg-gray-50">CONTACT</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-200 z-0"></span>
                </h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>{header.email}</div>
                  <div>{header.phone}</div>
                  <div>{header.location}</div>
                  {header.github && <div>{header.github}</div>}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
                  <span className="relative z-10 px-2 bg-gray-50">SKILLS</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-200 z-0"></span>
                </h2>
                <Skills data={skills} />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
                  <span className="relative z-10 px-2 bg-gray-50">LANGUAGES</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-200 z-0"></span>
                </h2>
                <Languages data={languages} />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 relative">
                  <span className="relative z-10 px-2 bg-gray-50">PASSIONS</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-200 z-0"></span>
                </h2>
                <Passions data={passion} />
              </div>
            </div>
            
            {/* Main content - 70% */}
            <div className="w-[70%] p-8">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-1">{header.name}</h1>
                <h2 className="text-xl font-medium text-blue-600 mb-4">{header.title}</h2>
                <p className="text-gray-700">{header.summary}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">💼</span> EXPERIENCE
                </h2>
                <ExperienceSection data={experience} />
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🎓</span> EDUCATION
                </h2>
                <EducationSection data={education} />
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🏆</span> ACHIEVEMENTS
                </h2>
                <Achievements data={achievements} />
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🔧</span> PROJECTS
                </h2>
                <Projects data={projects} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreativeTemplate;
