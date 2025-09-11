import { Course } from "../types";

export class CoursesRepository {
  private storage: Map<string, Course> = new Map();

  list(): Course[] {
    return Array.from(this.storage.values());
  }

  getById(id: string): Course | undefined {
    return this.storage.get(id);
  }

  create(course: Course): Course {
    if (this.storage.has(course.id)) {
      throw new Error("DUPLICATE_ID");
    }
    this.storage.set(course.id, course);
    return course;
  }

  replace(id: string, course: Course): Course {
    const existing = this.storage.get(id);
    const toSave: Course = {
      ...course,
      id,
      createdAt: existing?.createdAt ?? course.createdAt,
    };
    this.storage.set(id, toSave);
    return toSave;
  }

  update(id: string, partial: Partial<Course>): Course | undefined {
    const existing = this.storage.get(id);
    if (!existing) return undefined;
    const updated: Course = {
      ...existing,
      ...partial,
      id: existing.id,
      createdAt: existing.createdAt,
    };
    this.storage.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.storage.delete(id);
  }

  clear(): void {
    this.storage.clear();
  }
}

export const coursesRepository = new CoursesRepository();
