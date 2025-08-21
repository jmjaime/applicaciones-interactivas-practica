import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Event } from "./Event";
import { Attendee } from "./Attendee";

export enum TicketType {
  GENERAL = "general",
  VIP = "vip",
  EARLY_BIRD = "early_bird",
  STUDENT = "student",
  SENIOR = "senior",
  GROUP = "group",
  CORPORATE = "corporate",
  PRESS = "press",
  COMPLIMENTARY = "complimentary",
}

export enum TicketStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  USED = "used",
  EXPIRED = "expired",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  ticketNumber: string;

  @Column({
    type: "varchar",
    length: 20,
    default: TicketType.GENERAL,
  })
  type: TicketType;

  @Column({
    type: "varchar",
    length: 20,
    default: TicketStatus.PENDING,
  })
  status: TicketStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  discountAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  finalPrice: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  discountCode?: string;

  @Column({ type: "datetime", nullable: false })
  purchaseDate: Date;

  @Column({ type: "datetime", nullable: true })
  usedDate?: Date;

  @Column({ type: "datetime", nullable: true })
  expirationDate?: Date;

  @Column({ type: "boolean", default: false })
  isUsed: boolean;

  @Column({ type: "boolean", default: false })
  isRefunded: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  paymentMethod?: string; // 'credit_card', 'debit_card', 'paypal', 'bank_transfer', etc.

  @Column({ type: "varchar", length: 100, nullable: true })
  paymentTransactionId?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  seatNumber?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  section?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  row?: string;

  @Column({ type: "json", nullable: true })
  specialRequests?: string[]; // ['wheelchair_access', 'dietary_restrictions', 'parking', etc.]

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  qrCode?: string; // QR code for ticket validation

  @Column({ type: "varchar", length: 255, nullable: true })
  barcodeData?: string;

  @Column({ type: "boolean", default: false })
  isTransferable: boolean;

  @Column({ type: "boolean", default: false })
  isRefundable: boolean;

  @Column({ type: "datetime", nullable: true })
  refundDeadline?: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  downloadUrl?: string; // URL to download the ticket

  @Column({ type: "boolean", default: false })
  isEmailSent: boolean;

  @Column({ type: "datetime", nullable: true })
  emailSentDate?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  emailOpenCount: number;

  @Column({ type: "json", nullable: true })
  metadata?: {
    purchaseSource?: string; // 'website', 'mobile_app', 'phone', 'box_office'
    referralCode?: string;
    campaignId?: string;
    userAgent?: string;
    ipAddress?: string;
  };

  // ===== RELACIONES CON LAZY LOADING =====

  /**
   * Relación Many-to-One con Event
   * LAZY LOADING: No se carga automáticamente
   */
  @ManyToOne(() => Event, (event) => event.tickets, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "eventId" })
  event: Event;

  /**
   * Relación Many-to-One con Attendee
   * LAZY LOADING: No se carga automáticamente
   */
  @ManyToOne(() => Attendee, (attendee) => attendee.tickets, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "attendeeId" })
  attendee: Attendee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    ticketNumber?: string,
    type?: TicketType,
    price?: number,
    event?: Event,
    attendee?: Attendee
  ) {
    this.ticketNumber = ticketNumber || this.generateTicketNumber();
    this.type = type || TicketType.GENERAL;
    this.price = price || 0;
    this.finalPrice = this.price;
    this.purchaseDate = new Date();
    this.event = event!;
    this.attendee = attendee!;
  }

  // ===== MÉTODOS UTILITARIOS =====

  private generateTicketNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `TKT-${timestamp}-${random}`.toUpperCase();
  }

  getTypeDisplayName(): string {
    const typeNames: Record<TicketType, string> = {
      [TicketType.GENERAL]: "General",
      [TicketType.VIP]: "VIP",
      [TicketType.EARLY_BIRD]: "Early Bird",
      [TicketType.STUDENT]: "Estudiante",
      [TicketType.SENIOR]: "Adulto Mayor",
      [TicketType.GROUP]: "Grupo",
      [TicketType.CORPORATE]: "Corporativo",
      [TicketType.PRESS]: "Prensa",
      [TicketType.COMPLIMENTARY]: "Cortesía",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<TicketStatus, string> = {
      [TicketStatus.PENDING]: "Pendiente",
      [TicketStatus.CONFIRMED]: "Confirmado",
      [TicketStatus.CANCELLED]: "Cancelado",
      [TicketStatus.REFUNDED]: "Reembolsado",
      [TicketStatus.USED]: "Usado",
      [TicketStatus.EXPIRED]: "Expirado",
    };
    return statusNames[this.status];
  }

  getPaymentStatusDisplayName(): string {
    const statusNames: Record<PaymentStatus, string> = {
      [PaymentStatus.PENDING]: "Pendiente",
      [PaymentStatus.COMPLETED]: "Completado",
      [PaymentStatus.FAILED]: "Fallido",
      [PaymentStatus.REFUNDED]: "Reembolsado",
    };
    return statusNames[this.paymentStatus];
  }

  getFullTicketInfo(): string {
    return `${
      this.ticketNumber
    } - ${this.getTypeDisplayName()} - ${this.getStatusDisplayName()}`;
  }

  calculateDiscount(
    discountPercentage: number,
    maxDiscountAmount?: number
  ): void {
    let discount = (this.price * discountPercentage) / 100;

    if (maxDiscountAmount && discount > maxDiscountAmount) {
      discount = maxDiscountAmount;
    }

    this.discountAmount = discount;
    this.finalPrice = this.price - discount;
  }

  applyDiscountCode(code: string, discountPercentage: number): void {
    this.discountCode = code;
    this.calculateDiscount(discountPercentage);
  }

  getPriceFormatted(): string {
    return `$${this.price.toLocaleString()}`;
  }

  getFinalPriceFormatted(): string {
    return `$${this.finalPrice.toLocaleString()}`;
  }

  getDiscountAmountFormatted(): string {
    return this.discountAmount > 0
      ? `$${this.discountAmount.toLocaleString()}`
      : "Sin descuento";
  }

  getSavingsFormatted(): string {
    return this.discountAmount > 0
      ? `Ahorro: ${this.getDiscountAmountFormatted()}`
      : "";
  }

  hasDiscount(): boolean {
    return this.discountAmount > 0;
  }

  isValid(): boolean {
    return (
      this.status === TicketStatus.CONFIRMED &&
      this.paymentStatus === PaymentStatus.COMPLETED &&
      !this.isUsed &&
      !this.isExpired()
    );
  }

  isExpired(): boolean {
    if (!this.expirationDate) return false;
    return new Date() > this.expirationDate;
  }

  canBeUsed(): boolean {
    return this.isValid() && !this.isExpired();
  }

  canBeRefunded(): boolean {
    return (
      this.isRefundable &&
      this.status === TicketStatus.CONFIRMED &&
      this.paymentStatus === PaymentStatus.COMPLETED &&
      !this.isUsed &&
      !this.isRefunded &&
      (!this.refundDeadline || new Date() <= this.refundDeadline)
    );
  }

  canBeTransferred(): boolean {
    return (
      this.isTransferable &&
      this.status === TicketStatus.CONFIRMED &&
      !this.isUsed &&
      !this.isExpired()
    );
  }

  addSpecialRequest(request: string): void {
    if (!this.specialRequests) {
      this.specialRequests = [];
    }
    if (!this.specialRequests.includes(request)) {
      this.specialRequests.push(request);
    }
  }

  removeSpecialRequest(request: string): void {
    if (this.specialRequests) {
      this.specialRequests = this.specialRequests.filter(
        (req) => req !== request
      );
    }
  }

  hasSpecialRequest(request: string): boolean {
    return this.specialRequests
      ? this.specialRequests.includes(request)
      : false;
  }

  getSpecialRequestsString(): string {
    return this.specialRequests && this.specialRequests.length > 0
      ? this.specialRequests.join(", ")
      : "Sin solicitudes especiales";
  }

  setSeatInfo(seatNumber: string, section?: string, row?: string): void {
    this.seatNumber = seatNumber;
    this.section = section;
    this.row = row;
  }

  getSeatInfo(): string {
    if (!this.seatNumber) return "Sin asiento asignado";

    const parts = [this.seatNumber];
    if (this.section) parts.push(`Sección: ${this.section}`);
    if (this.row) parts.push(`Fila: ${this.row}`);

    return parts.join(" - ");
  }

  generateQRCode(): string {
    // En un caso real, esto generaría un QR code válido
    const qrData = `${this.ticketNumber}|${this.event.id}|${
      this.attendee.id
    }|${this.purchaseDate.getTime()}`;
    this.qrCode = `qr_${Buffer.from(qrData).toString("base64").substr(0, 20)}`;
    return this.qrCode;
  }

  generateBarcode(): string {
    // En un caso real, esto generaría un código de barras válido
    const barcodeData = `${this.ticketNumber}${this.event.id}${this.attendee.id}`;
    this.barcodeData = barcodeData.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return this.barcodeData;
  }

  confirm(): void {
    this.status = TicketStatus.CONFIRMED;
    this.paymentStatus = PaymentStatus.COMPLETED;
  }

  cancel(): void {
    this.status = TicketStatus.CANCELLED;
  }

  use(): void {
    if (this.canBeUsed()) {
      this.status = TicketStatus.USED;
      this.isUsed = true;
      this.usedDate = new Date();
    }
  }

  refund(): void {
    if (this.canBeRefunded()) {
      this.status = TicketStatus.REFUNDED;
      this.paymentStatus = PaymentStatus.REFUNDED;
      this.isRefunded = true;
    }
  }

  markAsExpired(): void {
    this.status = TicketStatus.EXPIRED;
  }

  sendEmail(): void {
    this.isEmailSent = true;
    this.emailSentDate = new Date();
  }

  trackEmailOpen(): void {
    this.emailOpenCount++;
  }

  setMetadata(metadata: {
    purchaseSource?: string;
    referralCode?: string;
    campaignId?: string;
    userAgent?: string;
    ipAddress?: string;
  }): void {
    this.metadata = { ...this.metadata, ...metadata };
  }

  getMetadataValue(key: string): string | undefined {
    return this.metadata?.[key as keyof typeof this.metadata];
  }

  getPurchaseSource(): string {
    return this.getMetadataValue("purchaseSource") || "Desconocido";
  }

  hasReferralCode(): boolean {
    return !!this.getMetadataValue("referralCode");
  }

  getReferralCode(): string | undefined {
    return this.getMetadataValue("referralCode");
  }

  getDaysSincePurchase(): number {
    const diff = new Date().getTime() - this.purchaseDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  getDaysUntilExpiration(): number | null {
    if (!this.expirationDate) return null;

    const diff = this.expirationDate.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  isRecentPurchase(): boolean {
    return this.getDaysSincePurchase() <= 7;
  }

  getEmailEngagement(): string {
    if (!this.isEmailSent) return "Email no enviado";
    if (this.emailOpenCount === 0) return "No abierto";
    return `Abierto ${this.emailOpenCount} veces`;
  }

  getTicketSummary(): string {
    return `${
      this.ticketNumber
    } - ${this.getTypeDisplayName()} - ${this.getFinalPriceFormatted()} - ${this.getStatusDisplayName()}`;
  }

  getTicketDetails(): string {
    const details = [
      `Ticket: ${this.ticketNumber}`,
      `Tipo: ${this.getTypeDisplayName()}`,
      `Precio: ${this.getFinalPriceFormatted()}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `Pago: ${this.getPaymentStatusDisplayName()}`,
    ];

    if (this.hasDiscount()) {
      details.push(`Descuento: ${this.getDiscountAmountFormatted()}`);
    }

    if (this.seatNumber) {
      details.push(`Asiento: ${this.getSeatInfo()}`);
    }

    return details.join(" | ");
  }
}
