"use client";

interface SummaryProps {
  title: string;
  description: string;
}

const Summary: React.FC<SummaryProps> = ({ title, description }) => {
  return (
    <div className="relative mb-6">
      <h2 className="text-[16px] font-normal max-sm:font-bold text-[#2c2a2a]  ">
        {title}
      </h2>
      <div className="mt-2 text-[14px] text-[#2c2a2a]">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Summary;
