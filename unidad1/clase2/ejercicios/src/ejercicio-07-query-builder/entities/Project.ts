import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { Task } from "./Task";

export enum ProjectStatus {
  PLANNING = "planning",
  ACTIVE = "active",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  ARCHIVED = "archived",
}

export enum ProjectPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  URGENT = "urgent",
}

export enum ProjectCategory {
  SOFTWARE_DEVELOPMENT = "software_development",
  INFRASTRUCTURE = "infrastructure",
  RESEARCH = "research",
  MARKETING = "marketing",
  SALES = "sales",
  OPERATIONS = "operations",
  TRAINING = "training",
  COMPLIANCE = "compliance",
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true, nullable: false })
  projectCode: string;

  @Column({ length: 200, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: ProjectStatus.PLANNING,
  })
  status: ProjectStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: ProjectPriority.MEDIUM,
  })
  priority: ProjectPriority;

  @Column({
    type: "varchar",
    length: 20,
    default: ProjectCategory.SOFTWARE_DEVELOPMENT,
  })
  category: ProjectCategory;

  @Column({ type: "decimal", precision: 15, scale: 2, nullable: false })
  budget: number;

  @Column({ type: "decimal", precision: 15, scale: 2, default: 0.0 })
  spentBudget: number;

  @Column({ type: "date", nullable: false })
  startDate: Date;

  @Column({ type: "date", nullable: false })
  endDate: Date;

  @Column({ type: "date", nullable: true })
  actualEndDate?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  progressPercentage: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  qualityScore: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalTasks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  completedTasks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  overdueTasks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  hoursEstimated: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  hoursActual: number;

  @Column({ length: 100, nullable: true })
  client?: string;

  @Column({ length: 100, nullable: true })
  projectManager?: string;

  @Column({ length: 100, nullable: true })
  technicalLead?: string;

  @Column({ type: "text", nullable: true })
  requirements?: string;

  @Column({ type: "text", nullable: true })
  deliverables?: string;

  @Column({ type: "text", nullable: true })
  risks?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isBillable: boolean;

  @Column({ type: "boolean", default: false })
  isInternal: boolean;

  @Column({ type: "datetime", nullable: true })
  lastUpdated?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @ManyToMany(() => Employee, (employee) => employee.projects)
  employees: Employee[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  constructor(projectCode?: string, name?: string) {
    this.projectCode = projectCode || this.generateProjectCode();
    this.name = name || "";
    this.startDate = new Date();
    this.endDate = new Date();
    this.budget = 0;
  }

  private generateProjectCode(): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `PRJ${year}${random}`;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getStatusDisplayName(): string {
    const statusNames: Record<ProjectStatus, string> = {
      [ProjectStatus.PLANNING]: "Planificación",
      [ProjectStatus.ACTIVE]: "Activo",
      [ProjectStatus.ON_HOLD]: "En pausa",
      [ProjectStatus.COMPLETED]: "Completado",
      [ProjectStatus.CANCELLED]: "Cancelado",
      [ProjectStatus.ARCHIVED]: "Archivado",
    };
    return statusNames[this.status];
  }

  getPriorityDisplayName(): string {
    const priorityNames: Record<ProjectPriority, string> = {
      [ProjectPriority.LOW]: "Baja",
      [ProjectPriority.MEDIUM]: "Media",
      [ProjectPriority.HIGH]: "Alta",
      [ProjectPriority.CRITICAL]: "Crítica",
      [ProjectPriority.URGENT]: "Urgente",
    };
    return priorityNames[this.priority];
  }

  getCategoryDisplayName(): string {
    const categoryNames: Record<ProjectCategory, string> = {
      [ProjectCategory.SOFTWARE_DEVELOPMENT]: "Desarrollo de Software",
      [ProjectCategory.INFRASTRUCTURE]: "Infraestructura",
      [ProjectCategory.RESEARCH]: "Investigación",
      [ProjectCategory.MARKETING]: "Marketing",
      [ProjectCategory.SALES]: "Ventas",
      [ProjectCategory.OPERATIONS]: "Operaciones",
      [ProjectCategory.TRAINING]: "Capacitación",
      [ProjectCategory.COMPLIANCE]: "Cumplimiento",
    };
    return categoryNames[this.category];
  }

  getDurationInDays(): number {
    const startTime = this.startDate.getTime();
    const endTime = this.endDate.getTime();
    return Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
  }

  getDaysElapsed(): number {
    const now = new Date();
    const startTime = this.startDate.getTime();
    const currentTime = Math.min(now.getTime(), this.endDate.getTime());
    return Math.ceil((currentTime - startTime) / (1000 * 60 * 60 * 24));
  }

  getDaysRemaining(): number {
    const now = new Date();
    const endTime = this.endDate.getTime();
    const currentTime = now.getTime();

    if (currentTime >= endTime) return 0;
    return Math.ceil((endTime - currentTime) / (1000 * 60 * 60 * 24));
  }

  getBudgetUtilization(): number {
    if (this.budget === 0) return 0;
    return Math.round((this.spentBudget / this.budget) * 100);
  }

  getRemainingBudget(): number {
    return this.budget - this.spentBudget;
  }

  getTaskCompletionRate(): number {
    if (this.totalTasks === 0) return 0;
    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  getHoursVariance(): number {
    return this.hoursActual - this.hoursEstimated;
  }

  getHoursVariancePercentage(): number {
    if (this.hoursEstimated === 0) return 0;
    return Math.round((this.getHoursVariance() / this.hoursEstimated) * 100);
  }

  isOverBudget(): boolean {
    return this.spentBudget > this.budget;
  }

  isBehindSchedule(): boolean {
    const expectedProgress =
      (this.getDaysElapsed() / this.getDurationInDays()) * 100;
    return this.progressPercentage < expectedProgress - 10; // 10% tolerance
  }

  isOverdue(): boolean {
    return new Date() > this.endDate && this.status !== ProjectStatus.COMPLETED;
  }

  isCompleted(): boolean {
    return this.status === ProjectStatus.COMPLETED;
  }

  isInProgress(): boolean {
    return this.status === ProjectStatus.ACTIVE;
  }

  getProjectHealth(): string {
    let score = 0;

    // Budget health (25 points)
    const budgetUtil = this.getBudgetUtilization();
    if (budgetUtil <= 90) score += 25;
    else if (budgetUtil <= 100) score += 15;
    else if (budgetUtil <= 110) score += 5;

    // Schedule health (25 points)
    if (!this.isBehindSchedule() && !this.isOverdue()) score += 25;
    else if (!this.isOverdue()) score += 15;
    else score += 5;

    // Quality health (25 points)
    if (this.qualityScore >= 4.5) score += 25;
    else if (this.qualityScore >= 4.0) score += 20;
    else if (this.qualityScore >= 3.5) score += 15;
    else if (this.qualityScore >= 3.0) score += 10;
    else if (this.qualityScore >= 2.5) score += 5;

    // Task completion health (25 points)
    const taskCompletion = this.getTaskCompletionRate();
    if (taskCompletion >= 90) score += 25;
    else if (taskCompletion >= 75) score += 20;
    else if (taskCompletion >= 60) score += 15;
    else if (taskCompletion >= 40) score += 10;
    else if (taskCompletion >= 25) score += 5;

    if (score >= 85) return "Excelente";
    if (score >= 70) return "Bueno";
    if (score >= 55) return "Regular";
    if (score >= 40) return "En riesgo";
    return "Crítico";
  }

  getProjectPhase(): string {
    if (this.progressPercentage === 0) return "Iniciando";
    if (this.progressPercentage <= 25) return "Inicio";
    if (this.progressPercentage <= 50) return "Desarrollo";
    if (this.progressPercentage <= 75) return "Implementación";
    if (this.progressPercentage < 100) return "Finalización";
    return "Completado";
  }

  getProjectSummary(): string {
    const parts = [
      `${this.projectCode}: ${this.name}`,
      this.getStatusDisplayName(),
      this.getPriorityDisplayName(),
      `${this.progressPercentage}%`,
      `$${this.budget.toLocaleString()}`,
    ];

    if (this.client) parts.push(this.client);
    if (this.qualityScore > 0) parts.push(`★${this.qualityScore.toFixed(1)}`);

    return parts.join(" | ");
  }

  getBudgetSummary(): string {
    return (
      `Presupuesto: $${this.budget.toLocaleString()} | ` +
      `Gastado: $${this.spentBudget.toLocaleString()} (${this.getBudgetUtilization()}%) | ` +
      `Restante: $${this.getRemainingBudget().toLocaleString()}`
    );
  }

  getScheduleSummary(): string {
    return (
      `Duración: ${this.getDurationInDays()} días | ` +
      `Transcurridos: ${this.getDaysElapsed()} días | ` +
      `Restantes: ${this.getDaysRemaining()} días`
    );
  }

  getTaskSummary(): string {
    return (
      `Tareas: ${this.completedTasks}/${
        this.totalTasks
      } (${this.getTaskCompletionRate()}%) | ` +
      `Atrasadas: ${this.overdueTasks}`
    );
  }

  getHoursSummary(): string {
    const variance = this.getHoursVariance();
    const varianceText = variance > 0 ? `+${variance}` : variance.toString();
    return `Horas: ${this.hoursActual}/${this.hoursEstimated} (${varianceText})`;
  }

  addBudgetSpent(amount: number): void {
    this.spentBudget += amount;
  }

  increaseBudget(amount: number): void {
    this.budget += amount;
  }

  updateProgress(percentage: number): void {
    this.progressPercentage = Math.max(0, Math.min(100, percentage));
    if (
      this.progressPercentage === 100 &&
      this.status === ProjectStatus.ACTIVE
    ) {
      this.complete();
    }
  }

  addTask(): void {
    this.totalTasks++;
  }

  completeTask(): void {
    this.completedTasks++;
    if (this.completedTasks === this.totalTasks && this.totalTasks > 0) {
      this.updateProgress(100);
    }
  }

  addOverdueTask(): void {
    this.overdueTasks++;
  }

  updateQualityScore(score: number): void {
    this.qualityScore = Math.max(0, Math.min(5, score));
  }

  addHours(estimated: number, actual: number): void {
    this.hoursEstimated += estimated;
    this.hoursActual += actual;
  }

  start(): void {
    this.status = ProjectStatus.ACTIVE;
    this.isActive = true;
  }

  pause(): void {
    this.status = ProjectStatus.ON_HOLD;
  }

  resume(): void {
    this.status = ProjectStatus.ACTIVE;
  }

  complete(): void {
    this.status = ProjectStatus.COMPLETED;
    this.actualEndDate = new Date();
    this.progressPercentage = 100;
  }

  cancel(reason?: string): void {
    this.status = ProjectStatus.CANCELLED;
    this.isActive = false;
    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nCancelado: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  archive(): void {
    this.status = ProjectStatus.ARCHIVED;
    this.isActive = false;
  }

  updateLastActivity(): void {
    this.lastUpdated = new Date();
  }

  validateProject(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.projectCode || this.projectCode.trim() === "") {
      errors.push("Código de proyecto es obligatorio");
    }

    if (!this.name || this.name.trim() === "") {
      errors.push("Nombre del proyecto es obligatorio");
    }

    if (this.budget < 0) {
      errors.push("Presupuesto no puede ser negativo");
    }

    if (this.spentBudget < 0) {
      errors.push("Presupuesto gastado no puede ser negativo");
    }

    if (this.progressPercentage < 0 || this.progressPercentage > 100) {
      errors.push("Progreso debe estar entre 0 y 100");
    }

    if (this.qualityScore < 0 || this.qualityScore > 5) {
      errors.push("Puntuación de calidad debe estar entre 0 y 5");
    }

    if (this.startDate >= this.endDate) {
      errors.push("Fecha de inicio debe ser anterior a fecha de fin");
    }

    if (this.completedTasks > this.totalTasks) {
      errors.push("Tareas completadas no pueden superar el total");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getProjectProfile(): string {
    const sections = [
      `📋 ${this.getProjectSummary()}`,
      `💰 ${this.getBudgetSummary()}`,
      `📅 ${this.getScheduleSummary()}`,
      `✅ ${this.getTaskSummary()}`,
      `⏱️ ${this.getHoursSummary()}`,
      `🏥 Salud: ${this.getProjectHealth()}`,
      `🔄 Fase: ${this.getProjectPhase()}`,
    ];

    if (this.projectManager) sections.push(`👨‍💼 PM: ${this.projectManager}`);
    if (this.technicalLead) sections.push(`👨‍💻 TL: ${this.technicalLead}`);
    if (this.client) sections.push(`🏢 Cliente: ${this.client}`);

    return sections.join("\n");
  }

  toString(): string {
    return `Project(${this.projectCode}: ${
      this.name
    }, ${this.getStatusDisplayName()})`;
  }
}
