import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true, length: 20 })
  studentId!: string;

  @Column({ type: "date" })
  enrollmentDate!: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  major?: string;

  @Column({ type: "int", default: 1 })
  year!: number;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
  gpa!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación Many-to-Many con Course
  @ManyToMany(() => Course, (course) => course.students, { cascade: true })
  @JoinTable({
    name: "student_courses",
    joinColumn: { name: "student_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "course_id", referencedColumnName: "id" },
  })
  courses!: Course[];

  // Métodos de negocio
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getCourseCount(): number {
    return this.courses ? this.courses.length : 0;
  }

  isEnrolledIn(courseCode: string): boolean {
    return this.courses
      ? this.courses.some((course) => course.code === courseCode)
      : false;
  }

  getAcademicLevel(): string {
    switch (this.year) {
      case 1:
        return "Freshman";
      case 2:
        return "Sophomore";
      case 3:
        return "Junior";
      case 4:
        return "Senior";
      default:
        return "Graduate";
    }
  }

  getGpaCategory(): string {
    if (this.gpa >= 3.5) return "Honors";
    if (this.gpa >= 3.0) return "Good Standing";
    if (this.gpa >= 2.0) return "Satisfactory";
    return "Probation";
  }

  hasGoodStanding(): boolean {
    return this.gpa >= 2.0;
  }

  getYearsEnrolled(): number {
    const today = new Date();
    const enrollmentDate = new Date(this.enrollmentDate);
    return today.getFullYear() - enrollmentDate.getFullYear();
  }
}
