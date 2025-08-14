import Database from "better-sqlite3";

// Ejercicio: Many-to-Many (N:M)
// Objetivo: 'student' ↔ 'course' con tabla intermedia 'enrollment'
// Instrucciones: completar los TODO con SQL para crear tablas e insertar datos.

export type Student = {
  id?: number;
  studentId: string;
  firstName: string;
  lastName: string;
  program: string;
};

export type Course = {
  id?: number;
  courseCode: string;
  courseName: string;
  credits: number;
};

export type Enrollment = {
  id?: number;
  studentId: number; // FK a student.id
  courseId: number; // FK a course.id
  letterGrade?:
    | "A+"
    | "A"
    | "A-"
    | "B+"
    | "B"
    | "B-"
    | "C+"
    | "C"
    | "C-"
    | "D+"
    | "D"
    | "F";
};

// Instancias para persistir
export const students: Student[] = [
  {
    id: 1,
    studentId: "STU001",
    firstName: "Ana",
    lastName: "García",
    program: "CS",
  },
  {
    id: 2,
    studentId: "STU002",
    firstName: "Carlos",
    lastName: "Ruiz",
    program: "CS",
  },
];

export const courses: Course[] = [
  { id: 1, courseCode: "CS101", courseName: "Intro Programming", credits: 3 },
  { id: 2, courseCode: "CS201", courseName: "Data Structures", credits: 4 },
];

export const enrollments: Enrollment[] = [
  { id: 1, studentId: 1, courseId: 1, letterGrade: "A-" },
  { id: 2, studentId: 1, courseId: 2, letterGrade: "B+" },
  { id: 3, studentId: 2, courseId: 1, letterGrade: "A" },
];

export class ManyToManyExercise {
  private db: Database.Database;

  constructor() {
    this.db = new Database("ejercicio-many-to-many.sqlite");
  }

  async run(): Promise<void> {
    try {
      await this.createSchema();
      await this.insertData();
      console.log("✅ N:M: datos listos. Agregá consultas si querés.");
    } finally {
      this.db.close();
    }
  }

  async createSchema(): Promise<void> {
    console.log(
      "🔧 TODO: Crear 'student', 'course' y 'enrollment' (junction con UNIQUE)"
    );
    // TODO: Crear tablas y constraint UNIQUE(student_id, course_id) en enrollment
  }

  async insertData(): Promise<void> {
    console.log("📝 TODO: Insertar 'students', 'courses' y 'enrollments'");
    // TODO: Insertar primero entities, luego enrollment
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAllEnrollments(): Promise<
    Array<Enrollment>
  > {
    // TODO: SELECT JOIN student/enrollment/course devolviendo campos mapeados
    return [];
  }

  async getEnrollmentsByCourse(
    courseCode: string
  ): Promise<
    Array<{ firstName: string; lastName: string; letterGrade?: string }>
  > {
    // TODO: SELECT JOIN filtrando por course_code
    return [];
  }

  async filterStudentsByProgram(
    program: string
  ): Promise<Array<Student>> {
    // TODO: SELECT filtrando por program
    return [];
  }
}

if (require.main === module) {
  new ManyToManyExercise().run().catch(console.error);
}
