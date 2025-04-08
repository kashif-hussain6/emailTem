"use client";

import { FC } from 'react';
import { ResumeData, HeaderData } from '../../types/datatypes';
import Header from '../Header';
import Summary from '../Summary';
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

const TypographicTemplate: FC<TemplateProps> = ({ 
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
    <div className="bg-white w-full h-full font-serif">
      <div className="resume-container w-[210mm] h-[297mm]">
        <div className="bg-white w-[210mm] h-[297mm] relative p-12">
          {/* Header section */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-5xl font-light tracking-tight mb-1">{header.name}</h1>
              <h2 className="text-xl font-light text-gray-600">{header.title}</h2>
            </div>
            
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
              <ProfileImage src={profileImage} />
            </div>
          </div>
          
          {/* Contact info */}
          <div className="flex justify-between text-sm text-gray-600 mb-12">
            <div>{header.email}</div>
            <div>{header.phone}</div>
            <div>{header.location}</div>
            {header.github && <div>{header.github}</div>}
          </div>
          
          {/* Summary */}
          {header.summary && (
            <div className="mb-12">
              <p className="text-lg leading-relaxed">{header.summary}</p>
            </div>
          )}
          
          {/* Main content */}
          <div className="grid grid-cols-3 gap-12">
            {/* Left column - Skills & Languages */}
            <div className="col-span-1">
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Skills</h2>
                <Skills data={skills} minimal />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Languages</h2>
                <Languages data={languages} minimal />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Passions</h2>
                <Passions data={passion} minimal />
              </div>
            </div>
            
            {/* Right column - Experience & Education */}
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Experience</h2>
                <ExperienceSection data={experience} minimal />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Education</h2>
                <EducationSection data={education} minimal />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Projects</h2>
                <Projects data={projects} minimal />
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-normal border-b border-gray-300 pb-1 mb-3">Achievements</h2>
                <Achievements data={achievements} minimal />
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="absolute bottom-8 left-12 right-12 border-t border-gray-200 pt-4 text-xs text-gray-500 text-center">
            {header.name} • Resume • {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypographicTemplate;