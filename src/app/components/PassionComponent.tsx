"use client";

import { FaLightbulb } from "react-icons/fa";
import { Passion } from "../types/datatypes";

interface PassionComponentProps {
  data: Passion[];
}

const PassionComponent: React.FC<PassionComponentProps> = ({ data }) => {
  return (
    <div className="relative mt-6">
      <h3 className="text-[16px] border-b-[1px] border-white mb-2 pb-[5px]">
        PASSION
      </h3>
      <ul className="mt-4 text-[12px]">
        {data.map((item) => (
          <li key={item.id} className="mt-2">
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#e6e6e6] w-4 h-4 shrink-0" />
              <span className="text-[14px] text-[#e6e6e6]">{item.title}</span>
            </div>
            <p className="mt-2 text-[#e6e6e6]">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassionComponent;
