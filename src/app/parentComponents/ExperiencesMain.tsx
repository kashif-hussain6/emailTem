"use client";

import { Experience as ExperienceType } from "../types/datatypes";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ExperienceProps {
  data: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  return (
    <div className="relative">
      
      <div className="">
        {data.map((exp) => (
          <div key={exp.id} className="">
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] text-[#235986] font-normal">
                {exp.role}
              </h3>
              
            </div>
            <div className=" justify-between items-center mt-[6px]">
              <p className="text-[#14324c] text-[15px] font-bold mb-2">
                {exp.company}
              </p>
              <div className="flex gap-[20px]">

              <p className="text-[#2c2a2a] text-[12px] flex items-center gap-1">
  <FaRegCalendarAlt className="text-[#2c2a2a] text-[14px]" /> 
  {exp.date}
</p>
              <p className="text-[12px] flex items-center gap-1">
              <FaMapMarkerAlt className="text-[#2c2a2a] text-[12px] " />
                {exp.city}
              </p>
              </div>
            </div>
            <ul className="list-disc my-2 py-[5px] text-[#2c2a2a] text-[13px] pl-5 border-b-2 border-dashed border-[#ccc]
">
              {exp.responsibilities.map((task, index) => (
                <li key={index} className=" pl-1 mb-1">
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
