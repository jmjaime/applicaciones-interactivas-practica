import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";

export enum DepartmentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  RESTRUCTURING = "restructuring",
  MERGING = "merging",
  DISSOLVED = "dissolved",
}

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, unique: true })
  name: string;

  @Column({ length: 10, nullable: false, unique: true })
  code: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: DepartmentStatus.ACTIVE,
  })
  status: DepartmentStatus;

  @Column({ type: "decimal", precision: 15, scale: 2, default: 0.0 })
  budget: number;

  @Column({ type: "decimal", precision: 15, scale: 2, default: 0.0 })
  spentBudget: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  maxEmployees: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  currentEmployees: number;

  @Column({ length: 100, nullable: true })
  manager?: string;

  @Column({ length: 100, nullable: true })
  location?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  performanceRating: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalProjects: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  completedProjects: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "date", nullable: true })
  establishedDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  constructor(name?: string, code?: string) {
    this.name = name || "";
    this.code = code || "";
  }

  // ===== MÉTODOS UTILITARIOS =====

  getStatusDisplayName(): string {
    const statusNames: Record<DepartmentStatus, string> = {
      [DepartmentStatus.ACTIVE]: "Activo",
      [DepartmentStatus.INACTIVE]: "Inactivo",
      [DepartmentStatus.RESTRUCTURING]: "Reestructurando",
      [DepartmentStatus.MERGING]: "Fusionando",
      [DepartmentStatus.DISSOLVED]: "Disuelto",
    };
    return statusNames[this.status];
  }

  getBudgetUtilization(): number {
    if (this.budget === 0) return 0;
    return Math.round((this.spentBudget / this.budget) * 100);
  }

  getRemainingBudget(): number {
    return this.budget - this.spentBudget;
  }

  getEmployeeUtilization(): number {
    if (this.maxEmployees === 0) return 0;
    return Math.round((this.currentEmployees / this.maxEmployees) * 100);
  }

  getRemainingPositions(): number {
    return this.maxEmployees - this.currentEmployees;
  }

  getProjectCompletionRate(): number {
    if (this.totalProjects === 0) return 0;
    return Math.round((this.completedProjects / this.totalProjects) * 100);
  }

  isOverBudget(): boolean {
    return this.spentBudget > this.budget;
  }

  isAtCapacity(): boolean {
    return this.currentEmployees >= this.maxEmployees;
  }

  canHireMore(): boolean {
    return (
      this.isActive &&
      !this.isAtCapacity() &&
      this.status === DepartmentStatus.ACTIVE
    );
  }

  getBudgetStatus(): string {
    const utilization = this.getBudgetUtilization();
    if (utilization > 100) return "Sobre presupuesto";
    if (utilization > 90) return "Crítico";
    if (utilization > 75) return "Alto";
    if (utilization > 50) return "Moderado";
    return "Bajo";
  }

  getPerformanceLevel(): string {
    if (this.performanceRating >= 4.5) return "Excelente";
    if (this.performanceRating >= 4.0) return "Muy bueno";
    if (this.performanceRating >= 3.5) return "Bueno";
    if (this.performanceRating >= 3.0) return "Regular";
    if (this.performanceRating >= 2.0) return "Deficiente";
    return "Crítico";
  }

  getDepartmentAge(): number {
    if (!this.establishedDate) return 0;
    const now = new Date();
    const diffTime = now.getTime() - this.establishedDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  getDepartmentSummary(): string {
    const parts = [
      `${this.code}: ${this.name}`,
      this.getStatusDisplayName(),
      `${this.currentEmployees}/${this.maxEmployees} empleados`,
      `Presupuesto: ${this.getBudgetUtilization()}%`,
      `Rating: ${this.performanceRating.toFixed(1)}`,
    ];

    if (this.location) parts.push(this.location);

    return parts.join(" | ");
  }

  getContactInfo(): string {
    const contacts = [];
    if (this.phone) contacts.push(`📞 ${this.phone}`);
    if (this.email) contacts.push(`📧 ${this.email}`);
    if (this.location) contacts.push(`📍 ${this.location}`);
    return contacts.join(" | ");
  }

  getFinancialSummary(): string {
    return (
      `Presupuesto: $${this.budget.toLocaleString()} | ` +
      `Gastado: $${this.spentBudget.toLocaleString()} (${this.getBudgetUtilization()}%) | ` +
      `Restante: $${this.getRemainingBudget().toLocaleString()}`
    );
  }

  getProjectSummary(): string {
    return `Proyectos: ${this.completedProjects}/${
      this.totalProjects
    } completados (${this.getProjectCompletionRate()}%)`;
  }

  incrementEmployeeCount(): void {
    this.currentEmployees++;
  }

  decrementEmployeeCount(): void {
    if (this.currentEmployees > 0) {
      this.currentEmployees--;
    }
  }

  addBudgetSpent(amount: number): void {
    this.spentBudget += amount;
  }

  increaseBudget(amount: number): void {
    this.budget += amount;
  }

  addProject(): void {
    this.totalProjects++;
  }

  completeProject(): void {
    this.completedProjects++;
  }

  updatePerformanceRating(rating: number): void {
    this.performanceRating = Math.max(0, Math.min(5, rating));
  }

  activate(): void {
    this.status = DepartmentStatus.ACTIVE;
    this.isActive = true;
  }

  deactivate(): void {
    this.status = DepartmentStatus.INACTIVE;
    this.isActive = false;
  }

  startRestructuring(): void {
    this.status = DepartmentStatus.RESTRUCTURING;
  }

  startMerging(): void {
    this.status = DepartmentStatus.MERGING;
  }

  dissolve(): void {
    this.status = DepartmentStatus.DISSOLVED;
    this.isActive = false;
  }

  validateDepartment(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.name || this.name.trim() === "") {
      errors.push("El nombre del departamento es obligatorio");
    }

    if (!this.code || this.code.trim() === "") {
      errors.push("El código del departamento es obligatorio");
    }

    if (this.budget < 0) {
      errors.push("El presupuesto no puede ser negativo");
    }

    if (this.spentBudget < 0) {
      errors.push("El presupuesto gastado no puede ser negativo");
    }

    if (this.maxEmployees < 0) {
      errors.push("El máximo de empleados no puede ser negativo");
    }

    if (this.currentEmployees < 0) {
      errors.push("El número actual de empleados no puede ser negativo");
    }

    if (this.currentEmployees > this.maxEmployees) {
      errors.push("El número actual de empleados no puede superar el máximo");
    }

    if (this.performanceRating < 0 || this.performanceRating > 5) {
      errors.push("La calificación de rendimiento debe estar entre 0 y 5");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getHealthScore(): number {
    let score = 0;

    // Puntos por estado
    if (this.status === DepartmentStatus.ACTIVE) score += 25;
    else if (this.status === DepartmentStatus.INACTIVE) score += 10;

    // Puntos por utilización de empleados (óptimo 80-95%)
    const empUtil = this.getEmployeeUtilization();
    if (empUtil >= 80 && empUtil <= 95) score += 25;
    else if (empUtil >= 60) score += 15;
    else if (empUtil >= 40) score += 10;

    // Puntos por presupuesto (óptimo 70-95%)
    const budgetUtil = this.getBudgetUtilization();
    if (budgetUtil >= 70 && budgetUtil <= 95) score += 25;
    else if (budgetUtil >= 50) score += 15;
    else if (budgetUtil < 100) score += 10;

    // Puntos por performance
    if (this.performanceRating >= 4.0) score += 25;
    else if (this.performanceRating >= 3.5) score += 20;
    else if (this.performanceRating >= 3.0) score += 15;
    else if (this.performanceRating >= 2.5) score += 10;

    return Math.min(100, score);
  }

  getHealthCategory(): string {
    const score = this.getHealthScore();
    if (score >= 90) return "Excelente";
    if (score >= 75) return "Muy bueno";
    if (score >= 60) return "Bueno";
    if (score >= 40) return "Regular";
    if (score >= 25) return "Deficiente";
    return "Crítico";
  }

  getDepartmentProfile(): string {
    const sections = [
      `🏢 ${this.getDepartmentSummary()}`,
      `💰 ${this.getFinancialSummary()}`,
      `📊 ${this.getProjectSummary()}`,
      `📞 ${this.getContactInfo()}`,
      `🏥 Salud: ${this.getHealthCategory()} (${this.getHealthScore()}/100)`,
    ];

    if (this.manager) sections.push(`👨‍💼 Manager: ${this.manager}`);
    if (this.description) sections.push(`📝 ${this.description}`);

    return sections.join("\n");
  }

  toString(): string {
    return `Department(${this.code}: ${
      this.name
    }, ${this.getStatusDisplayName()})`;
  }
}
