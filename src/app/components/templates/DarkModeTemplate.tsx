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

const DarkModeTemplate: FC<TemplateProps> = ({ 
  header = { email: '', phone: '', location: '', github: '', name: '', title: '', summary: '' }, 
  experience = [],  
  education = [], 
 
  languages, 
  skills, 
  achievements, 
  projects, 
  passion,
  profileImage
}) => {
  return (
    <div className="bg-gray-900 w-full h-full">
      <div className="resume-container w-[210mm] h-[297mm]">
        <div className="bg-gray-900 w-[210mm] h-[297mm] relative text-gray-100">
          {/* Decorative accent */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
          
          <div className="flex h-full pl-10">
            {/* Left sidebar - 35% */}
            <div className="w-[35%] py-8 pr-8">
              <div className="mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 mx-auto">
                  <ProfileImage src={profileImage} />
                </div>
              </div>
              
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">{header.name}</h1>
                <h2 className="text-lg text-blue-400 mb-4">{header.title}</h2>
                <p className="text-gray-400 text-sm">{header.summary}</p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-1">CONTACT</h2>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>{header.email}</div>
                  <div>{header.phone}</div>
                  <div>{header.location}</div>
                  {header.github && <div>{header.github}</div>}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-1">SKILLS</h2>
                <Skills data={skills} darkMode />
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-white mb-3 border-b border-gray-700 pb-1">LANGUAGES</h2>
                <Languages data={languages} darkMode />
              </div>
            </div>
            
            {/* Main content - 65% */}
            <div className="w-[65%] bg-gray-800 py-8 px-10">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 relative">
                  <span className="relative z-10 pr-4 bg-gray-800">WORK EXPERIENCE</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-700 z-0"></span>
                </h2>
                <ExperienceSection data={experience} darkMode />
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 relative">
                  <span className="relative z-10 pr-4 bg-gray-800">EDUCATION</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-700 z-0"></span>
                </h2>
                <EducationSection data={education} darkMode />
              </div>
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 relative">
                  <span className="relative z-10 pr-4 bg-gray-800">PROJECTS</span>
                  <span className="absolute bottom-2 left-0 w-full h-0.5 bg-gray-700 z-0"></span>
                </h2>
                <Projects data={projects} darkMode />
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">ACHIEVEMENTS</h2>
                  <Achievements data={achievements} darkMode />
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">PASSIONS</h2>
                  <Passions data={passion} darkMode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarkModeTemplate;