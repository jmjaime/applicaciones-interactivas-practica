import { Course } from "../types";
import { coursesRepository } from "../repositories/courses.repository";

function generateIdFromTitle(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `course_${slug || "item"}`;
}

export const coursesService = {
  // All methods intentionally return stubs; students must implement.
  list(): Course[] {
    return [
      {
        id: "course_stub",
        title: "stub",
        createdAt: new Date().toISOString(),
      } as Course,
    ];
  },
  get(_id: string): Course | undefined {
    return undefined;
  },
  create(_input: Omit<Course, "id" | "createdAt">): Course {
    const id = generateIdFromTitle("stub");
    return { id, title: "stub", createdAt: new Date().toISOString() } as Course;
  },
  replace(id: string, _input: Omit<Course, "id" | "createdAt">): Course {
    return { id, title: "stub", createdAt: new Date().toISOString() } as Course;
  },
  update(
    _id: string,
    _partial: Partial<Omit<Course, "id" | "createdAt">>
  ): Course | undefined {
    return undefined;
  },
  delete(_id: string): boolean {
    return false;
  },
  clear() {
    coursesRepository.clear();
  },
};
