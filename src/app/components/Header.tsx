"use client";

import { MdPhone } from "react-icons/md"; 
import { FaEnvelope, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { HeaderData } from '../types/datatypes';

interface HeaderProps {
  data: HeaderData;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <div className="pb-10">
      <div className="">
        <h1 className="text-[28px] mb-[-2px] font-rubik pb-[2px] font-medium text-[#1e1d1d]">
          {data.name}
        </h1>
        <p className="text-[#008CFF] text-[16px] font-normal">
          {data.role}
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap gap-y-2 gap-x-4 text-[12px] text-gray-700 mt-3">
          {data.phone && (
            <p className="flex items-center gap-2">
              <MdPhone className="text-gray-500 shrink-0" />
              {data.phone}
            </p>
          )}
          {data.email && (
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500 shrink-0" />
              {data.email}
            </p>
          )}
          {data.github && (
            <p className="flex items-center gap-2">
              <FaGithub className="text-gray-500 shrink-0" />
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {data.github.replace("https://", "")}
              </a>
            </p>
          )}
          {data.location && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500 shrink-0" />
              {data.location}
            </p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Header;
