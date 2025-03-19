import { HeaderData, Experience, Education, Language } from '../types/datatypes';
import Header from "./Header";
import ExperienceSection from "./Experience";
import EducationSection from "./Education";
import Languages from "./Languages";

interface RightColumnProps {
  header: HeaderData;
  experience: Experience[];
  education: Education[];
  languages: Language[];
}

export default function RightColumn({ header, experience, education, languages }: RightColumnProps) {
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-6">
        <Header data={header} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
        <ExperienceSection data={experience} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <EducationSection data={education} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Languages</h2>
        <Languages data={languages} />
      </div>
    </div>
  );
}
