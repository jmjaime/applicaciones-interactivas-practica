import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./Address";

// Objeto embebido para contacto
export class ContactInfo {
  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  emergencyContact?: string;

  @Column({ nullable: true })
  emergencyPhone?: string;

  // Método para verificar si tiene contacto de emergencia
  hasEmergencyContact(): boolean {
    return !!(this.emergencyContact && this.emergencyPhone);
  }

  // Método para obtener información de contacto principal
  getPrimaryContact(): string {
    return `${this.email} | ${this.phone}`;
  }
}

// Objeto embebido para información laboral
export class WorkInfo {
  @Column()
  department!: string;

  @Column()
  position!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  salary!: number;

  @Column({ type: "date" })
  hireDate!: Date;

  @Column({ nullable: true })
  manager?: string;

  // Método para calcular años de servicio
  getYearsOfService(): number {
    const today = new Date();
    const hire = new Date(this.hireDate);
    return today.getFullYear() - hire.getFullYear();
  }

  // Método para obtener información laboral
  getWorkSummary(): string {
    return `${this.position} en ${this.department}`;
  }

  // Método para verificar si es senior
  isSenior(): boolean {
    return this.getYearsOfService() >= 5;
  }
}

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  documentNumber!: string;

  // Dirección residencial embebida
  @Column(() => Address, { prefix: "home_address_" })
  homeAddress!: Address;

  // Información de contacto embebida
  @Column(() => ContactInfo, { prefix: "contact_info_" })
  contactInfo!: ContactInfo;

  // Información laboral embebida
  @Column(() => WorkInfo, { prefix: "work_info_" })
  workInfo!: WorkInfo;

  // Skills como array JSON
  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => JSON.stringify(value || []),
      from: (value: string) => JSON.parse(value || "[]"),
    },
  })
  skills!: string[];

  // Evaluaciones como JSON complejo
  @Column({
    type: "text",
    transformer: {
      to: (value: any) => JSON.stringify(value || {}),
      from: (value: string) => JSON.parse(value || "{}"),
    },
  })
  performance!: {
    lastReview?: Date;
    rating?: number;
    goals?: string[];
    feedback?: string;
  };

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Métodos de negocio
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getDisplayInfo(): string {
    return `${this.getFullName()} - ${this.workInfo.getWorkSummary()}`;
  }

  getLocation(): string {
    return this.homeAddress.getShortAddress();
  }

  hasCompleteContactInfo(): boolean {
    return this.contactInfo.hasEmergencyContact();
  }

  addSkill(skill: string): void {
    if (!this.skills.includes(skill)) {
      this.skills.push(skill);
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter((s) => s !== skill);
  }

  hasSkill(skill: string): boolean {
    return this.skills.includes(skill);
  }

  getSkillsDisplay(): string {
    return this.skills.join(", ");
  }

  updatePerformance(rating: number, feedback: string, goals: string[]): void {
    this.performance = {
      ...this.performance,
      lastReview: new Date(),
      rating,
      feedback,
      goals,
    };
  }

  getPerformanceRating(): number | null {
    return this.performance.rating || null;
  }

  isSeniorEmployee(): boolean {
    return this.workInfo.isSenior();
  }
}
