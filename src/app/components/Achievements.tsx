"use client";

import { GiDiamondTrophy, GiMedal, GiAchievement } from "react-icons/gi";
import { FaAward, FaTrophy, FaMedal } from "react-icons/fa";
import { Achievement } from '../types/datatypes';

type IconType = "trophy" | "medal" | "award" | "achievement" | "cup" | "ribbon";

const iconMap: { [key in IconType]: React.ReactNode } = {
  trophy: <GiDiamondTrophy className="mr-4 w-[20px] h-[20px] md:text-[#F5F5F5]" />,
  medal: <GiMedal className="mr-4 w-[20px] h-[20px] md:text-[#F5F5F5]" />,
  award: <FaAward className="mr-4 w-[20px] h-[20px] md:text-[#F5F5F5]" />,
  achievement: <GiAchievement className="mr-2 w-[20px] h-[20px] md:text-[#F5F5F5]" />,
  cup: <FaTrophy className="mr-4 w-[20px] h-[20px] md:text-[#F5F5F5]" />,
  ribbon: <FaMedal className="mr-4 w-[20px] h-[20px] md:text-[#F5F5F5]" />,
};

interface AchievementsProps {
  data: Achievement[];
}

export default function Achievements({ data }: AchievementsProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-4 text-white">
      {data.map((achievement) => (
        <div key={achievement.id} className="flex text-white items-start gap-3">
          <span className="text-lg text-white mt-[5px]">
            {iconMap[achievement.icon as IconType] || <GiDiamondTrophy className="mr-2 w-[30px] h-[30px] text-[#F5F5F5]" />}
          </span>
          <div>
            <h4 className="font-medium text-white">{achievement.title}</h4>
            <p className="text-white text-sm mt-1">{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
