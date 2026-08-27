import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Student } from "./Student";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ unique: true, length: 10 })
  code!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "int" })
  credits!: number;

  @Column({ type: "varchar", length: 100 })
  department!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  instructor?: string;

  @Column({ type: "int", default: 30 })
  maxCapacity!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  fee?: number;

  @Column({ type: "text", default: "fall" })
  semester!: "fall" | "spring" | "summer" | "winter";

  @Column({ type: "int" })
  year!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  location?: string;

  @Column({ type: "json", nullable: true })
  schedule?: {
    days: string[];
    startTime: string;
    endTime: string;
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación Many-to-Many con Student
  @ManyToMany(() => Student, (student) => student.courses)
  students!: Student[];

  // Métodos de negocio
  getFullCode(): string {
    return `${this.department}-${this.code}`;
  }

  getEnrollmentCount(): number {
    return this.students ? this.students.length : 0;
  }

  hasAvailableSpots(): boolean {
    return this.getEnrollmentCount() < this.maxCapacity;
  }

  getAvailableSpots(): number {
    return Math.max(0, this.maxCapacity - this.getEnrollmentCount());
  }

  isStudentEnrolled(studentId: string): boolean {
    return this.students
      ? this.students.some((student) => student.studentId === studentId)
      : false;
  }

  getEnrollmentPercentage(): number {
    return (this.getEnrollmentCount() / this.maxCapacity) * 100;
  }

  isFull(): boolean {
    return this.getEnrollmentCount() >= this.maxCapacity;
  }

  getCreditLevel(): string {
    if (this.credits >= 4) return "High";
    if (this.credits >= 3) return "Medium";
    return "Low";
  }

  getFormattedFee(): string {
    return this.fee ? `$${this.fee.toFixed(2)}` : "Free";
  }

  getSemesterDisplay(): string {
    return `${this.semester.charAt(0).toUpperCase() + this.semester.slice(1)} ${
      this.year
    }`;
  }

  getScheduleDisplay(): string {
    if (!this.schedule) return "TBD";
    return `${this.schedule.days.join(", ")} ${this.schedule.startTime}-${
      this.schedule.endTime
    }`;
  }
}
