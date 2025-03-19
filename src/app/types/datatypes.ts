export interface HeaderData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  github: string;
  summary: string;
}

export interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  achievement: string;
}

export interface Certification {
  id: number;
  title: string;
  organization: string;
  description: string;
  date: string;
  issuer: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  date: string;
  city: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  role: string;
  city: string;
  date: string;
  description: string;
  responsibilities: string[];
}

export interface Language {
  id: number;
  name: string;
  level: string;
  proficiency: number;
}

export interface Project {
  id: number;
  title: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface Passion {
  id: number;
  title: string;
  name: string;
  description: string;
  icon: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  skills: string[];
}

export interface ResumeData {
  header: HeaderData;
  experience: Experience[];
  education: Education[];
  languages: Language[];
  skills: SkillCategory[];
  achievements: Achievement[];
  certifications: Certification[];
  projects: Project[];
  passion: Passion[];
  profileImage: string;
}
  