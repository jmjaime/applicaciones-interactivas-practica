export type Course = {
  id: string;
  title: string;
  description?: string;
  level?: "beginner" | "intermediate" | "advanced";
  topicIds?: string[];
  instructorId?: string;
  createdAt: string;
  status?: "active" | "archived";
};

export type Instructor = {
  id: string;
  name: string;
};

export type Topic = {
  id: string;
  name: string;
};

export type Enrollment = {
  id: string;
  courseId: string;
  studentId: string;
  createdAt: string;
};
