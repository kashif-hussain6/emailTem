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
import Experience from '../../parentComponents/ExperiencesMain';
import Education from '../../parentComponents/EducationMain';
import SummaryNew from '../../parentComponents/SummaryMain';


;
interface TemplateProps extends Omit<ResumeData, 'header'> {
  header: HeaderData;
  profileImage: string;
}

// Modern template with a horizontal header and two-column layout
const ModernTemplate: FC<TemplateProps> = ({ 
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
    <div className="bg-white w-full h-full rounded-[30px]">
      <div className="resume-container w-[210mm] h-[297mm]">
        <div className="bg-white w-[210mm] h-[297mm] relative">
          {/* Header with image and contact info */}
          <div className="bg-[#14324c] text-white p-8 flex items-center flex-row-reverse justify-between">
            <div className="mr-6">
              <div className="w-[100px] h-[100px] ">
                <ProfileImage src={profileImage} />
              </div>
            </div>
            <div>
              <h1 className="text-[38px] font-bold">{header.name}</h1>
              <h2 className="text-[19px] font-medium">{header.title} <span className="text-[19px]  mx-[4px] text-gray-300">|</span>{header.title} </h2>
              <div className="mt-2 text-sm flex flex-wrap gap-[120px]">
                <div>

                <div className="text-[12px]" >{header.phone}</div>
                <div className="text-[12px]">{header.email}</div>

                </div>
                <div className="text-[12px]">

                
                <div className="text-[12px]">{header.email}</div>
                {header.github && <div>{header.github}</div>}
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          {/* <div className="px-8 py-4 bg-gray-100">
            <Summary title="PROFESSIONAL SUMMARY" description={header.summary || ''} />
          </div> */}
          
          {/* Main content area */}
          <div className="flex p-8 gap-6">
            {/* Left column - 60% */}
            <div className="w-[60%]">
              <div className="mb-6">
              <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 mb-[8px]">
              Experience
                </h2>
                
                <Experience data={experience} />
              </div>
              
              
              <div className="mb-6">
              <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 mb-[8px]">
              Education
                </h2>
                <Education data={education} />
              </div>
              <div className="mb-6">
              <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 mb-4">
              Skills
                </h2>
              
                <Skills data={skills} />
              </div>
              
              
            </div>
            
            {/* Right column - 40% */}
            <div className="w-[40%]">
            <div className=" ">
            <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 mb-[8px]">
              Summary
                </h2>

            {/* <SummaryNew  description={header.summary || ''} /> */}
          </div>
          <div className="mb-6">
          <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 ">
             key Achievements
                </h2>
                <Achievements data={achievements} />
              </div>
              
              
              <div className="mb-6">
              <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 mb-4">
            Courses
                </h2>
                
                <Skills data={skills} />
              </div>
              
              
              
              <div className="mb-6">
              <h2 className="text-[#235986] text-[22px] font-semibold uppercase
 border-b-[3px] border-[#235986] pb-1 mb-4">
            PASSIONS
                </h2>
                <h2/>
                <Passions data={passion} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate; 