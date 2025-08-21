import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Member } from "./Member";
import { Fine } from "./Fine";

export enum PaymentMethod {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  BANK_TRANSFER = "bank_transfer",
  CHECK = "check",
  ONLINE = "online",
  MOBILE_PAYMENT = "mobile_payment",
  VOUCHER = "voucher",
  WAIVER = "waiver",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  DISPUTED = "disputed",
  PROCESSING = "processing",
}

export enum PaymentType {
  FINE_PAYMENT = "fine_payment",
  MEMBERSHIP_FEE = "membership_fee",
  DEPOSIT = "deposit",
  REFUND = "refund",
  ADJUSTMENT = "adjustment",
  PENALTY = "penalty",
  SERVICE_FEE = "service_fee",
  REPLACEMENT_COST = "replacement_cost",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  paymentNumber: string;

  @Column({ length: 100, nullable: true })
  transactionId?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  method: PaymentMethod;

  @Column({
    type: "varchar",
    length: 20,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: PaymentType.FINE_PAYMENT,
  })
  type: PaymentType;

  @Column({ type: "datetime", nullable: false })
  paymentDate: Date;

  @Column({ type: "datetime", nullable: true })
  processedDate?: Date;

  @Column({ type: "datetime", nullable: true })
  completedDate?: Date;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  reference?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  processedBy?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  authorizedBy?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  processingFee: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  refundAmount: number;

  @Column({ type: "datetime", nullable: true })
  refundDate?: Date;

  @Column({ type: "text", nullable: true })
  refundReason?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  refundedBy?: string;

  @Column({ type: "boolean", default: false })
  isRefunded: boolean;

  @Column({ type: "boolean", default: false })
  isRecurring: boolean;

  @Column({ type: "boolean", default: false })
  isAuthorized: boolean;

  @Column({ type: "boolean", default: false })
  requiresApproval: boolean;

  @Column({ type: "boolean", default: false })
  isApproved: boolean;

