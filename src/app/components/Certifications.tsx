import { Certification } from '../types/datatypes';

interface CertificationsProps {
  data: Certification[];
}

export default function Certifications({ data }: CertificationsProps) {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <div className="space-y-4">
        {data.map((cert) => (
          <div key={cert.id} className="mb-4">
            <h3 className="font-medium text-white">{cert.title}</h3>
            <p className="text-sm text-white mb-1">{cert.organization}</p>
            <p className="text-sm text-white">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 