import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { Project } from "./Project";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  TESTING = "testing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  BLOCKED = "blocked",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  URGENT = "urgent",
}

export enum TaskType {
  FEATURE = "feature",
  BUG = "bug",
  IMPROVEMENT = "improvement",
  REFACTOR = "refactor",
  DOCUMENTATION = "documentation",
  TESTING = "testing",
  RESEARCH = "research",
  MAINTENANCE = "maintenance",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true, nullable: false })
  taskId: string;

  @Column({ length: 200, nullable: false })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;

  @Column({
    type: "varchar",
    length: 20,
    default: TaskType.FEATURE,
  })
  type: TaskType;

  @Column({ type: "int", unsigned: true, default: 0 })
  estimatedHours: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  actualHours: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  progressPercentage: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  qualityScore: number;

  @Column({ type: "date", nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  dueDate?: Date;

  @Column({ type: "date", nullable: true })
  completedDate?: Date;

  @Column({ type: "text", nullable: true })
  acceptanceCriteria?: string;

  @Column({ type: "text", nullable: true })
  testCases?: string;

  @Column({ type: "text", nullable: true })
  blockers?: string;

  @Column({ type: "text", nullable: true })
  comments?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isBillable: boolean;

  @Column({ type: "boolean", default: false })
  isRecurring: boolean;

  @Column({ type: "int", unsigned: true, default: 0 })
  storyPoints: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  complexity: number;

  @Column({ type: "datetime", nullable: true })
  lastUpdated?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Employee, (employee) => employee.tasks)
  assignedTo: Employee;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  constructor(taskId?: string, title?: string) {
    this.taskId = taskId || this.generateTaskId();
    this.title = title || "";
  }

  private generateTaskId(): string {
    const prefix = "TSK";
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `${prefix}-${random}`;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getStatusDisplayName(): string {
    const statusNames: Record<TaskStatus, string> = {
      [TaskStatus.PENDING]: "Pendiente",
      [TaskStatus.IN_PROGRESS]: "En Progreso",
      [TaskStatus.REVIEW]: "En Revisión",
      [TaskStatus.TESTING]: "En Pruebas",
      [TaskStatus.COMPLETED]: "Completada",
      [TaskStatus.CANCELLED]: "Cancelada",
      [TaskStatus.BLOCKED]: "Bloqueada",
    };
    return statusNames[this.status];
  }

  getPriorityDisplayName(): string {
    const priorityNames: Record<TaskPriority, string> = {
      [TaskPriority.LOW]: "Baja",
      [TaskPriority.MEDIUM]: "Media",
      [TaskPriority.HIGH]: "Alta",
      [TaskPriority.CRITICAL]: "Crítica",
      [TaskPriority.URGENT]: "Urgente",
    };
    return priorityNames[this.priority];
  }

  getTypeDisplayName(): string {
    const typeNames: Record<TaskType, string> = {
      [TaskType.FEATURE]: "Funcionalidad",
      [TaskType.BUG]: "Error",
      [TaskType.IMPROVEMENT]: "Mejora",
      [TaskType.REFACTOR]: "Refactorización",
      [TaskType.DOCUMENTATION]: "Documentación",
      [TaskType.TESTING]: "Pruebas",
      [TaskType.RESEARCH]: "Investigación",
      [TaskType.MAINTENANCE]: "Mantenimiento",
    };
    return typeNames[this.type];
  }

  getDaysElapsed(): number {
    if (!this.startDate) return 0;

    const now = new Date();
    const startTime = this.startDate.getTime();
    const endTime = this.completedDate
      ? this.completedDate.getTime()
      : now.getTime();

    return Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
  }

  getDaysRemaining(): number {
    if (!this.dueDate || this.status === TaskStatus.COMPLETED) return 0;

    const now = new Date();
    const dueTime = this.dueDate.getTime();
    const currentTime = now.getTime();

    if (currentTime >= dueTime) return 0;
    return Math.ceil((dueTime - currentTime) / (1000 * 60 * 60 * 24));
  }

  getHoursVariance(): number {
    return this.actualHours - this.estimatedHours;
  }

  getHoursVariancePercentage(): number {
    if (this.estimatedHours === 0) return 0;
    return Math.round((this.getHoursVariance() / this.estimatedHours) * 100);
  }

  isOverdue(): boolean {
    return !!(
      this.dueDate &&
      new Date() > this.dueDate &&
      this.status !== TaskStatus.COMPLETED
    );
  }

  isCompleted(): boolean {
    return this.status === TaskStatus.COMPLETED;
  }

  isInProgress(): boolean {
    return this.status === TaskStatus.IN_PROGRESS;
  }

  isBlocked(): boolean {
    return this.status === TaskStatus.BLOCKED;
  }

  isHighPriority(): boolean {
    return [
      TaskPriority.HIGH,
      TaskPriority.CRITICAL,
      TaskPriority.URGENT,
    ].includes(this.priority);
  }

  isBug(): boolean {
    return this.type === TaskType.BUG;
  }

  isFeature(): boolean {
    return this.type === TaskType.FEATURE;
  }

  isOverEstimate(): boolean {
    return this.actualHours > this.estimatedHours;
  }

  isUnderEstimate(): boolean {
    return (
      this.actualHours < this.estimatedHours &&
      this.status === TaskStatus.COMPLETED
    );
  }

  getComplexityLevel(): string {
    if (this.complexity >= 8) return "Muy Compleja";
    if (this.complexity >= 6) return "Compleja";
    if (this.complexity >= 4) return "Moderada";
    if (this.complexity >= 2) return "Simple";
    return "Muy Simple";
  }

  getEffortLevel(): string {
    if (this.storyPoints >= 13) return "Muy Alto";
    if (this.storyPoints >= 8) return "Alto";
    if (this.storyPoints >= 5) return "Moderado";
    if (this.storyPoints >= 3) return "Bajo";
    return "Muy Bajo";
  }

  getQualityLevel(): string {
    if (this.qualityScore >= 4.5) return "Excelente";
    if (this.qualityScore >= 4.0) return "Muy Buena";
    if (this.qualityScore >= 3.5) return "Buena";
    if (this.qualityScore >= 3.0) return "Regular";
    if (this.qualityScore >= 2.5) return "Deficiente";
    return "Muy Deficiente";
  }

  getTaskPhase(): string {
    switch (this.status) {
      case TaskStatus.PENDING:
        return "Planificación";
      case TaskStatus.IN_PROGRESS:
        return "Desarrollo";
      case TaskStatus.REVIEW:
        return "Revisión";
      case TaskStatus.TESTING:
        return "Pruebas";
      case TaskStatus.COMPLETED:
        return "Completada";
      case TaskStatus.CANCELLED:
        return "Cancelada";
      case TaskStatus.BLOCKED:
        return "Bloqueada";
      default:
        return "Desconocida";
    }
  }

  getTaskSummary(): string {
    const parts = [
      `${this.taskId}: ${this.title}`,
      this.getStatusDisplayName(),
      this.getPriorityDisplayName(),
      this.getTypeDisplayName(),
      `${this.progressPercentage}%`,
    ];

    if (this.storyPoints > 0) parts.push(`${this.storyPoints} pts`);
    if (this.qualityScore > 0) parts.push(`★${this.qualityScore.toFixed(1)}`);

    return parts.join(" | ");
  }

  getTimeInfo(): string {
    const parts = [];

    if (this.estimatedHours > 0) {
      parts.push(`Estimado: ${this.estimatedHours}h`);
    }

    if (this.actualHours > 0) {
      parts.push(`Real: ${this.actualHours}h`);
    }

    if (this.getDaysElapsed() > 0) {
      parts.push(`Días: ${this.getDaysElapsed()}`);
    }

    if (this.getDaysRemaining() > 0) {
      parts.push(`Restantes: ${this.getDaysRemaining()}`);
    }

    return parts.join(" | ");
  }

  getProgressInfo(): string {
    const parts = [
      `Progreso: ${this.progressPercentage}%`,
      `Fase: ${this.getTaskPhase()}`,
    ];

    if (this.complexity > 0) {
      parts.push(`Complejidad: ${this.getComplexityLevel()}`);
    }

    if (this.storyPoints > 0) {
      parts.push(`Esfuerzo: ${this.getEffortLevel()}`);
    }

    return parts.join(" | ");
  }

  start(): void {
    this.status = TaskStatus.IN_PROGRESS;
    this.startDate = new Date();
    this.updateLastActivity();
  }

  complete(): void {
    this.status = TaskStatus.COMPLETED;
    this.completedDate = new Date();
    this.progressPercentage = 100;
    this.updateLastActivity();
  }

  cancel(reason?: string): void {
    this.status = TaskStatus.CANCELLED;
    this.isActive = false;
    this.updateLastActivity();

    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nCancelada: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  block(reason?: string): void {
    this.status = TaskStatus.BLOCKED;
    this.updateLastActivity();

    if (reason) {
      this.blockers =
        (this.blockers || "") +
        `\n${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  unblock(): void {
    this.status = TaskStatus.IN_PROGRESS;
    this.updateLastActivity();
  }

  sendToReview(): void {
    this.status = TaskStatus.REVIEW;
    this.updateLastActivity();
  }

  sendToTesting(): void {
    this.status = TaskStatus.TESTING;
    this.updateLastActivity();
  }

  updateProgress(percentage: number): void {
    this.progressPercentage = Math.max(0, Math.min(100, percentage));
    this.updateLastActivity();

    if (
      this.progressPercentage === 100 &&
      this.status === TaskStatus.IN_PROGRESS
    ) {
      this.sendToReview();
    }
  }

  addActualHours(hours: number): void {
    this.actualHours += hours;
    this.updateLastActivity();
  }

  updateEstimatedHours(hours: number): void {
    this.estimatedHours = hours;
    this.updateLastActivity();
  }

  updateQualityScore(score: number): void {
    this.qualityScore = Math.max(0, Math.min(5, score));
    this.updateLastActivity();
  }

  updateComplexity(complexity: number): void {
    this.complexity = Math.max(0, Math.min(10, complexity));
    this.updateLastActivity();
  }

  updateStoryPoints(points: number): void {
    this.storyPoints = Math.max(0, points);
    this.updateLastActivity();
  }

  addComment(comment: string): void {
    const timestamp = new Date().toLocaleString();
    this.comments = (this.comments || "") + `\n[${timestamp}] ${comment}`;
    this.updateLastActivity();
  }

  updateLastActivity(): void {
    this.lastUpdated = new Date();
  }

  getTaskScore(): number {
    let score = 0;

    // Completion (30%)
    if (this.status === TaskStatus.COMPLETED) score += 30;
    else if (this.status === TaskStatus.TESTING) score += 25;
    else if (this.status === TaskStatus.REVIEW) score += 20;
    else if (this.status === TaskStatus.IN_PROGRESS) score += 15;
    else if (this.status === TaskStatus.PENDING) score += 5;

    // Quality (25%)
    if (this.qualityScore > 0) {
      score += (this.qualityScore / 5) * 25;
    }

    // Time management (25%)
    if (this.estimatedHours > 0) {
      const efficiency = this.actualHours / this.estimatedHours;
      if (efficiency <= 1.1) score += 25; // Within 10% of estimate
      else if (efficiency <= 1.3) score += 20; // Within 30% of estimate
      else if (efficiency <= 1.5) score += 15; // Within 50% of estimate
      else if (efficiency <= 2.0) score += 10; // Within 100% of estimate
      else score += 5; // Over 100% of estimate
    }

    // Priority handling (20%)
    if (this.isHighPriority()) {
      if (this.status === TaskStatus.COMPLETED) score += 20;
      else if (this.status === TaskStatus.IN_PROGRESS) score += 15;
      else if (
        this.status === TaskStatus.REVIEW ||
        this.status === TaskStatus.TESTING
      )
        score += 10;
      else score += 5;
    } else {
      score += 15; // Normal priority tasks get standard points
    }

    // Penalties
    if (this.isOverdue()) score -= 10;
    if (this.status === TaskStatus.BLOCKED) score -= 5;
    if (this.status === TaskStatus.CANCELLED) score -= 20;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  getTaskGrade(): string {
    const score = this.getTaskScore();
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "B+";
    if (score >= 75) return "B";
    if (score >= 70) return "C+";
    if (score >= 65) return "C";
    if (score >= 60) return "D";
    return "F";
  }

  validateTask(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.taskId || this.taskId.trim() === "") {
      errors.push("ID de tarea es obligatorio");
    }

    if (!this.title || this.title.trim() === "") {
      errors.push("Título de tarea es obligatorio");
    }

    if (this.estimatedHours < 0) {
      errors.push("Horas estimadas no pueden ser negativas");
    }

    if (this.actualHours < 0) {
      errors.push("Horas reales no pueden ser negativas");
    }

    if (this.progressPercentage < 0 || this.progressPercentage > 100) {
      errors.push("Progreso debe estar entre 0 y 100");
    }

    if (this.qualityScore < 0 || this.qualityScore > 5) {
      errors.push("Puntuación de calidad debe estar entre 0 y 5");
    }

    if (this.complexity < 0 || this.complexity > 10) {
      errors.push("Complejidad debe estar entre 0 y 10");
    }

    if (this.storyPoints < 0) {
      errors.push("Story points no pueden ser negativos");
    }

    if (this.startDate && this.dueDate && this.startDate >= this.dueDate) {
      errors.push("Fecha de inicio debe ser anterior a fecha de vencimiento");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getTaskProfile(): string {
    const sections = [
      `📋 ${this.getTaskSummary()}`,
      `⏱️ ${this.getTimeInfo()}`,
      `📊 ${this.getProgressInfo()}`,
      `🎯 Grado: ${this.getTaskGrade()} (${this.getTaskScore()}/100)`,
    ];

    if (this.isOverdue()) sections.push("⚠️ VENCIDA");
    if (this.isBlocked()) sections.push("🚫 BLOQUEADA");
    if (this.isHighPriority()) sections.push("🔥 ALTA PRIORIDAD");

    if (this.description) sections.push(`📝 ${this.description}`);
    if (this.blockers) sections.push(`🚫 Bloqueos: ${this.blockers}`);

    return sections.join("\n");
  }

  toString(): string {
    return `Task(${this.taskId}: ${
      this.title
    }, ${this.getStatusDisplayName()})`;
  }
}