  @Column({ type: "datetime", nullable: true })
  approvedDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  approvedBy?: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.0 })
  taxRate: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  taxAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  netAmount: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  receiptNumber?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  receiptUrl?: string;

  @Column({ type: "json", nullable: true })
  paymentDetails?: {
    cardLast4?: string;
    cardType?: string;
    bankName?: string;
    accountNumber?: string;
    checkNumber?: string;
    authorizationCode?: string;
    gatewayResponse?: string;
  };

  @Column({ type: "json", nullable: true })
  verificationDetails?: {
    ipAddress?: string;
    userAgent?: string;
    deviceFingerprint?: string;
    location?: string;
  };

  @Column({ type: "boolean", default: false })
  isDisputed: boolean;

  @Column({ type: "text", nullable: true })
  disputeReason?: string;

  @Column({ type: "datetime", nullable: true })
  disputeDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  disputedBy?: string;

  @Column({ type: "datetime", nullable: true })
  disputeResolvedDate?: Date;

  @Column({ type: "boolean", default: false })
  isReconciled: boolean;

  @Column({ type: "datetime", nullable: true })
  reconciledDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  reconciledBy?: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  retryCount: number;

  @Column({ type: "int", unsigned: true, default: 3 })
  maxRetries: number;

  @Column({ type: "datetime", nullable: true })
  lastRetryDate?: Date;

  @Column({ type: "datetime", nullable: true })
  nextRetryDate?: Date;

  @Column({ type: "text", nullable: true })
  failureReason?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "varchar", length: 10, default: "USD" })
  currency: string;

  @Column({ type: "decimal", precision: 10, scale: 6, default: 1.0 })
  exchangeRate: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  originalAmount: number; // Monto en moneda original

  @Column({ type: "varchar", length: 10, nullable: true })
  originalCurrency?: string;

  // ===== RELACIONES =====

  @ManyToOne(() => Member, (member) => member.payments, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: "memberId" })
  member: Member;

  @Column({ type: "int", unsigned: true, nullable: false })
  memberId: number;

  @ManyToOne(() => Fine, (fine) => fine.payments, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: "fineId" })
  fine?: Fine;

  @Column({ type: "int", unsigned: true, nullable: true })
  fineId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    member?: Member,
    amount?: number,
    method?: PaymentMethod,
    type?: PaymentType,
    fine?: Fine
  ) {
    this.member = member!;
    this.amount = amount || 0;
    this.method = method || PaymentMethod.CASH;
    this.type = type || PaymentType.FINE_PAYMENT;
    this.fine = fine;
    this.paymentNumber = this.generatePaymentNumber();
    this.paymentDate = new Date();
    this.netAmount = this.amount;
    this.originalAmount = this.amount;
  }

  // ===== MÉTODOS UTILITARIOS =====

  private generatePaymentNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `PAY-${timestamp}-${random}`.toUpperCase();
  }

  private generateReceiptNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 3);
    return `REC-${timestamp}-${random}`.toUpperCase();
  }

  getMethodDisplayName(): string {
    const methodNames: Record<PaymentMethod, string> = {
      [PaymentMethod.CASH]: "Efectivo",
      [PaymentMethod.CREDIT_CARD]: "Tarjeta de Crédito",
      [PaymentMethod.DEBIT_CARD]: "Tarjeta de Débito",
      [PaymentMethod.BANK_TRANSFER]: "Transferencia Bancaria",
      [PaymentMethod.CHECK]: "Cheque",
      [PaymentMethod.ONLINE]: "Pago en Línea",
      [PaymentMethod.MOBILE_PAYMENT]: "Pago Móvil",
      [PaymentMethod.VOUCHER]: "Cupón",
      [PaymentMethod.WAIVER]: "Condonación",
    };
    return methodNames[this.method];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<PaymentStatus, string> = {
      [PaymentStatus.PENDING]: "Pendiente",
      [PaymentStatus.COMPLETED]: "Completado",
      [PaymentStatus.FAILED]: "Fallido",
      [PaymentStatus.CANCELLED]: "Cancelado",
      [PaymentStatus.REFUNDED]: "Reembolsado",
      [PaymentStatus.DISPUTED]: "En Disputa",
      [PaymentStatus.PROCESSING]: "Procesando",
    };
    return statusNames[this.status];
  }

  getTypeDisplayName(): string {
    const typeNames: Record<PaymentType, string> = {
      [PaymentType.FINE_PAYMENT]: "Pago de Multa",
      [PaymentType.MEMBERSHIP_FEE]: "Cuota de Membresía",
      [PaymentType.DEPOSIT]: "Depósito",
      [PaymentType.REFUND]: "Reembolso",
      [PaymentType.ADJUSTMENT]: "Ajuste",
      [PaymentType.PENALTY]: "Penalidad",
      [PaymentType.SERVICE_FEE]: "Tarifa de Servicio",
      [PaymentType.REPLACEMENT_COST]: "Costo de Reemplazo",
    };
    return typeNames[this.type];
  }

  isCompleted(): boolean {
    return this.status === PaymentStatus.COMPLETED;
  }

  isPending(): boolean {
    return this.status === PaymentStatus.PENDING;
  }

  isFailed(): boolean {
    return this.status === PaymentStatus.FAILED;
  }

  canBeRetried(): boolean {
    return (
      this.isFailed() && this.retryCount < this.maxRetries && this.isActive
    );
  }

  canBeRefunded(): boolean {
    return this.isCompleted() && !this.isRefunded && this.amount > 0;
  }

  canBeCancelled(): boolean {
    return this.isPending() && !this.isProcessing();
  }

  canBeDisputed(): boolean {
    return this.isCompleted() && !this.isDisputed && !this.isRefunded;
  }

  isProcessing(): boolean {
    return this.status === PaymentStatus.PROCESSING;
  }

  process(processedBy?: string): boolean {
    if (!this.isPending()) return false;

    this.status = PaymentStatus.PROCESSING;
    this.processedDate = new Date();
    this.processedBy = processedBy;

    return true;
  }

  complete(transactionId?: string, authorizationCode?: string): boolean {
    if (!this.isProcessing() && !this.isPending()) return false;

    this.status = PaymentStatus.COMPLETED;
    this.completedDate = new Date();
    this.transactionId = transactionId;
    this.receiptNumber = this.generateReceiptNumber();
    this.isAuthorized = true;

    if (authorizationCode) {
      this.paymentDetails = {
        ...this.paymentDetails,
        authorizationCode,
      };
    }

    // Actualizar la multa si existe
    if (this.fine) {
      this.fine.makePayment(
        this.amount,
        this.getMethodDisplayName(),
        this.reference,
        this.processedBy
      );
    }

    return true;
  }

  fail(reason: string): boolean {
    if (this.isCompleted()) return false;

    this.status = PaymentStatus.FAILED;
    this.failureReason = reason;
    this.lastRetryDate = new Date();

    return true;
  }

  cancel(reason?: string): boolean {
    if (!this.canBeCancelled()) return false;

    this.status = PaymentStatus.CANCELLED;
    this.notes =
      (this.notes || "") +
      `\nCancelado: ${
        reason || "Sin razón específica"
      } - ${new Date().toLocaleDateString()}`;

    return true;
  }

  retry(): boolean {
    if (!this.canBeRetried()) return false;

    this.retryCount++;
    this.status = PaymentStatus.PENDING;
    this.lastRetryDate = new Date();
    this.failureReason = undefined;

    // Calcular próximo intento
    const delayMinutes = Math.pow(2, this.retryCount) * 5; // Backoff exponencial
    this.nextRetryDate = new Date(Date.now() + delayMinutes * 60 * 1000);

    return true;
  }

  refund(amount: number, reason: string, refundedBy?: string): boolean {
    if (!this.canBeRefunded() || amount <= 0 || amount > this.amount)
      return false;

    this.refundAmount = amount;
    this.refundReason = reason;
    this.refundedBy = refundedBy;
    this.refundDate = new Date();
    this.isRefunded = true;

    if (amount === this.amount) {
      this.status = PaymentStatus.REFUNDED;
    }

    return true;
  }

  refundFully(reason: string, refundedBy?: string): boolean {
    return this.refund(this.amount, reason, refundedBy);
  }

  dispute(reason: string, disputedBy?: string): boolean {
    if (!this.canBeDisputed()) return false;

    this.isDisputed = true;
    this.disputeReason = reason;
    this.disputeDate = new Date();
    this.disputedBy = disputedBy;
    this.status = PaymentStatus.DISPUTED;

    return true;
  }

  resolveDispute(inFavorOfMember: boolean, reason?: string): boolean {
    if (!this.isDisputed) return false;

    this.isDisputed = false;
    this.disputeResolvedDate = new Date();

    if (inFavorOfMember) {
      // Reembolso por disputa
      this.refund(
        this.amount,
        reason || "Disputa resuelta a favor del miembro"
      );
    } else {
      // Mantener el pago
      this.status = PaymentStatus.COMPLETED;
    }

    return true;
  }

  approve(approvedBy?: string): boolean {
    if (!this.requiresApproval || this.isApproved) return false;

    this.isApproved = true;
    this.approvedBy = approvedBy;
    this.approvedDate = new Date();

    return true;
  }

  reconcile(reconciledBy?: string): boolean {
    if (!this.isCompleted() || this.isReconciled) return false;

    this.isReconciled = true;
    this.reconciledDate = new Date();
    this.reconciledBy = reconciledBy;

    return true;
  }

  calculateTax(rate: number): void {
    this.taxRate = rate;
    this.taxAmount = this.amount * (rate / 100);
    this.netAmount = this.amount - this.taxAmount;
  }

  addProcessingFee(fee: number): void {
    this.processingFee = fee;
    this.netAmount = this.amount - this.processingFee;
  }

  setPaymentDetails(details: {
    cardLast4?: string;
    cardType?: string;
    bankName?: string;
    accountNumber?: string;
    checkNumber?: string;
    authorizationCode?: string;
    gatewayResponse?: string;
  }): void {
    this.paymentDetails = { ...this.paymentDetails, ...details };
  }

  setVerificationDetails(details: {
    ipAddress?: string;
    userAgent?: string;
    deviceFingerprint?: string;
    location?: string;
  }): void {
    this.verificationDetails = { ...this.verificationDetails, ...details };
  }

  getProcessingTime(): number {
    if (!this.processedDate) return 0;
    return this.processedDate.getTime() - this.paymentDate.getTime();
  }

  getCompletionTime(): number {
    if (!this.completedDate) return 0;
    return this.completedDate.getTime() - this.paymentDate.getTime();
  }

  getAgeInDays(): number {
    return Math.floor(
      (new Date().getTime() - this.paymentDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  getNetAmount(): number {
    return this.netAmount;
  }

  getRefundableAmount(): number {
    return Math.max(0, this.amount - this.refundAmount);
  }

  isCardPayment(): boolean {
    return (
      this.method === PaymentMethod.CREDIT_CARD ||
      this.method === PaymentMethod.DEBIT_CARD
    );
  }

  isElectronicPayment(): boolean {
    return (
      this.method === PaymentMethod.ONLINE ||
      this.method === PaymentMethod.MOBILE_PAYMENT ||
      this.method === PaymentMethod.BANK_TRANSFER ||
      this.isCardPayment()
    );
  }

  requiresPhysicalReceipt(): boolean {
    return (
      this.method === PaymentMethod.CASH || this.method === PaymentMethod.CHECK
    );
  }

  getBasicInfo(): string {
    return `${
      this.paymentNumber
    }: ${this.getMethodDisplayName()} - $${this.amount.toLocaleString()}`;
  }

  getDetailedInfo(): string {
    const parts = [
      `Pago: ${this.paymentNumber}`,
      `Monto: $${this.amount.toLocaleString()}`,
      `Método: ${this.getMethodDisplayName()}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `Fecha: ${this.paymentDate.toLocaleDateString()}`,
      `Tipo: ${this.getTypeDisplayName()}`,
    ];

    if (this.reference) {
      parts.push(`Referencia: ${this.reference}`);
    }

    if (this.fine) {
      parts.push(`Multa: ${this.fine.fineNumber}`);
    }

    return parts.join(" | ");
  }

  getStatusInfo(): string {
    if (this.isCompleted()) return "✅ Completado";
    if (this.isPending()) return "⏳ Pendiente";
    if (this.isProcessing()) return "🔄 Procesando";
    if (this.isFailed()) return `❌ Fallido: ${this.failureReason}`;
    if (this.status === PaymentStatus.CANCELLED) return "🚫 Cancelado";
    if (this.isRefunded) return "💰 Reembolsado";
    if (this.isDisputed) return "⚖️ En disputa";

    return `❓ ${this.getStatusDisplayName()}`;
  }

  getPaymentSummary(): {
    amount: number;
    processingFee: number;
    taxAmount: number;
    netAmount: number;
    refundAmount: number;
    refundableAmount: number;
  } {
    return {
      amount: this.amount,
      processingFee: this.processingFee,
      taxAmount: this.taxAmount,
      netAmount: this.netAmount,
      refundAmount: this.refundAmount,
      refundableAmount: this.getRefundableAmount(),
    };
  }

  getTimelineInfo(): string {
    const timeline = [];

    timeline.push(`📅 Iniciado: ${this.paymentDate.toLocaleDateString()}`);

    if (this.processedDate) {
      timeline.push(`🔄 Procesado: ${this.processedDate.toLocaleDateString()}`);
    }

    if (this.completedDate) {
      timeline.push(
        `✅ Completado: ${this.completedDate.toLocaleDateString()}`
      );
    }

    if (this.refundDate) {
      timeline.push(
        `💰 Reembolsado: ${this.refundDate.toLocaleDateString()} ($${this.refundAmount.toLocaleString()})`
      );
    }

    if (this.disputeDate) {
      timeline.push(`⚖️ Disputado: ${this.disputeDate.toLocaleDateString()}`);
    }

    if (this.disputeResolvedDate) {
      timeline.push(
        `🎯 Disputa resuelta: ${this.disputeResolvedDate.toLocaleDateString()}`
      );
    }

    return timeline.join("\n");
  }

  getSecurityInfo(): string {
    const parts = [];

    if (this.verificationDetails?.ipAddress) {
      parts.push(`IP: ${this.verificationDetails.ipAddress}`);
    }

    if (this.verificationDetails?.location) {
      parts.push(`Ubicación: ${this.verificationDetails.location}`);
    }

    if (this.paymentDetails?.cardLast4) {
      parts.push(`Tarjeta: ****${this.paymentDetails.cardLast4}`);
    }

    if (this.paymentDetails?.authorizationCode) {
      parts.push(`Autorización: ${this.paymentDetails.authorizationCode}`);
    }

    return parts.length > 0
      ? parts.join(" | ")
      : "Sin información de seguridad";
  }

  getReceiptInfo(): {
    receiptNumber?: string;
    receiptUrl?: string;
    canGenerateReceipt: boolean;
    requiresPhysicalReceipt: boolean;
  } {
    return {
      receiptNumber: this.receiptNumber,
      receiptUrl: this.receiptUrl,
      canGenerateReceipt: this.isCompleted(),
      requiresPhysicalReceipt: this.requiresPhysicalReceipt(),
    };
  }

  needsAttention(): boolean {
    return (
      this.isFailed() ||
      this.isDisputed ||
      (this.requiresApproval && !this.isApproved) ||
      (this.isPending() && this.getAgeInDays() > 1)
    );
  }

  getAttentionReasons(): string[] {
    const reasons = [];

    if (this.isFailed()) {
      reasons.push(`Pago fallido: ${this.failureReason}`);
    }

    if (this.isDisputed) {
      reasons.push("Pago en disputa");
    }

    if (this.requiresApproval && !this.isApproved) {
      reasons.push("Requiere aprobación");
    }

    if (this.isPending() && this.getAgeInDays() > 1) {
      reasons.push("Pago pendiente por más de 1 día");
    }

    return reasons;
  }

  getRelatedInfo(): string {
    const parts = [];

    parts.push(`Miembro: ${this.member.getFullName()}`);

    if (this.fine) {
      parts.push(
        `Multa: ${this.fine.fineNumber} (${this.fine.getTypeDisplayName()})`
      );
    }

    if (this.transactionId) {
      parts.push(`Transacción: ${this.transactionId}`);
    }

    return parts.join(" | ");
  }

  getCurrencyInfo(): string {
    if (this.originalCurrency && this.originalCurrency !== this.currency) {
      return `${this.originalAmount.toLocaleString()} ${
        this.originalCurrency
      } (${this.amount.toLocaleString()} ${this.currency})`;
    }

    return `${this.amount.toLocaleString()} ${this.currency}`;
  }
}
