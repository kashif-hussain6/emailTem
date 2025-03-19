"use client";

import { Project } from "../types/datatypes";

interface CoursesProps {
  data: Project[];
}

const Courses: React.FC<CoursesProps> = ({ data }) => {
  return (
    <div className="relative mt-6">
      <h3 className="text-[16px] border-b-[1px] border-white mb-2 pb-[5px]">
        COURSES
      </h3>
      <ul className="mt-4 text-[12px]">
        {data.map((course) => (
          <li key={course.id} className="mt-2">
            <span className="text-[14px] text-white">{course.title}</span>
            <p className="mt-2 text-white">{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
