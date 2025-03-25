"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import LeftColumn from "../components/LeftColumn"; 
import RightColumn from "../components/RightColumn"; 

const defaultHeader = {
  name: '',
  title: '',
  location: '',
  email: '',
  phone: '',
  image: '',
  role: '',
  github: '',
  summary: ''
};

const defaultExperience = [{
  id: 1,
  company: '',
  position: '',
  role: '',
  city: '',
  date: '',
  description: '',
  responsibilities: []
}];

const defaultEducation = [{
  id: 1,
  institution: '',
  degree: '',
  field: '',
  date: '',
  city: ''
}];

const defaultLanguages = [{
  id: 1,
  name: '',
  level: '',
  proficiency: 0
}];

const defaultSkills = [{
  id: 1,
  name: '',
  skills: []
}];

const defaultAchievements = [{
  id: 1,
  icon: '',
  title: '',
  description: '',
  achievement: ''
}];

const defaultCertifications = [{
  id: 1,
  title: '',
  organization: '',
  description: '',
  date: '',
  issuer: ''
}];

const defaultProjects = [{
  id: 1,
  title: '',
  name: '',
  description: '',
  technologies: []
}];

const defaultPassion = [{
  id: 1,
  title: '',
  name: '',
  description: '',
  icon: 'trophy'
}];

const A4_WIDTH = 595;
const A4_HEIGHT = 842;

interface ResumeProps {
  header: typeof defaultHeader;
  experience: typeof defaultExperience;
  education: typeof defaultEducation;
  languages: typeof defaultLanguages;
  skills: typeof defaultSkills;
  achievements: typeof defaultAchievements;
  certifications: typeof defaultCertifications;
  projects: typeof defaultProjects;
  passion: typeof defaultPassion;
  profileImage: string;
  isMobile?: boolean;
}

const Home: NextPage<ResumeProps> = ({ 
  header, 
  experience, 
  education, 
  languages, 
  skills, 
  achievements, 
  certifications, 
  projects, 
  passion,
  profileImage,
  isMobile = false
}) => {
  return (
    <div className="bg-white w-full">
      <div className={`${isMobile ? 'flex flex-col' : 'flex'}`}>
        {/* Left Column */}
        <div 
          className={`
            ${isMobile ? 'w-full' : 'w-1/3'} 
            bg-gray-800 text-white
            ${isMobile ? 'p-4' : 'p-6'}
          `}
        >
          <div className={`space-y-${isMobile ? '4' : '6'}`}>
            {profileImage ? (
              <div className={`
                ${isMobile ? 'w-20 h-20' : 'w-32 h-32'} 
                rounded-full mx-auto mb-4 overflow-hidden
              `}>
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            ) : (
              <div className={`
                ${isMobile ? 'w-20 h-20' : 'w-32 h-32'} 
                rounded-full bg-gray-700 mx-auto mb-4
              `} />
            )}
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              <LeftColumn 
                skills={skills}
                achievements={achievements}
                certifications={certifications}
                projects={projects}
                passion={passion}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={`
          ${isMobile ? 'w-full' : 'w-2/3'} 
          bg-white
          ${isMobile ? 'p-4' : 'p-6'}
        `}>
          <RightColumn
            header={header}
            experience={experience}
            education={education}
            languages={languages}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
