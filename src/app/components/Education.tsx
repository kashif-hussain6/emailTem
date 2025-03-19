"use client";

import { Education as EducationType } from "../types/datatypes";

interface EducationProps {
  data: EducationType[];
}

const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <div className="relative">
      <h2 className="text-[16px] font-normal max-sm:font-bold text-[#2c2a2a] border-b-[1px] border-[#bdbdbd] pb-[5px]">
        EDUCATION
      </h2>
      <div className="mt-2">
        {data.map((edu) => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-center">
              <p className="text-[#008CFF] text-[14px] font-normal">
                {edu.institution}
              </p>
              <p className="text-[12px]">{edu.city}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-[12px] text-[#2c2a2a]">{edu.degree}</p>
              <p className="text-[12px] text-[#2c2a2a]">{edu.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
