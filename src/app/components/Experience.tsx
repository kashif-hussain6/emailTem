"use client";

import { Experience as ExperienceType } from "../types/datatypes";

interface ExperienceProps {
  data: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <div className="relative">
      <h2 className="text-[16px] font-normal max-sm:font-bold text-[#2c2a2a] border-b-[1px] border-[#bdbdbd] pb-[5px]">
        EXPERIENCE
      </h2>
      <div className="">
        {data.map((exp) => (
          <div key={exp.id} className="mt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] text-[#2c2a2a] font-normal">
                {exp.role}
              </h3>
              <p className="text-[#2c2a2a] text-[12px]">
                {exp.date}
              </p>
            </div>
            <div className="flex justify-between items-center mt-[6px]">
              <p className="text-[#008CFF] text-[14px]">
                {exp.company}
              </p>
              <p className="text-[12px]">
                {exp.city}
              </p>
            </div>
            <ul className="list-disc mt-2 text-[#2c2a2a] text-[12px] pl-5">
              {exp.responsibilities.map((task, index) => (
                <li key={index} className="relative pl-1 mb-1">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
