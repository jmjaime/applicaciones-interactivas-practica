import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { TicketEager } from "./TicketEager";

export enum AttendeeType {
  INDIVIDUAL = "individual",
  CORPORATE = "corporate",
  STUDENT = "student",
  SENIOR = "senior",
  PRESS = "press",
  VIP = "vip",
  SPEAKER = "speaker",
  ORGANIZER = "organizer",
}

export enum AttendeeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  PENDING = "pending",
}

@Entity("attendee_eager")
export class AttendeeEager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  firstName: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({
    type: "varchar",
    length: 20,
    default: AttendeeType.INDIVIDUAL,
  })
  type: AttendeeType;

  @Column({
    type: "varchar",
    length: 20,
    default: AttendeeStatus.ACTIVE,
  })
  status: AttendeeStatus;

  @Column({ length: 100, nullable: true })
  company?: string;

  @Column({ length: 100, nullable: true })
  jobTitle?: string;

  @Column({ length: 100, nullable: true })
  industry?: string;

  @Column({ length: 200, nullable: true })
  address?: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ type: "json", nullable: true })
  interests?: string[];

  @Column({ type: "json", nullable: true })
  preferences?: {
    communicationMethod?: string;
    eventNotifications?: boolean;
    marketingEmails?: boolean;
    language?: string;
  };

  @Column({ type: "boolean", default: false })
  isVip: boolean;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalEventsAttended: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalTicketsPurchased: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  totalAmountSpent: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  profileImage?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "json", nullable: true })
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };

  @Column({ type: "boolean", default: false })
  isNewsletterSubscribed: boolean;

  @Column({ type: "datetime", nullable: true })
  lastLoginDate?: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  loyaltyTier?: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  loyaltyPoints: number;

  // ===== RELACIONES CON EAGER LOADING =====

  /**
   * Relación One-to-Many con TicketEager
   * EAGER LOADING: Se carga automáticamente
   */
  @OneToMany(() => TicketEager, (ticket) => ticket.attendee, {
    cascade: true,
    eager: true, // ← EAGER LOADING ACTIVADO
  })
  tickets: TicketEager[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(firstName?: string, lastName?: string, email?: string) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.email = email || "";
    this.tickets = [];
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<AttendeeType, string> = {
      [AttendeeType.INDIVIDUAL]: "Individual",
      [AttendeeType.CORPORATE]: "Corporativo",
      [AttendeeType.STUDENT]: "Estudiante",
      [AttendeeType.SENIOR]: "Adulto Mayor",
      [AttendeeType.PRESS]: "Prensa",
      [AttendeeType.VIP]: "VIP",
      [AttendeeType.SPEAKER]: "Ponente",
      [AttendeeType.ORGANIZER]: "Organizador",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<AttendeeStatus, string> = {
      [AttendeeStatus.ACTIVE]: "Activo",
      [AttendeeStatus.INACTIVE]: "Inactivo",
      [AttendeeStatus.BLOCKED]: "Bloqueado",
      [AttendeeStatus.PENDING]: "Pendiente",
    };
    return statusNames[this.status];
  }

  getFullInfo(): string {
    return `${this.getFullName()} (${this.getTypeDisplayName()})`;
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

  isMinor(): boolean {
    const age = this.calculateAge();
    return age !== null && age < 18;
  }

  isSenior(): boolean {
    const age = this.calculateAge();
    return age !== null && age >= 65;
  }

  addInterest(interest: string): void {
    if (!this.interests) {
      this.interests = [];
    }
    if (!this.interests.includes(interest)) {
      this.interests.push(interest);
    }
  }

  removeInterest(interest: string): void {
    if (this.interests) {
      this.interests = this.interests.filter((i) => i !== interest);
    }
  }

  hasInterest(interest: string): boolean {
    return this.interests ? this.interests.includes(interest) : false;
  }

  getInterestsString(): string {
    return this.interests && this.interests.length > 0
      ? this.interests.join(", ")
      : "Sin intereses especificados";
  }

  updatePreferences(newPreferences: {
    communicationMethod?: string;
    eventNotifications?: boolean;
    marketingEmails?: boolean;
    language?: string;
  }): void {
    this.preferences = { ...this.preferences, ...newPreferences };
  }

  setProfessionalInfo(
    company: string,
    jobTitle: string,
    industry?: string
  ): void {
    this.company = company;
    this.jobTitle = jobTitle;
    if (industry) {
      this.industry = industry;
    }
  }

  getProfessionalInfo(): string {
    const parts = [];
    if (this.jobTitle) parts.push(this.jobTitle);
    if (this.company) parts.push(this.company);
    if (this.industry) parts.push(this.industry);
    return parts.length > 0 ? parts.join(" - ") : "Sin información profesional";
  }

  setSocialMedia(platform: string, url: string): void {
    if (!this.socialMedia) {
      this.socialMedia = {};
    }
    this.socialMedia[platform as keyof typeof this.socialMedia] = url;
  }

  getSocialMediaString(): string {
    if (!this.socialMedia) return "Sin redes sociales";

    const platforms = Object.entries(this.socialMedia)
      .filter(([_, url]) => url)
      .map(([platform, _]) => platform);

    return platforms.length > 0 ? platforms.join(", ") : "Sin redes sociales";
  }

  subscribeToNewsletter(): void {
    this.isNewsletterSubscribed = true;
  }

  unsubscribeFromNewsletter(): void {
    this.isNewsletterSubscribed = false;
  }

  updateLastLogin(): void {
    this.lastLoginDate = new Date();
  }

  isRecentlyActive(): boolean {
    if (!this.lastLoginDate) return false;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return this.lastLoginDate > thirtyDaysAgo;
  }

  promoteToVip(): void {
    this.isVip = true;
    this.type = AttendeeType.VIP;
  }

  removeVipStatus(): void {
    this.isVip = false;
    if (this.type === AttendeeType.VIP) {
      this.type = AttendeeType.INDIVIDUAL;
    }
  }

  addLoyaltyPoints(points: number): void {
    this.loyaltyPoints += points;
    this.updateLoyaltyTier();
  }

  redeemLoyaltyPoints(points: number): boolean {
    if (this.loyaltyPoints >= points) {
      this.loyaltyPoints -= points;
      this.updateLoyaltyTier();
      return true;
    }
    return false;
  }

  private updateLoyaltyTier(): void {
    if (this.loyaltyPoints >= 1000) {
      this.loyaltyTier = "platinum";
    } else if (this.loyaltyPoints >= 500) {
      this.loyaltyTier = "gold";
    } else if (this.loyaltyPoints >= 100) {
      this.loyaltyTier = "silver";
    } else {
      this.loyaltyTier = "bronze";
    }
  }

  getLoyaltyTierDisplayName(): string {
    const tierNames: Record<string, string> = {
      bronze: "Bronce",
      silver: "Plata",
      gold: "Oro",
      platinum: "Platino",
    };
    return this.loyaltyTier
      ? tierNames[this.loyaltyTier] || "Sin tier"
      : "Sin tier";
  }

  recordEventAttendance(): void {
    this.totalEventsAttended++;
    this.addLoyaltyPoints(10);
  }

  recordTicketPurchase(amount: number): void {
    this.totalTicketsPurchased++;
    this.totalAmountSpent += amount;
    this.addLoyaltyPoints(Math.floor(amount / 100));
  }

  getAverageTicketPrice(): number {
    return this.totalTicketsPurchased > 0
      ? this.totalAmountSpent / this.totalTicketsPurchased
      : 0;
  }

  isFrequentAttendee(): boolean {
    return this.totalEventsAttended >= 5;
  }

  isHighValueCustomer(): boolean {
    return this.totalAmountSpent >= 5000;
  }

  activate(): void {
    this.status = AttendeeStatus.ACTIVE;
    this.isActive = true;
  }

  deactivate(): void {
    this.status = AttendeeStatus.INACTIVE;
    this.isActive = false;
  }

  block(): void {
    this.status = AttendeeStatus.BLOCKED;
    this.isActive = false;
  }

  setPending(): void {
    this.status = AttendeeStatus.PENDING;
  }

  getContactInfo(): string {
    const contact = [this.email];
    if (this.phone) contact.push(this.phone);
    return contact.join(" | ");
  }

  getLocationInfo(): string {
    const location = [];
    if (this.city) location.push(this.city);
    if (this.country) location.push(this.country);
    return location.length > 0
      ? location.join(", ")
      : "Ubicación no especificada";
  }

  getAttendeeStats(): string {
    return `${this.getFullName()} - Eventos: ${
      this.totalEventsAttended
    } - Tickets: ${
      this.totalTicketsPurchased
    } - Gastado: $${this.totalAmountSpent.toLocaleString()} - Tier: ${this.getLoyaltyTierDisplayName()}`;
  }

  getAttendeeSummary(): string {
    return `${this.getFullName()} (${this.getTypeDisplayName()}) - ${
      this.email
    } - ${this.getLocationInfo()} - ${this.getLoyaltyTierDisplayName()}`;
  }

  // ===== MÉTODOS ESPECÍFICOS PARA EAGER LOADING =====

  /**
   * Con eager loading, los tickets ya están cargados
   * No necesitamos hacer consultas adicionales
   */
  getTicketCount(): number {
    return this.tickets.length;
  }

  getConfirmedTickets(): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.status === "confirmed");
  }

  getConfirmedTicketsCount(): number {
    return this.getConfirmedTickets().length;
  }

  getPendingTickets(): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.status === "pending");
  }

  getPendingTicketsCount(): number {
    return this.getPendingTickets().length;
  }

  getUsedTickets(): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.isUsed);
  }

  getUsedTicketsCount(): number {
    return this.getUsedTickets().length;
  }

  getTicketsByType(type: string): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.type === type);
  }

  getTicketsByTypeCount(type: string): number {
    return this.getTicketsByType(type).length;
  }

  getVipTickets(): TicketEager[] {
    return this.getTicketsByType("vip");
  }

  getVipTicketsCount(): number {
    return this.getVipTickets().length;
  }

  getTotalSpentFromTickets(): number {
    return this.tickets
      .filter((ticket) => ticket.paymentStatus === "completed")
      .reduce((total, ticket) => total + ticket.finalPrice, 0);
  }

  getTotalSpentFromTicketsFormatted(): string {
    return `$${this.getTotalSpentFromTickets().toLocaleString()}`;
  }

  getAverageTicketPriceFromTickets(): number {
    const paidTickets = this.tickets.filter(
      (ticket) => ticket.paymentStatus === "completed"
    );
    if (paidTickets.length === 0) return 0;

    const total = paidTickets.reduce(
      (sum, ticket) => sum + ticket.finalPrice,
      0
    );
    return total / paidTickets.length;
  }

  getTicketsWithDiscount(): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.discountAmount > 0);
  }

  getTicketsWithDiscountCount(): number {
    return this.getTicketsWithDiscount().length;
  }

  getTotalSavingsFromDiscounts(): number {
    return this.tickets.reduce(
      (total, ticket) => total + ticket.discountAmount,
      0
    );
  }

  getTotalSavingsFromDiscountsFormatted(): string {
    return `$${this.getTotalSavingsFromDiscounts().toLocaleString()}`;
  }

  getRecentTickets(days: number = 30): TicketEager[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.tickets.filter((ticket) => ticket.purchaseDate > cutoffDate);
  }

  getRecentTicketsCount(days: number = 30): number {
    return this.getRecentTickets(days).length;
  }

  getUpcomingEvents(): TicketEager[] {
    // Asumiendo que tenemos acceso al evento a través del ticket
    return this.tickets.filter(
      (ticket) => ticket.event && ticket.event.startDate > new Date()
    );
  }

  getUpcomingEventsCount(): number {
    return this.getUpcomingEvents().length;
  }

  getAttendeeWithEagerData(): string {
    const parts = [
      `Attendee: ${this.getFullName()}`,
      `Email: ${this.email}`,
      `Tipo: ${this.getTypeDisplayName()}`,
      `Tickets: ${this.getTicketCount()}`,
      `Confirmados: ${this.getConfirmedTicketsCount()}`,
      `VIP: ${this.getVipTicketsCount()}`,
      `Gastado: ${this.getTotalSpentFromTicketsFormatted()}`,
      `Ahorros: ${this.getTotalSavingsFromDiscountsFormatted()}`,
      `Tier: ${this.getLoyaltyTierDisplayName()}`,
    ];

    return parts.join(" | ");
  }
}
