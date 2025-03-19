import { Achievement, Certification, Project, Passion, SkillCategory } from '../types/datatypes';
import SkillsSection from "./Skills";
import Achievements from "./Achievements";
import Certifications from "./Certifications";
import Projects from "./Projects";
import Passions from "./Passions";

interface LeftColumnProps {
  skills: SkillCategory[];
  achievements: Achievement[];
  certifications: Certification[];
  projects: Project[];
  passion: Passion[];
}

export default function LeftColumn({ skills, achievements, certifications, projects, passion }: LeftColumnProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Skills</h2>
        <SkillsSection data={skills} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Achievements</h2>
        <Achievements data={achievements} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Certifications</h2>
        <Certifications data={certifications} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Projects</h2>
        <Projects data={projects} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold border-b border-gray-700 pb-2">Interests</h2>
        <Passions data={passion} />
      </div>
    </div>
  );
}
