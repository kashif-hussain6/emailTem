import { Project } from '../types/datatypes';

interface ProjectsProps {
  data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
  if (!data || data.length === 0) return null;

  return (
    <div>
      <div className="space-y-4">
        {data.map((project) => (
          <div key={project.id} className="mb-4">
            <h3 className="font-medium text-white">{project.title}</h3>
            <p className="text-sm text-white">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 