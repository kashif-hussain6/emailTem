"use client";

import { Education as EducationType } from "../types/datatypes";
import { FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface EducationProps {
  data: EducationType[];
}

const Education: React.FC<EducationProps> = ({ data }) => {
  return (
    <div className="relative ">
      
      <div className="mt-2">
        {data.map((edu) => (
          <div key={edu.id} className="mb-4 border-b-2 border-dashed border-[#ccc] py-[6px]">
            <div>
            <p className="text-[20px] text-[#235986]">{edu.degree}</p>

            </div>
            <div className="flex justify-between items-center">
              <p className="text-[#14324c] text-[16px] font-semibold">
                {edu.institution}
              </p>
            </div>
            <div className="flex gap-[20px] items-center mt-2">
  <p className="text-[12px] text-[#2c2a2a] flex items-center gap-1">
    <FaRegCalendarAlt className="text-[14px] text-[#2c2a2a]" />
    {edu.date}
  </p>
  <p className="text-[12px] text-[#2c2a2a] flex items-center gap-1">
    <FaMapMarkerAlt className="text-[14px] text-[#2c2a2a]" />
    {edu.city}
  </p>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
