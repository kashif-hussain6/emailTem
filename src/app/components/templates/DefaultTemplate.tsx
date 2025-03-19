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

// This is the default template, based on the original Resume component
const DefaultTemplate: FC<TemplateProps> = ({ 
  header, 
  experience, 
  education, 
  languages, 
  skills, 
  achievements, 
  projects, 
  passion,
  profileImage
}) => {
  return (
    <div className="bg-white w-full h-full">
      <div className="resume-container w-[210mm] h-[297mm]">
        <div className="bg-white w-[210mm] h-[297mm] relative">
          <div className="flex h-full">
            <div className="left-column w-[140mm] bg-white pt-[40px] pl-[40px] pr-[25px] pb-[20px]">
              <div className="header-section">
                <Header data={header} />
              </div>
              
              <div className="summary-section text-[16px]">
                <Summary title="SUMMARY" description={header.summary || ''} />
              </div>

              <div className="left-section mt-4" data-section="experience">
                <ExperienceSection data={experience} />
              </div>

              <div className="left-section mt-4" data-section="education">
                <EducationSection data={education} />
              </div>

              <div className="left-section mt-4" data-section="languages">
                <Languages data={languages} />
              </div>
            </div>

            <div className="right-column w-[70mm] bg-[#22405c] border-t-[20px] border-[#182d40] text-white pt-[30px] px-6 pb-[20px]">
              <div className="flex justify-center mb-8">
                <div className="w-[115px] h-[115px]">
                  <ProfileImage src={profileImage} />
                </div>
              </div>
              
              <div className="section" data-section="achievements">
                <h2 className="text-white uppercase font-medium border-b border-opacity-30 border-white pb-2 mb-4">
                  KEY ACHIEVEMENTS
                </h2>
                <Achievements data={achievements} />
              </div>

              <div className="section mt-8" data-section="skills">
                <h2 className="text-white uppercase font-medium border-b border-opacity-30 border-white pb-2 mb-4">
                  SKILLS
                </h2>
                <Skills data={skills} />
              </div>
              
              <div className="section mt-8" data-section="projects">
                <h2 className="text-white uppercase font-medium border-b border-opacity-30 border-white pb-2 mb-4">
                  PROJECTS
                </h2>
                <Projects data={projects} />
              </div>
              
              <div className="section mt-8" data-section="passions">
                <h2 className="text-white uppercase font-medium border-b border-opacity-30 border-white pb-2 mb-4">
                  PASSIONS
                </h2>
                <Passions data={passion} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultTemplate; 