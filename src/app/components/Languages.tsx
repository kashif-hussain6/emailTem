"use client";

import { Language } from '../types/datatypes';

interface LanguagesProps {
  data: Language[];
}

export default function Languages({ data }: LanguagesProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-[16px] font-normal max-sm:font-bold text-[#2c2a2a] border-b-[1px] border-[#bdbdbd] pb-[5px]">
        LANGUAGES
      </h2>

      {data.map((language, index) => (
        <div key={index} className="flex items-center justify-between w-full">
          <span className="text-[14px] font-normal text-black w-1/3">
            {language.name}
          </span>
          <span className="text-[12px] text-gray-600 w-1/3">
            {language.level}
          </span>
          <div className="flex justify-end w-1/3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`dot-${index}-${i}`}
                  className={`w-2 h-2 mx-[2px] rounded-full ${
                    i < language.proficiency ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
