import { certifications } from "../lib/data";

const Certification = () => {
  return (
    <div className="md:mb-6">
      <h2 className="text-[16px] max-sm:font-bold text-[#384347] border-b-[1px] border-[#bdbdbd]">CERTIFICATION</h2>
      <div className="flex justify-between items-start flex-wrap">
        {certifications.map((cert) => (
          <div key={cert.id} className="mt-4 w-full max-w-[48%]">
            <h3 className="text-[14px] text-[#008CFF]">{cert.title}, {cert.organization}</h3>
            <p className="text-[12px] mt-2">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certification;
