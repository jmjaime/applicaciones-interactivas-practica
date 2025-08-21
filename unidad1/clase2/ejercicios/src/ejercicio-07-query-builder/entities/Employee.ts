import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Department } from "./Department";
import { Project } from "./Project";
import { Skill } from "./Skill";
import { Task } from "./Task";

export enum EmployeeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ON_LEAVE = "on_leave",
  VACATION = "vacation",
  TERMINATED = "terminated",
  RETIRED = "retired",
}

export enum EmployeeLevel {
  INTERN = "intern",
  JUNIOR = "junior",
  MIDDLE = "middle",
  SENIOR = "senior",
  LEAD = "lead",
  MANAGER = "manager",
  DIRECTOR = "director",
  EXECUTIVE = "executive",
}

export enum ContractType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACT = "contract",
  FREELANCE = "freelance",
  INTERN = "intern",
}

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true, nullable: false })
  employeeId: string;

  @Column({ length: 100, nullable: false })
  firstName: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: "date", nullable: false })
  birthDate: Date;

  @Column({ type: "date", nullable: false })
  hireDate: Date;

  @Column({ type: "date", nullable: true })
  terminationDate?: Date;

  @Column({
    type: "varchar",
    length: 20,
    default: EmployeeStatus.ACTIVE,
  })
  status: EmployeeStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: EmployeeLevel.JUNIOR,
  })
  level: EmployeeLevel;

  @Column({
    type: "varchar",
    length: 20,
    default: ContractType.FULL_TIME,
  })
  contractType: ContractType;

  @Column({ length: 150, nullable: false })
  position: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  salary: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  bonus: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  performanceRating: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  yearsOfExperience: number;

  @Column({ type: "int", unsigned: true, default: 40 })
  weeklyHours: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  overtimeHours: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  vacationDaysUsed: number;

  @Column({ type: "int", unsigned: true, default: 20 })
  vacationDaysTotal: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  sickDaysUsed: number;

  @Column({ type: "int", unsigned: true, default: 10 })
  sickDaysTotal: number;

  @Column({ type: "text", nullable: true })
  address?: string;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ length: 20, nullable: true })
  emergencyContact?: string;

  @Column({ length: 20, nullable: true })
  emergencyPhone?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "datetime", nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relaciones
  @ManyToOne(() => Department, (department) => department.employees)
  department: Department;

  @ManyToMany(() => Project, (project) => project.employees)
  @JoinTable({
    name: "employee_projects",
    joinColumn: { name: "employee_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "project_id", referencedColumnName: "id" },
  })
  projects: Project[];

  @ManyToMany(() => Skill, (skill) => skill.employees)
  @JoinTable({
    name: "employee_skills",
    joinColumn: { name: "employee_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "skill_id", referencedColumnName: "id" },
  })
  skills: Skill[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  tasks: Task[];

  constructor(
    employeeId?: string,
    firstName?: string,
    lastName?: string,
    email?: string
  ) {
    this.employeeId = employeeId || this.generateEmployeeId();
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email || "";
    this.hireDate = new Date();
    this.birthDate = new Date();
  }

  private generateEmployeeId(): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString().substr(2, 4);
    return `EMP${year}${random}`;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getStatusDisplayName(): string {
    const statusNames: Record<EmployeeStatus, string> = {
      [EmployeeStatus.ACTIVE]: "Activo",
      [EmployeeStatus.INACTIVE]: "Inactivo",
      [EmployeeStatus.ON_LEAVE]: "Con licencia",
      [EmployeeStatus.VACATION]: "Vacaciones",
      [EmployeeStatus.TERMINATED]: "Despedido",
      [EmployeeStatus.RETIRED]: "Jubilado",
    };
    return statusNames[this.status];
  }

  getLevelDisplayName(): string {
    const levelNames: Record<EmployeeLevel, string> = {
      [EmployeeLevel.INTERN]: "Pasante",
      [EmployeeLevel.JUNIOR]: "Junior",
      [EmployeeLevel.MIDDLE]: "Semi-Senior",
      [EmployeeLevel.SENIOR]: "Senior",
      [EmployeeLevel.LEAD]: "Líder Técnico",
      [EmployeeLevel.MANAGER]: "Manager",
      [EmployeeLevel.DIRECTOR]: "Director",
      [EmployeeLevel.EXECUTIVE]: "Ejecutivo",
    };
    return levelNames[this.level];
  }

  getContractTypeDisplayName(): string {
    const contractNames: Record<ContractType, string> = {
      [ContractType.FULL_TIME]: "Tiempo completo",
      [ContractType.PART_TIME]: "Medio tiempo",
      [ContractType.CONTRACT]: "Contratista",
      [ContractType.FREELANCE]: "Freelance",
      [ContractType.INTERN]: "Pasantía",
    };
    return contractNames[this.contractType];
  }

  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  getYearsAtCompany(): number {
    const today = new Date();
    const hireDate = new Date(this.hireDate);
    let years = today.getFullYear() - hireDate.getFullYear();
    const monthDiff = today.getMonth() - hireDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < hireDate.getDate())
    ) {
      years--;
    }

    return Math.max(0, years);
  }

  getTotalCompensation(): number {
    return this.salary + this.bonus;
  }

  getVacationDaysRemaining(): number {
    return this.vacationDaysTotal - this.vacationDaysUsed;
  }

  getSickDaysRemaining(): number {
    return this.sickDaysTotal - this.sickDaysUsed;
  }

  getPerformanceLevel(): string {
    if (this.performanceRating >= 4.5) return "Excepcional";
    if (this.performanceRating >= 4.0) return "Sobresaliente";
    if (this.performanceRating >= 3.5) return "Cumple expectativas";
    if (this.performanceRating >= 3.0) return "Necesita mejora";
    if (this.performanceRating >= 2.0) return "Por debajo expectativas";
    return "Inaceptable";
  }

  isEligibleForPromotion(): boolean {
    return (
      this.performanceRating >= 4.0 &&
      this.getYearsAtCompany() >= 1 &&
      this.status === EmployeeStatus.ACTIVE
    );
  }

  isOvertime(): boolean {
    return this.overtimeHours > 0;
  }

  isPartTime(): boolean {
    return (
      this.contractType === ContractType.PART_TIME || this.weeklyHours < 40
    );
  }

  isManager(): boolean {
    return [
      EmployeeLevel.MANAGER,
      EmployeeLevel.DIRECTOR,
      EmployeeLevel.EXECUTIVE,
    ].includes(this.level);
  }

  isSeniorLevel(): boolean {
    return [
      EmployeeLevel.SENIOR,
      EmployeeLevel.LEAD,
      EmployeeLevel.MANAGER,
      EmployeeLevel.DIRECTOR,
      EmployeeLevel.EXECUTIVE,
    ].includes(this.level);
  }

  hasMaxedVacation(): boolean {
    return this.vacationDaysUsed >= this.vacationDaysTotal;
  }

  hasMaxedSickDays(): boolean {
    return this.sickDaysUsed >= this.sickDaysTotal;
  }

  getEmployeeSummary(): string {
    const parts = [
      `${this.employeeId}: ${this.getFullName()}`,
      this.position,
      this.getLevelDisplayName(),
      this.getStatusDisplayName(),
      `$${this.getTotalCompensation().toLocaleString()}`,
    ];

    if (this.performanceRating > 0) {
      parts.push(`Rating: ${this.performanceRating.toFixed(1)}`);
    }

    return parts.join(" | ");
  }

  getContactInfo(): string {
    const contacts = [];
    contacts.push(`📧 ${this.email}`);
    if (this.phone) contacts.push(`📞 ${this.phone}`);
    if (this.city) contacts.push(`📍 ${this.city}`);
    return contacts.join(" | ");
  }

  getWorkInfo(): string {
    const parts = [
      `${this.getContractTypeDisplayName()}`,
      `${this.weeklyHours}h/semana`,
      `${this.getYearsAtCompany()} años en empresa`,
      `${this.yearsOfExperience} años experiencia`,
    ];

    if (this.overtimeHours > 0) {
      parts.push(`${this.overtimeHours}h extras`);
    }

    return parts.join(" | ");
  }

  getTimeOffInfo(): string {
    return (
      `Vacaciones: ${this.getVacationDaysRemaining()}/${
        this.vacationDaysTotal
      } | ` +
      `Días por enfermedad: ${this.getSickDaysRemaining()}/${
        this.sickDaysTotal
      }`
    );
  }

  useVacationDays(days: number): boolean {
    if (this.vacationDaysUsed + days <= this.vacationDaysTotal) {
      this.vacationDaysUsed += days;
      return true;
    }
    return false;
  }

  useSickDays(days: number): boolean {
    if (this.sickDaysUsed + days <= this.sickDaysTotal) {
      this.sickDaysUsed += days;
      return true;
    }
    return false;
  }

  addOvertime(hours: number): void {
    this.overtimeHours += hours;
  }

  resetOvertime(): void {
    this.overtimeHours = 0;
  }

  giveRaise(amount: number): void {
    this.salary += amount;
  }

  giveRaisePercentage(percentage: number): void {
    this.salary *= 1 + percentage / 100;
  }

  giveBonus(amount: number): void {
    this.bonus += amount;
  }

  updatePerformanceRating(rating: number): void {
    this.performanceRating = Math.max(0, Math.min(5, rating));
  }

  promote(
    newLevel: EmployeeLevel,
    newPosition: string,
    salaryIncrease: number = 0
  ): void {
    this.level = newLevel;
    this.position = newPosition;
    if (salaryIncrease > 0) {
      this.giveRaise(salaryIncrease);
    }
  }

  terminate(reason?: string): void {
    this.status = EmployeeStatus.TERMINATED;
    this.isActive = false;
    this.terminationDate = new Date();
    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nTerminado: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  retire(): void {
    this.status = EmployeeStatus.RETIRED;
    this.isActive = false;
    this.terminationDate = new Date();
  }

  takeLeave(reason?: string): void {
    this.status = EmployeeStatus.ON_LEAVE;
    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nLicencia: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  goOnVacation(): void {
    this.status = EmployeeStatus.VACATION;
  }

  returnToWork(): void {
    this.status = EmployeeStatus.ACTIVE;
  }

  updateLoginTime(): void {
    this.lastLoginAt = new Date();
  }

  getSalaryGrade(): string {
    if (this.salary >= 150000) return "A+";
    if (this.salary >= 120000) return "A";
    if (this.salary >= 100000) return "B+";
    if (this.salary >= 80000) return "B";
    if (this.salary >= 60000) return "C+";
    if (this.salary >= 40000) return "C";
    if (this.salary >= 25000) return "D";
    return "E";
  }

  getEmployeeScore(): number {
    let score = 0;

    // Puntos por performance (40%)
    score += (this.performanceRating / 5) * 40;

    // Puntos por experiencia (20%)
    const expScore = Math.min(this.yearsOfExperience / 10, 1) * 20;
    score += expScore;

    // Puntos por años en empresa (20%)
    const tenureScore = Math.min(this.getYearsAtCompany() / 5, 1) * 20;
    score += tenureScore;

    // Puntos por nivel (10%)
    const levelPoints: Record<EmployeeLevel, number> = {
      [EmployeeLevel.INTERN]: 2,
      [EmployeeLevel.JUNIOR]: 4,
      [EmployeeLevel.MIDDLE]: 6,
      [EmployeeLevel.SENIOR]: 8,
      [EmployeeLevel.LEAD]: 9,
      [EmployeeLevel.MANAGER]: 10,
      [EmployeeLevel.DIRECTOR]: 10,
      [EmployeeLevel.EXECUTIVE]: 10,
    };
    score += levelPoints[this.level] || 0;

    // Puntos por estado (10%)
    if (this.status === EmployeeStatus.ACTIVE) score += 10;
    else if (this.status === EmployeeStatus.VACATION) score += 8;
    else if (this.status === EmployeeStatus.ON_LEAVE) score += 5;

    return Math.round(score);
  }

  getEmployeeGrade(): string {
    const score = this.getEmployeeScore();
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "B+";
    if (score >= 75) return "B";
    if (score >= 70) return "C+";
    if (score >= 65) return "C";
    if (score >= 60) return "D";
    return "F";
  }

  validateEmployee(): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (!this.employeeId || this.employeeId.trim() === "") {
      errors.push("ID de empleado es obligatorio");
    }

    if (!this.firstName || this.firstName.trim() === "") {
      errors.push("Nombre es obligatorio");
    }

    if (!this.lastName || this.lastName.trim() === "") {
      errors.push("Apellido es obligatorio");
    }

    if (!this.email || this.email.trim() === "") {
      errors.push("Email es obligatorio");
    }

    if (this.salary < 0) {
      errors.push("Salario no puede ser negativo");
    }

    if (this.bonus < 0) {
      errors.push("Bono no puede ser negativo");
    }

    if (this.performanceRating < 0 || this.performanceRating > 5) {
      errors.push("Calificación debe estar entre 0 y 5");
    }

    if (this.weeklyHours < 0 || this.weeklyHours > 80) {
      errors.push("Horas semanales deben estar entre 0 y 80");
    }

    if (this.vacationDaysUsed > this.vacationDaysTotal) {
      errors.push("Días de vacaciones usados no pueden superar el total");
    }

    if (this.sickDaysUsed > this.sickDaysTotal) {
      errors.push("Días por enfermedad usados no pueden superar el total");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getEmployeeProfile(): string {
    const sections = [
      `👤 ${this.getEmployeeSummary()}`,
      `📞 ${this.getContactInfo()}`,
      `💼 ${this.getWorkInfo()}`,
      `🏖️ ${this.getTimeOffInfo()}`,
      `📊 Score: ${this.getEmployeeGrade()} (${this.getEmployeeScore()}/100)`,
      `💰 Grado salarial: ${this.getSalaryGrade()}`,
    ];

    if (this.notes) sections.push(`📝 ${this.notes}`);

    return sections.join("\n");
  }

  toString(): string {
    return `Employee(${this.employeeId}: ${this.getFullName()}, ${
      this.position
    })`;
  }
}
