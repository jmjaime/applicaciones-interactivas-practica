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
import { VenueEager } from "./VenueEager";
import { TicketEager } from "./TicketEager";

export enum EventType {
  CONCERT = "concert",
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  SEMINAR = "seminar",
  FESTIVAL = "festival",
  EXHIBITION = "exhibition",
  THEATER = "theater",
  SPORTS = "sports",
  NETWORKING = "networking",
  CHARITY = "charity",
}

export enum EventStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  SOLD_OUT = "sold_out",
  CANCELLED = "cancelled",
  POSTPONED = "postponed",
  COMPLETED = "completed",
}

@Entity("event_eager")
export class EventEager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  type: EventType;

  @Column({
    type: "varchar",
    length: 20,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @Column({ type: "datetime", nullable: false })
  startDate: Date;

  @Column({ type: "datetime", nullable: false })
  endDate: Date;

  @Column({ type: "int", unsigned: true, nullable: false })
  maxCapacity: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  currentAttendees: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  ticketPrice: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  organizerName?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  organizerEmail?: string;

  @Column({ type: "boolean", default: false })
  isVirtual: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  virtualLink?: string;

  @Column({ type: "json", nullable: true })
  tags?: string[];

  @Column({ type: "varchar", length: 255, nullable: true })
  coverImage?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  rating: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  reviewCount: number;

  // ===== RELACIONES CON EAGER LOADING =====

  /**
   * Relación Many-to-One con VenueEager
   * EAGER LOADING: Se carga automáticamente
   */
  @ManyToOne(() => VenueEager, (venue) => venue.events, {
    nullable: true,
    onDelete: "SET NULL",
    eager: true, // ← EAGER LOADING ACTIVADO
  })
  @JoinColumn({ name: "venueId" })
  venue?: VenueEager;

  /**
   * Relación One-to-Many con TicketEager
   * EAGER LOADING: Se carga automáticamente
   */
  @OneToMany(() => TicketEager, (ticket) => ticket.event, {
    cascade: true,
    eager: true, // ← EAGER LOADING ACTIVADO
  })
  tickets: TicketEager[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    title?: string,
    type?: EventType,
    startDate?: Date,
    endDate?: Date,
    maxCapacity?: number,
    ticketPrice?: number
  ) {
    this.title = title || "";
    this.type = type || EventType.CONFERENCE;
    this.startDate = startDate || new Date();
    this.endDate = endDate || new Date();
    this.maxCapacity = maxCapacity || 100;
    this.ticketPrice = ticketPrice || 0;
    this.tickets = [];
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullTitle(): string {
    return `${this.title} - ${this.getTypeDisplayName()}`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<EventType, string> = {
      [EventType.CONCERT]: "Concierto",
      [EventType.CONFERENCE]: "Conferencia",
      [EventType.WORKSHOP]: "Taller",
      [EventType.SEMINAR]: "Seminario",
      [EventType.FESTIVAL]: "Festival",
      [EventType.EXHIBITION]: "Exposición",
      [EventType.THEATER]: "Teatro",
      [EventType.SPORTS]: "Deportes",
      [EventType.NETWORKING]: "Networking",
      [EventType.CHARITY]: "Caridad",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<EventStatus, string> = {
      [EventStatus.DRAFT]: "Borrador",
      [EventStatus.PUBLISHED]: "Publicado",
      [EventStatus.SOLD_OUT]: "Agotado",
      [EventStatus.CANCELLED]: "Cancelado",
      [EventStatus.POSTPONED]: "Pospuesto",
      [EventStatus.COMPLETED]: "Completado",
    };
    return statusNames[this.status];
  }

  isUpcoming(): boolean {
    return this.startDate > new Date();
  }

  isOngoing(): boolean {
    const now = new Date();
    return now >= this.startDate && now <= this.endDate;
  }

  isCompleted(): boolean {
    return this.endDate < new Date();
  }

  getAvailableCapacity(): number {
    return this.maxCapacity - this.currentAttendees;
  }

  getOccupancyPercentage(): number {
    return (this.currentAttendees / this.maxCapacity) * 100;
  }

  isSoldOut(): boolean {
    return this.currentAttendees >= this.maxCapacity;
  }

  getDurationInHours(): number {
    const diff = this.endDate.getTime() - this.startDate.getTime();
    return Math.round(diff / (1000 * 60 * 60));
  }

  getFormattedDuration(): string {
    const hours = this.getDurationInHours();
    if (hours < 24) {
      return `${hours} horas`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return remainingHours > 0
        ? `${days} días, ${remainingHours} horas`
        : `${days} días`;
    }
  }

  addTag(tag: string): void {
    if (!this.tags) {
      this.tags = [];
    }
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    if (this.tags) {
      this.tags = this.tags.filter((t) => t !== tag);
    }
  }

  hasTag(tag: string): boolean {
    return this.tags ? this.tags.includes(tag) : false;
  }

  getTagsString(): string {
    return this.tags && this.tags.length > 0
      ? this.tags.join(", ")
      : "Sin etiquetas";
  }

  updateRating(newRating: number): void {
    if (newRating >= 0 && newRating <= 5) {
      this.rating = newRating;
    }
  }

  incrementReviewCount(): void {
    this.reviewCount++;
  }

  getTicketPriceFormatted(): string {
    return this.ticketPrice === 0
      ? "Gratis"
      : `$${this.ticketPrice.toLocaleString()}`;
  }

  canRegisterAttendees(): boolean {
    return (
      this.status === EventStatus.PUBLISHED &&
      !this.isSoldOut() &&
      this.isUpcoming()
    );
  }

  registerAttendee(): boolean {
    if (this.canRegisterAttendees()) {
      this.currentAttendees++;
      if (this.isSoldOut()) {
        this.status = EventStatus.SOLD_OUT;
      }
      return true;
    }
    return false;
  }

  unregisterAttendee(): boolean {
    if (this.currentAttendees > 0) {
      this.currentAttendees--;
      if (this.status === EventStatus.SOLD_OUT) {
        this.status = EventStatus.PUBLISHED;
      }
      return true;
    }
    return false;
  }

  publish(): void {
    this.status = EventStatus.PUBLISHED;
    this.isActive = true;
  }

  cancel(): void {
    this.status = EventStatus.CANCELLED;
    this.isActive = false;
  }

  postpone(): void {
    this.status = EventStatus.POSTPONED;
  }

  complete(): void {
    this.status = EventStatus.COMPLETED;
  }

  isHighlyRated(): boolean {
    return this.rating >= 4.5 && this.reviewCount >= 5;
  }

  getTimeUntilStart(): string {
    if (!this.isUpcoming()) {
      return "Ya comenzó";
    }

    const diff = this.startDate.getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} días, ${hours} horas`;
    } else {
      return `${hours} horas`;
    }
  }

  getEventSummary(): string {
    return `${
      this.title
    } (${this.getTypeDisplayName()}) - ${this.getFormattedDuration()} - ${this.getTicketPriceFormatted()} - ${
      this.currentAttendees
    }/${this.maxCapacity} asistentes`;
  }

  // ===== MÉTODOS ESPECÍFICOS PARA EAGER LOADING =====

  /**
   * Con eager loading, las relaciones ya están cargadas
   * No necesitamos hacer consultas adicionales
   */
  getVenueInfo(): string {
    return this.venue ? this.venue.getFullInfo() : "Sin venue asignado";
  }

  getTicketCount(): number {
    return this.tickets.length;
  }

  getConfirmedTickets(): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.status === "confirmed");
  }

  getConfirmedTicketsCount(): number {
    return this.getConfirmedTickets().length;
  }

  getTotalRevenue(): number {
    return this.tickets
      .filter((ticket) => ticket.paymentStatus === "completed")
      .reduce((total, ticket) => total + ticket.finalPrice, 0);
  }

  getTotalRevenueFormatted(): string {
    return `$${this.getTotalRevenue().toLocaleString()}`;
  }

  getVipTickets(): TicketEager[] {
    return this.tickets.filter((ticket) => ticket.type === "vip");
  }

  getVipTicketsCount(): number {
    return this.getVipTickets().length;
  }

  getEventWithEagerData(): string {
    const parts = [
      `Evento: ${this.title}`,
      `Venue: ${this.getVenueInfo()}`,
      `Tickets: ${this.getTicketCount()}`,
      `Confirmados: ${this.getConfirmedTicketsCount()}`,
      `Revenue: ${this.getTotalRevenueFormatted()}`,
    ];

    return parts.join(" | ");
  }
}
