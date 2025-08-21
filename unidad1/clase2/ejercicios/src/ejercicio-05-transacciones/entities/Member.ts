import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Loan } from "./Loan";
import { Fine } from "./Fine";
import { Payment } from "./Payment";

export enum MemberType {
  STUDENT = "student",
  FACULTY = "faculty",
  STAFF = "staff",
  PUBLIC = "public",
  SENIOR = "senior",
}

export enum MemberStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  EXPIRED = "expired",
  BLOCKED = "blocked",
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  firstName: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 50, unique: true, nullable: false })
  membershipId: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: MemberType.PUBLIC,
  })
  type: MemberType;

  @Column({
    type: "varchar",
    length: 20,
    default: MemberStatus.ACTIVE,
  })
  status: MemberStatus;

  @Column({ type: "date", nullable: false })
  membershipStartDate: Date;

  @Column({ type: "date", nullable: false })
  membershipEndDate: Date;

  @Column({ type: "int", unsigned: true, default: 5 })
  maxBooksAllowed: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  currentBooksCount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  totalFinesOwed: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  totalFinesPaid: number;

  @Column({ type: "int", unsigned: true, default: 14 })
  loanPeriodDays: number;

  @Column({ type: "boolean", default: true })
  canRenew: boolean;

  @Column({ type: "int", unsigned: true, default: 2 })
  maxRenewals: number;

  @Column({ type: "boolean", default: true })
  canReserve: boolean;

  @Column({ type: "int", unsigned: true, default: 3 })
  maxReservations: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "json", nullable: true })
  preferences?: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    renewalReminders?: boolean;
    overdueReminders?: boolean;
    language?: string;
  };

  @Column({ type: "varchar", length: 200, nullable: true })
  address?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  city?: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  postalCode?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  institution?: string; // Para estudiantes/faculty

  @Column({ type: "varchar", length: 50, nullable: true })
  studentId?: string; // Para estudiantes

  @Column({ type: "varchar", length: 100, nullable: true })
  department?: string; // Para faculty/staff

  @Column({ type: "datetime", nullable: true })
  lastLoginDate?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalBooksLoaned: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  memberRating: number; // Rating based on return history

  // ===== RELACIONES =====

  @OneToMany(() => Loan, (loan) => loan.member, {
    cascade: true,
  })
  loans: Loan[];

  @OneToMany(() => Fine, (fine) => fine.member, {
    cascade: true,
  })
  fines: Fine[];

  @OneToMany(() => Payment, (payment) => payment.member, {
    cascade: true,
  })
  payments: Payment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    membershipId?: string,
    type?: MemberType
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email || "";
    this.membershipId = membershipId || this.generateMembershipId();
    this.type = type || MemberType.PUBLIC;
    this.membershipStartDate = new Date();
    this.membershipEndDate = this.calculateMembershipEndDate();
  }

  // ===== MÉTODOS UTILITARIOS =====

  private generateMembershipId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `MEM-${timestamp}-${random}`.toUpperCase();
  }

  private calculateMembershipEndDate(): Date {
    const endDate = new Date();
    const years =
      this.type === MemberType.STUDENT
        ? 4
        : this.type === MemberType.FACULTY
        ? 5
        : this.type === MemberType.STAFF
        ? 3
        : 1;
    endDate.setFullYear(endDate.getFullYear() + years);
    return endDate;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<MemberType, string> = {
      [MemberType.STUDENT]: "Estudiante",
      [MemberType.FACULTY]: "Profesor",
      [MemberType.STAFF]: "Personal",
      [MemberType.PUBLIC]: "Público General",
      [MemberType.SENIOR]: "Adulto Mayor",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<MemberStatus, string> = {
      [MemberStatus.ACTIVE]: "Activo",
      [MemberStatus.INACTIVE]: "Inactivo",
      [MemberStatus.SUSPENDED]: "Suspendido",
      [MemberStatus.EXPIRED]: "Expirado",
      [MemberStatus.BLOCKED]: "Bloqueado",
    };
    return statusNames[this.status];
  }

  isEligibleForLoan(): boolean {
    return (
      this.status === MemberStatus.ACTIVE &&
      this.isActive &&
      this.currentBooksCount < this.maxBooksAllowed &&
      this.membershipEndDate > new Date() &&
      this.totalFinesOwed < 50
    ); // Límite de multas pendientes
  }

  canBorrowMoreBooks(): boolean {
    return this.currentBooksCount < this.maxBooksAllowed;
  }

  getAvailableBooksSlots(): number {
    return this.maxBooksAllowed - this.currentBooksCount;
  }

  isNearMembershipExpiry(days: number = 30): boolean {
    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + days);
    return this.membershipEndDate <= warningDate;
  }

  hasOverdueBooks(): boolean {
    return this.loans.some((loan) => loan.isOverdue() && !loan.isReturned);
  }

  hasUnpaidFines(): boolean {
    return this.totalFinesOwed > 0;
  }

  calculateAge(): number | null {
    if (!this.birthDate) return null;

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

  isSeniorMember(): boolean {
    const age = this.calculateAge();
    return age !== null && age >= 65;
  }

  updatePreferences(newPreferences: {
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    renewalReminders?: boolean;
    overdueReminders?: boolean;
    language?: string;
  }): void {
    this.preferences = { ...this.preferences, ...newPreferences };
  }

  addFine(amount: number): void {
    this.totalFinesOwed += amount;
  }

  payFine(amount: number): void {
    const amountToPay = Math.min(amount, this.totalFinesOwed);
    this.totalFinesOwed -= amountToPay;
    this.totalFinesPaid += amountToPay;
  }

  borrowBook(): void {
    if (this.canBorrowMoreBooks()) {
      this.currentBooksCount++;
      this.totalBooksLoaned++;
    }
  }

  returnBook(): void {
    if (this.currentBooksCount > 0) {
      this.currentBooksCount--;
    }
  }

  extendMembership(years: number = 1): void {
    this.membershipEndDate.setFullYear(
      this.membershipEndDate.getFullYear() + years
    );
    if (this.status === MemberStatus.EXPIRED) {
      this.status = MemberStatus.ACTIVE;
    }
  }

  suspend(reason?: string): void {
    this.status = MemberStatus.SUSPENDED;
    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nSuspendido: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  reactivate(): void {
    if (this.membershipEndDate > new Date()) {
      this.status = MemberStatus.ACTIVE;
      this.isActive = true;
    } else {
      this.status = MemberStatus.EXPIRED;
    }
  }

  block(reason?: string): void {
    this.status = MemberStatus.BLOCKED;
    this.isActive = false;
    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nBloqueado: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  updateLastLogin(): void {
    this.lastLoginDate = new Date();
  }

  updateMemberRating(): void {
    // Calcular rating basado en historial de devoluciones
    const totalLoans = this.loans.length;
    if (totalLoans === 0) {
      this.memberRating = 5.0;
      return;
    }

    const onTimeReturns = this.loans.filter(
      (loan) => loan.isReturned && loan.returnDate! <= loan.dueDate
    ).length;

    const lateReturns = this.loans.filter(
      (loan) => loan.isReturned && loan.returnDate! > loan.dueDate
    ).length;

    const currentOverdue = this.loans.filter(
      (loan) => !loan.isReturned && loan.isOverdue()
    ).length;

    // Fórmula de rating: 5 - (penalizaciones)
    let rating = 5.0;
    rating -= lateReturns * 0.1; // -0.1 por cada devolución tardía
    rating -= currentOverdue * 0.5; // -0.5 por cada libro actualmente vencido
    rating -= this.totalFinesOwed * 0.01; // -0.01 por cada peso de multa pendiente

    this.memberRating = Math.max(0, Math.min(5, rating));
  }

  getDaysUntilExpiry(): number {
    const diff = this.membershipEndDate.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getContactInfo(): string {
    const contact = [this.email];
    if (this.phone) contact.push(this.phone);
    return contact.join(" | ");
  }

  getInstitutionInfo(): string {
    const info = [];
    if (this.institution) info.push(this.institution);
    if (this.department) info.push(this.department);
    if (this.studentId) info.push(`ID: ${this.studentId}`);
    return info.length > 0 ? info.join(" - ") : "Sin información institucional";
  }

  getMembershipSummary(): string {
    return `${this.getFullName()} (${
      this.membershipId
    }) - ${this.getTypeDisplayName()} - ${this.getStatusDisplayName()} - Libros: ${
      this.currentBooksCount
    }/${this.maxBooksAllowed}`;
  }

  getDetailedInfo(): string {
    const parts = [
      `Miembro: ${this.getFullName()}`,
      `ID: ${this.membershipId}`,
      `Tipo: ${this.getTypeDisplayName()}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `Libros: ${this.currentBooksCount}/${this.maxBooksAllowed}`,
      `Multas: $${this.totalFinesOwed.toLocaleString()}`,
      `Rating: ${this.memberRating.toFixed(1)}/5.0`,
      `Vencimiento: ${this.membershipEndDate.toLocaleDateString()}`,
    ];

    return parts.join(" | ");
  }

  getLoanEligibilityStatus(): { eligible: boolean; reasons: string[] } {
    const reasons = [];

    if (this.status !== MemberStatus.ACTIVE) {
      reasons.push(`Estado inválido: ${this.getStatusDisplayName()}`);
    }

    if (!this.isActive) {
      reasons.push("Cuenta inactiva");
    }

    if (this.currentBooksCount >= this.maxBooksAllowed) {
      reasons.push("Límite de libros alcanzado");
    }

    if (this.membershipEndDate <= new Date()) {
      reasons.push("Membresía expirada");
    }

    if (this.totalFinesOwed >= 50) {
      reasons.push("Multas pendientes excesivas");
    }

    return {
      eligible: reasons.length === 0,
      reasons,
    };
  }
}
