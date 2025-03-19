import { Passion } from '../types/datatypes';
import { GiDiamondTrophy, GiMedal, GiAchievement } from "react-icons/gi";
import { FaAward, FaTrophy, FaMedal, FaHeart, FaLaptopCode, FaBookReader } from "react-icons/fa";

type IconType = "trophy" | "medal" | "award" | "achievement" | "cup" | "ribbon" | "heart" | "code" | "book";

const iconMap: { [key in IconType]: React.ReactNode } = {
  trophy: <GiDiamondTrophy className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  medal: <GiMedal className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  award: <FaAward className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  achievement: <GiAchievement className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  cup: <FaTrophy className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  ribbon: <FaMedal className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  heart: <FaHeart className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  code: <FaLaptopCode className="w-[20px] h-[20px] text-[#F5F5F5]" />,
  book: <FaBookReader className="w-[20px] h-[20px] text-[#F5F5F5]" />,
};

interface PassionsProps {
  data: Passion[];
}

export default function Passions({ data }: PassionsProps) {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <div className="space-y-4">
        {data.map((passion) => (
          <div key={passion.id} className="flex items-start gap-3 mb-4">
            <span className="text-lg text-white mt-[5px]">
              {passion.icon && iconMap[passion.icon as IconType] || <FaLaptopCode className="w-[20px] h-[20px] text-[#F5F5F5]" />}
            </span>
            <div>
              <h3 className="font-medium text-white">{passion.title}</h3>
              <p className="text-sm text-white">{passion.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 