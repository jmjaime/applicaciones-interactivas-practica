import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Member } from "./Member";
import { Book } from "./Book";
import { Fine } from "./Fine";

export enum LoanStatus {
  ACTIVE = "active",
  RETURNED = "returned",
  OVERDUE = "overdue",
  RENEWED = "renewed",
  LOST = "lost",
  DAMAGED = "damaged",
  CANCELLED = "cancelled",
}

export enum LoanType {
  STANDARD = "standard",
  RENEWAL = "renewal",
  EXTENDED = "extended",
  SPECIAL = "special",
  INTERLIBRARY = "interlibrary",
}

export enum ReturnCondition {
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
  DAMAGED = "damaged",
  LOST = "lost",
}

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  loanNumber: string;

  @Column({ type: "datetime", nullable: false })
  loanDate: Date;

  @Column({ type: "datetime", nullable: false })
  dueDate: Date;

  @Column({ type: "datetime", nullable: true })
  returnDate?: Date;

  @Column({
    type: "varchar",
    length: 20,
    default: LoanStatus.ACTIVE,
  })
  status: LoanStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: LoanType.STANDARD,
  })
  type: LoanType;

  @Column({ type: "boolean", default: false })
  isReturned: boolean;

  @Column({ type: "boolean", default: false })
  isOverdueNotified: boolean;

  @Column({ type: "int", unsigned: true, default: 0 })
  renewalsCount: number;

  @Column({ type: "int", unsigned: true, default: 2 })
  maxRenewals: number;

  @Column({ type: "int", unsigned: true, default: 14 })
  originalLoanPeriod: number; // Período original en días

  @Column({ type: "int", unsigned: true, default: 0 })
  extensionDays: number; // Días de extensión otorgados

  @Column({ type: "datetime", nullable: true })
  lastRenewalDate?: Date;

  @Column({ type: "datetime", nullable: true })
  firstOverdueNotificationDate?: Date;

  @Column({ type: "datetime", nullable: true })
  lastOverdueNotificationDate?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  overdueNotificationsCount: number;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  returnCondition?: ReturnCondition;

  @Column({ type: "text", nullable: true })
  returnNotes?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  totalFines: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  finesPaid: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  outstandingFines: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  librarian?: string; // Bibliotecario que procesó el préstamo

  @Column({ type: "varchar", length: 100, nullable: true })
  returnProcessedBy?: string; // Bibliotecario que procesó la devolución

  @Column({ type: "text", nullable: true })
  specialInstructions?: string;

  @Column({ type: "boolean", default: false })
  requiresPhysicalInspection: boolean;

  @Column({ type: "boolean", default: false })
  wasInspected: boolean;

  @Column({ type: "datetime", nullable: true })
  inspectionDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  inspectedBy?: string;

  @Column({ type: "text", nullable: true })
  inspectionNotes?: string;

  @Column({ type: "boolean", default: false })
  isDigitalLoan: boolean;

  @Column({ type: "datetime", nullable: true })
  digitalAccessGranted?: Date;

  @Column({ type: "datetime", nullable: true })
  digitalAccessRevoked?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  digitalAccessCount: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  digitalAccessUrl?: string;

  @Column({ type: "json", nullable: true })
  renewalHistory?: {
    date: Date;
    newDueDate: Date;
    reason?: string;
    processedBy?: string;
  }[];

  @Column({ type: "json", nullable: true })
  notificationHistory?: {
    date: Date;
    type: "reminder" | "overdue" | "final";
    method: "email" | "sms" | "phone";
    successful: boolean;
  }[];

  @Column({ type: "boolean", default: false })
  isInterlibrary: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  lendingLibrary?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  interlibraryFee: number;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  // ===== RELACIONES =====

  @ManyToOne(() => Member, (member) => member.loans, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "memberId" })
  member: Member;

  @Column({ type: "int", unsigned: true, nullable: false })
  memberId: number;

  @ManyToOne(() => Book, (book) => book.loans, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "bookId" })
  book: Book;

  @Column({ type: "int", unsigned: true, nullable: false })
  bookId: number;

  @OneToMany(() => Fine, (fine) => fine.loan, {
    cascade: true,
  })
  fines: Fine[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(member?: Member, book?: Book, loanPeriod?: number) {
    this.member = member!;
    this.book = book!;
    this.loanNumber = this.generateLoanNumber();
    this.loanDate = new Date();
    this.dueDate = this.calculateDueDate(loanPeriod || 14);
    this.originalLoanPeriod = loanPeriod || 14;
    this.digitalAccessCount = 0;
  }

  // ===== MÉTODOS UTILITARIOS =====

  private generateLoanNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `LN-${timestamp}-${random}`.toUpperCase();
  }

  private calculateDueDate(days: number): Date {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate;
  }

  getStatusDisplayName(): string {
    const statusNames: Record<LoanStatus, string> = {
      [LoanStatus.ACTIVE]: "Activo",
      [LoanStatus.RETURNED]: "Devuelto",
      [LoanStatus.OVERDUE]: "Vencido",
      [LoanStatus.RENEWED]: "Renovado",
      [LoanStatus.LOST]: "Perdido",
      [LoanStatus.DAMAGED]: "Dañado",
      [LoanStatus.CANCELLED]: "Cancelado",
    };
    return statusNames[this.status];
  }

  getTypeDisplayName(): string {
    const typeNames: Record<LoanType, string> = {
      [LoanType.STANDARD]: "Estándar",
      [LoanType.RENEWAL]: "Renovación",
      [LoanType.EXTENDED]: "Extendido",
      [LoanType.SPECIAL]: "Especial",
      [LoanType.INTERLIBRARY]: "Interbiblioteca",
    };
    return typeNames[this.type];
  }

  getReturnConditionDisplayName(): string {
    if (!this.returnCondition) return "Sin evaluar";

    const conditionNames: Record<ReturnCondition, string> = {
      [ReturnCondition.EXCELLENT]: "Excelente",
      [ReturnCondition.GOOD]: "Bueno",
      [ReturnCondition.FAIR]: "Regular",
      [ReturnCondition.POOR]: "Pobre",
      [ReturnCondition.DAMAGED]: "Dañado",
      [ReturnCondition.LOST]: "Perdido",
    };
    return conditionNames[this.returnCondition];
  }

  isOverdue(): boolean {
    if (this.isReturned) return false;
    return new Date() > this.dueDate;
  }

  getDaysOverdue(): number {
    if (!this.isOverdue()) return 0;

    const today = new Date();
    const diffTime = today.getTime() - this.dueDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysUntilDue(): number {
    if (this.isReturned) return 0;

    const today = new Date();
    const diffTime = this.dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysOnLoan(): number {
    const endDate = this.isReturned ? this.returnDate! : new Date();
    const diffTime = endDate.getTime() - this.loanDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getTotalLoanPeriod(): number {
    return this.originalLoanPeriod + this.extensionDays;
  }

  canBeRenewed(): boolean {
    return (
      !this.isReturned &&
      this.status === LoanStatus.ACTIVE &&
      this.renewalsCount < this.maxRenewals &&
      this.member.canRenew &&
      this.book.canBeBorrowed() &&
      this.outstandingFines === 0
    );
  }

  getRemainingRenewals(): number {
    return Math.max(0, this.maxRenewals - this.renewalsCount);
  }

  renew(
    extensionDays: number = 14,
    reason?: string,
    processedBy?: string
  ): boolean {
    if (!this.canBeRenewed()) return false;

    const oldDueDate = this.dueDate;
    this.dueDate = new Date(
      this.dueDate.getTime() + extensionDays * 24 * 60 * 60 * 1000
    );
    this.renewalsCount++;
    this.lastRenewalDate = new Date();
    this.extensionDays += extensionDays;
    this.status = LoanStatus.RENEWED;

    // Registrar en historial
    if (!this.renewalHistory) this.renewalHistory = [];
    this.renewalHistory.push({
      date: new Date(),
      newDueDate: this.dueDate,
      reason,
      processedBy,
    });

    return true;
  }

  extend(days: number, reason?: string): boolean {
    if (this.isReturned) return false;

    this.dueDate = new Date(
      this.dueDate.getTime() + days * 24 * 60 * 60 * 1000
    );
    this.extensionDays += days;
    this.type = LoanType.EXTENDED;

    if (reason) {
      this.specialInstructions =
        (this.specialInstructions || "") +
        `\nExtensión: ${days} días - ${reason} - ${new Date().toLocaleDateString()}`;
    }

    return true;
  }

  returnBook(
    condition: ReturnCondition,
    notes?: string,
    processedBy?: string,
    requiresInspection: boolean = false
  ): boolean {
    if (this.isReturned) return false;

    this.returnDate = new Date();
    this.returnCondition = condition;
    this.returnNotes = notes;
    this.returnProcessedBy = processedBy;
    this.isReturned = true;
    this.status = LoanStatus.RETURNED;

    if (requiresInspection) {
      this.requiresPhysicalInspection = true;
    }

    // Actualizar estadísticas del miembro
    this.member.returnBook();

    // Actualizar estado del libro
    this.book.return();

    // Calcular multas si corresponde
    this.calculateFines();

    return true;
  }

  calculateFines(): number {
    if (!this.isOverdue() || this.isReturned) return 0;

    const daysOverdue = this.getDaysOverdue();
    const finePerDay = this.book.category?.lateFeePerDay || 1.0;
    const fine = daysOverdue * finePerDay;

    this.totalFines = fine;
    this.outstandingFines = fine - this.finesPaid;

    return fine;
  }

  payFine(amount: number): boolean {
    if (amount <= 0 || amount > this.outstandingFines) return false;

    this.finesPaid += amount;
    this.outstandingFines -= amount;
    this.member.payFine(amount);

    return true;
  }

  addOverdueNotification(
    method: "email" | "sms" | "phone",
    successful: boolean
  ): void {
    const now = new Date();

    if (!this.firstOverdueNotificationDate) {
      this.firstOverdueNotificationDate = now;
    }

    this.lastOverdueNotificationDate = now;
    this.overdueNotificationsCount++;
    this.isOverdueNotified = true;

    if (!this.notificationHistory) this.notificationHistory = [];
    this.notificationHistory.push({
      date: now,
      type: "overdue",
      method,
      successful,
    });
  }

  addReminderNotification(
    method: "email" | "sms" | "phone",
    successful: boolean
  ): void {
    if (!this.notificationHistory) this.notificationHistory = [];
    this.notificationHistory.push({
      date: new Date(),
      type: "reminder",
      method,
      successful,
    });
  }

  addFinalNotification(
    method: "email" | "sms" | "phone",
    successful: boolean
  ): void {
    if (!this.notificationHistory) this.notificationHistory = [];
    this.notificationHistory.push({
      date: new Date(),
      type: "final",
      method,
      successful,
    });
  }

  markAsLost(): void {
    this.status = LoanStatus.LOST;
    this.book.markAsLost();

    // Calcular multa por pérdida
    const replacementCost = this.book.replacementCost || this.book.price || 50;
    this.totalFines += replacementCost;
    this.outstandingFines += replacementCost;
    this.member.addFine(replacementCost);
  }

  markAsDamaged(): void {
    this.status = LoanStatus.DAMAGED;
    this.book.markAsDamaged();

    // Calcular multa por daño (porcentaje del costo)
    const damageCost =
      (this.book.replacementCost || this.book.price || 50) * 0.5;
    this.totalFines += damageCost;
    this.outstandingFines += damageCost;
    this.member.addFine(damageCost);
  }

  cancel(reason?: string): void {
    if (this.isReturned) return;

    this.status = LoanStatus.CANCELLED;
    this.isActive = false;
    this.book.return(); // Liberar el libro
    this.member.returnBook(); // Actualizar contador del miembro

    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nCancelado: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  inspect(inspectedBy: string, notes?: string): void {
    this.wasInspected = true;
    this.inspectionDate = new Date();
    this.inspectedBy = inspectedBy;
    this.inspectionNotes = notes;
    this.requiresPhysicalInspection = false;
  }

  grantDigitalAccess(): boolean {
    if (!this.book.isDigital) return false;

    this.digitalAccessGranted = new Date();
    this.digitalAccessCount++;
    this.digitalAccessUrl = `https://library.digital/access/${this.loanNumber}`;
    this.isDigitalLoan = true;

    return true;
  }

  revokeDigitalAccess(): void {
    this.digitalAccessRevoked = new Date();
    this.digitalAccessUrl = undefined;
  }

  getDueDateStatus(): {
    status: string;
    daysRemaining: number;
    isUrgent: boolean;
  } {
    if (this.isReturned) {
      return { status: "returned", daysRemaining: 0, isUrgent: false };
    }

    const daysRemaining = this.getDaysUntilDue();

    if (daysRemaining < 0) {
      return {
        status: "overdue",
        daysRemaining: Math.abs(daysRemaining),
        isUrgent: true,
      };
    } else if (daysRemaining === 0) {
      return { status: "due_today", daysRemaining: 0, isUrgent: true };
    } else if (daysRemaining <= 3) {
      return { status: "due_soon", daysRemaining, isUrgent: true };
    } else {
      return { status: "current", daysRemaining, isUrgent: false };
    }
  }

  getNotificationSummary(): {
    totalNotifications: number;
    lastNotification?: Date;
    successful: number;
    failed: number;
  } {
    if (!this.notificationHistory) {
      return { totalNotifications: 0, successful: 0, failed: 0 };
    }

    const successful = this.notificationHistory.filter(
      (n) => n.successful
    ).length;
    const failed = this.notificationHistory.filter((n) => !n.successful).length;
    const lastNotification =
      this.notificationHistory.length > 0
        ? this.notificationHistory[this.notificationHistory.length - 1].date
        : undefined;

    return {
      totalNotifications: this.notificationHistory.length,
      lastNotification,
      successful,
      failed,
    };
  }

  getRenewalSummary(): {
    totalRenewals: number;
    remainingRenewals: number;
    lastRenewal?: Date;
    totalExtensionDays: number;
  } {
    return {
      totalRenewals: this.renewalsCount,
      remainingRenewals: this.getRemainingRenewals(),
      lastRenewal: this.lastRenewalDate,
      totalExtensionDays: this.extensionDays,
    };
  }

  getFineSummary(): {
    totalFines: number;
    finesPaid: number;
    outstandingFines: number;
    isFullyPaid: boolean;
  } {
    return {
      totalFines: this.totalFines,
      finesPaid: this.finesPaid,
      outstandingFines: this.outstandingFines,
      isFullyPaid: this.outstandingFines === 0,
    };
  }

  getLoanSummary(): string {
    const dueStatus = this.getDueDateStatus();
    const memberName = this.member.getFullName();
    const bookTitle = this.book.getFullTitle();

    return `${this.loanNumber}: ${memberName} - ${bookTitle} (${dueStatus.status})`;
  }

  getDetailedInfo(): string {
    const parts = [
      `Préstamo: ${this.loanNumber}`,
      `Miembro: ${this.member.getFullName()}`,
      `Libro: ${this.book.getFullTitle()}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `Prestado: ${this.loanDate.toLocaleDateString()}`,
      `Vence: ${this.dueDate.toLocaleDateString()}`,
    ];

    if (this.isReturned && this.returnDate) {
      parts.push(`Devuelto: ${this.returnDate.toLocaleDateString()}`);
    }

    if (this.renewalsCount > 0) {
      parts.push(`Renovaciones: ${this.renewalsCount}/${this.maxRenewals}`);
    }

    if (this.outstandingFines > 0) {
      parts.push(`Multas: $${this.outstandingFines.toLocaleString()}`);
    }

    return parts.join(" | ");
  }

  getTimelineInfo(): string {
    const timeline = [];

    timeline.push(`📅 Prestado: ${this.loanDate.toLocaleDateString()}`);

    if (this.renewalHistory && this.renewalHistory.length > 0) {
      for (const renewal of this.renewalHistory) {
        timeline.push(
          `🔄 Renovado: ${renewal.date.toLocaleDateString()} (hasta ${renewal.newDueDate.toLocaleDateString()})`
        );
      }
    }

    if (this.isReturned && this.returnDate) {
      timeline.push(
        `✅ Devuelto: ${this.returnDate.toLocaleDateString()} (${this.getReturnConditionDisplayName()})`
      );
    } else {
      const dueStatus = this.getDueDateStatus();
      if (dueStatus.status === "overdue") {
        timeline.push(`⚠️ Vencido: ${dueStatus.daysRemaining} días`);
      } else if (dueStatus.status === "due_today") {
        timeline.push(`🚨 Vence hoy`);
      } else if (dueStatus.status === "due_soon") {
        timeline.push(`⏰ Vence en ${dueStatus.daysRemaining} días`);
      } else {
        timeline.push(`📆 Vence: ${this.dueDate.toLocaleDateString()}`);
      }
    }

    return timeline.join("\n");
  }

  needsAttention(): boolean {
    return (
      this.isOverdue() ||
      this.getDaysUntilDue() <= 1 ||
      this.outstandingFines > 0 ||
      this.requiresPhysicalInspection ||
      this.status === LoanStatus.LOST ||
      this.status === LoanStatus.DAMAGED
    );
  }

  getAttentionReasons(): string[] {
    const reasons = [];

    if (this.isOverdue()) {
      reasons.push(`Vencido hace ${this.getDaysOverdue()} días`);
    } else if (this.getDaysUntilDue() <= 1) {
      reasons.push("Vence pronto");
    }

    if (this.outstandingFines > 0) {
      reasons.push(
        `Multas pendientes: $${this.outstandingFines.toLocaleString()}`
      );
    }

    if (this.requiresPhysicalInspection) {
      reasons.push("Requiere inspección física");
    }

    if (this.status === LoanStatus.LOST) {
      reasons.push("Libro reportado como perdido");
    }

    if (this.status === LoanStatus.DAMAGED) {
      reasons.push("Libro reportado como dañado");
    }

    return reasons;
  }

  updateStatus(): void {
    if (this.isReturned) {
      this.status = LoanStatus.RETURNED;
    } else if (this.isOverdue()) {
      this.status = LoanStatus.OVERDUE;
    } else if (this.renewalsCount > 0) {
      this.status = LoanStatus.RENEWED;
    } else {
      this.status = LoanStatus.ACTIVE;
    }
  }
}
