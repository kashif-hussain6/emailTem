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

interface TemplateProps extends Omit<ResumeData, 'header'> {
  header: HeaderData;
  profileImage: string;
}

// Minimal template with clean typography and subtle styling
const MinimalTemplate: FC<TemplateProps> = ({ 
  header, 
  experience, 
  education, 
  languages, 
  skills, 
  achievements, 
  projects,
  profileImage
}) => {
  return (
    <div className="bg-white w-full h-full">
      <div className="resume-container w-[210mm] h-[297mm]">
        <div className="bg-white w-[210mm] h-[297mm] relative p-12">
          {/* Minimal header with name and title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-normal uppercase tracking-wide">{header.name}</h1>
            <h2 className="text-xl font-light text-gray-600 mt-1">{header.title}</h2>
            
            <div className="mt-4 flex justify-center items-center gap-4 text-sm text-gray-600">
              <div>{header.email}</div>
              <div>•</div>
              <div>{header.phone}</div>
              <div>•</div>
              <div>{header.location}</div>
              {header.github && (
                <>
                  <div>•</div>
                  <div>{header.github}</div>
                </>
              )}
            </div>
          </div>
          
          {/* Summary */}
          {header.summary && (
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <p className="text-gray-700 font-light italic">{header.summary}</p>
            </div>
          )}
          
          {/* Line divider */}
          <div className="border-t border-gray-200 mb-8"></div>
          
          {/* Main content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left column - Skills & Languages */}
            <div className="col-span-1">
              <div className="mb-6">
                <h2 className="text-md uppercase font-medium tracking-wide border-b border-gray-200 pb-1 mb-3">
                  Skills
                </h2>
                <Skills data={skills} />
              </div>
              
              <div className="mb-6">
                <h2 className="text-md uppercase font-medium tracking-wide border-b border-gray-200 pb-1 mb-3">
                  Languages
                </h2>
                <Languages data={languages} />
              </div>
              
              <div className="mb-6">
                <h2 className="text-md uppercase font-medium tracking-wide border-b border-gray-200 pb-1 mb-3">
                  Achievements
                </h2>
                <Achievements data={achievements} />
              </div>
            </div>
            
            {/* Right column - Experience & Education */}
            <div className="col-span-2">
              <div className="mb-6">
                <h2 className="text-md uppercase font-medium tracking-wide border-b border-gray-200 pb-1 mb-3">
                  Experience
                </h2>
                <ExperienceSection data={experience} />
              </div>
              
              <div className="mb-6">
                <h2 className="text-md uppercase font-medium tracking-wide border-b border-gray-200 pb-1 mb-3">
                  Education
                </h2>
                <EducationSection data={education} />
              </div>
              
              <div className="mb-6">
                <h2 className="text-md uppercase font-medium tracking-wide border-b border-gray-200 pb-1 mb-3">
                  Projects
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

export default MinimalTemplate; 