import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Event } from "./Event";

export enum VenueType {
  THEATER = "theater",
  CONCERT_HALL = "concert_hall",
  CONFERENCE_CENTER = "conference_center",
  STADIUM = "stadium",
  ARENA = "arena",
  HOTEL = "hotel",
  UNIVERSITY = "university",
  OUTDOOR = "outdoor",
  MUSEUM = "museum",
  GALLERY = "gallery",
  RESTAURANT = "restaurant",
  CLUB = "club",
  LIBRARY = "library",
  COMMUNITY_CENTER = "community_center",
}

export enum VenueStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  UNDER_MAINTENANCE = "under_maintenance",
  RENOVATING = "renovating",
  CLOSED = "closed",
}

@Entity()
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  type: VenueType;

  @Column({
    type: "varchar",
    length: 20,
    default: VenueStatus.ACTIVE,
  })
  status: VenueStatus;

  @Column({ length: 200, nullable: false })
  address: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @Column({ length: 50, nullable: true })
  state?: string;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ length: 20, nullable: true })
  postalCode?: string;

  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column({ type: "int", unsigned: true, nullable: false })
  maxCapacity: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalEventsHosted: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  email?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  website?: string;

  @Column({ type: "json", nullable: true })
  amenities?: string[]; // ['parking', 'wifi', 'accessibility', 'catering', etc.]

  @Column({ type: "json", nullable: true })
  technicalEquipment?: string[]; // ['sound_system', 'projector', 'lighting', etc.]

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  hourlyRate?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  dailyRate?: number;

  @Column({ type: "boolean", default: false })
  requiresInsurance: boolean;

  @Column({ type: "boolean", default: false })
  hasAccessibility: boolean;

  @Column({ type: "boolean", default: false })
  hasParking: boolean;

  @Column({ type: "boolean", default: false })
  hasWifi: boolean;

  @Column({ type: "boolean", default: false })
  hasCatering: boolean;

  @Column({ type: "text", nullable: true })
  specialInstructions?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  primaryImage?: string;

  @Column({ type: "json", nullable: true })
  galleryImages?: string[];

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  rating: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  reviewCount: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  managerName?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  managerEmail?: string;

  // ===== RELACIONES CON LAZY LOADING =====

  /**
   * Relación One-to-Many con Event
   * LAZY LOADING: No se carga automáticamente
   */
  @OneToMany(() => Event, (event) => event.venue, {
    cascade: false,
  })
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    name?: string,
    type?: VenueType,
    address?: string,
    maxCapacity?: number
  ) {
    this.name = name || "";
    this.type = type || VenueType.CONFERENCE_CENTER;
    this.address = address || "";
    this.maxCapacity = maxCapacity || 100;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullInfo(): string {
    return `${this.name} - ${this.getTypeDisplayName()}`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<VenueType, string> = {
      [VenueType.THEATER]: "Teatro",
      [VenueType.CONCERT_HALL]: "Sala de Conciertos",
      [VenueType.CONFERENCE_CENTER]: "Centro de Convenciones",
      [VenueType.STADIUM]: "Estadio",
      [VenueType.ARENA]: "Arena",
      [VenueType.HOTEL]: "Hotel",
      [VenueType.UNIVERSITY]: "Universidad",
      [VenueType.OUTDOOR]: "Espacio Abierto",
      [VenueType.MUSEUM]: "Museo",
      [VenueType.GALLERY]: "Galería",
      [VenueType.RESTAURANT]: "Restaurante",
      [VenueType.CLUB]: "Club",
      [VenueType.LIBRARY]: "Biblioteca",
      [VenueType.COMMUNITY_CENTER]: "Centro Comunitario",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<VenueStatus, string> = {
      [VenueStatus.ACTIVE]: "Activo",
      [VenueStatus.INACTIVE]: "Inactivo",
      [VenueStatus.UNDER_MAINTENANCE]: "En Mantenimiento",
      [VenueStatus.RENOVATING]: "En Renovación",
      [VenueStatus.CLOSED]: "Cerrado",
    };
    return statusNames[this.status];
  }

  getFullAddress(): string {
    const parts = [this.address];
    if (this.city) parts.push(this.city);
    if (this.state) parts.push(this.state);
    if (this.country) parts.push(this.country);
    if (this.postalCode) parts.push(this.postalCode);
    return parts.join(", ");
  }

  isAvailable(): boolean {
    return this.status === VenueStatus.ACTIVE && this.isActive;
  }

  addAmenity(amenity: string): void {
    if (!this.amenities) {
      this.amenities = [];
    }
    if (!this.amenities.includes(amenity)) {
      this.amenities.push(amenity);
    }
  }

  removeAmenity(amenity: string): void {
    if (this.amenities) {
      this.amenities = this.amenities.filter((a) => a !== amenity);
    }
  }

  hasAmenity(amenity: string): boolean {
    return this.amenities ? this.amenities.includes(amenity) : false;
  }

  getAmenitiesString(): string {
    return this.amenities && this.amenities.length > 0
      ? this.amenities.join(", ")
      : "Sin amenidades";
  }

  addTechnicalEquipment(equipment: string): void {
    if (!this.technicalEquipment) {
      this.technicalEquipment = [];
    }
    if (!this.technicalEquipment.includes(equipment)) {
      this.technicalEquipment.push(equipment);
    }
  }

  removeTechnicalEquipment(equipment: string): void {
    if (this.technicalEquipment) {
      this.technicalEquipment = this.technicalEquipment.filter(
        (e) => e !== equipment
      );
    }
  }

  hasTechnicalEquipment(equipment: string): boolean {
    return this.technicalEquipment
      ? this.technicalEquipment.includes(equipment)
      : false;
  }

  getTechnicalEquipmentString(): string {
    return this.technicalEquipment && this.technicalEquipment.length > 0
      ? this.technicalEquipment.join(", ")
      : "Sin equipamiento técnico";
  }

  addGalleryImage(imageUrl: string): void {
    if (!this.galleryImages) {
      this.galleryImages = [];
    }
    if (!this.galleryImages.includes(imageUrl)) {
      this.galleryImages.push(imageUrl);
    }
  }

  removeGalleryImage(imageUrl: string): void {
    if (this.galleryImages) {
      this.galleryImages = this.galleryImages.filter((img) => img !== imageUrl);
    }
  }

  getImageCount(): number {
    return this.galleryImages ? this.galleryImages.length : 0;
  }

  updateRating(newRating: number): void {
    if (newRating >= 0 && newRating <= 5) {
      this.rating = newRating;
    }
  }

  incrementReviewCount(): void {
    this.reviewCount++;
  }

  incrementEventsHosted(): void {
    this.totalEventsHosted++;
  }

  getHourlyRateFormatted(): string {
    return this.hourlyRate
      ? `$${this.hourlyRate.toLocaleString()}/hora`
      : "Tarifa por hora no disponible";
  }

  getDailyRateFormatted(): string {
    return this.dailyRate
      ? `$${this.dailyRate.toLocaleString()}/día`
      : "Tarifa diaria no disponible";
  }

  isHighlyRated(): boolean {
    return this.rating >= 4.5 && this.reviewCount >= 10;
  }

  isExperiencedVenue(): boolean {
    return this.totalEventsHosted >= 50;
  }

  getCapacityCategory(): string {
    if (this.maxCapacity <= 50) return "Íntimo";
    if (this.maxCapacity <= 200) return "Pequeño";
    if (this.maxCapacity <= 500) return "Mediano";
    if (this.maxCapacity <= 1000) return "Grande";
    if (this.maxCapacity <= 5000) return "Muy Grande";
    return "Masivo";
  }

  hasLocation(): boolean {
    return this.latitude !== null && this.longitude !== null;
  }

  getLocationString(): string {
    if (this.hasLocation()) {
      return `${this.latitude}, ${this.longitude}`;
    }
    return "Ubicación no disponible";
  }

  getBasicAmenities(): string[] {
    const basic = [];
    if (this.hasParking) basic.push("Estacionamiento");
    if (this.hasWifi) basic.push("WiFi");
    if (this.hasAccessibility) basic.push("Accesibilidad");
    if (this.hasCatering) basic.push("Catering");
    return basic;
  }

  getBasicAmenitiesString(): string {
    const basic = this.getBasicAmenities();
    return basic.length > 0 ? basic.join(", ") : "Sin amenidades básicas";
  }

  activate(): void {
    this.status = VenueStatus.ACTIVE;
    this.isActive = true;
  }

  deactivate(): void {
    this.status = VenueStatus.INACTIVE;
    this.isActive = false;
  }

  setUnderMaintenance(): void {
    this.status = VenueStatus.UNDER_MAINTENANCE;
  }

  setRenovating(): void {
    this.status = VenueStatus.RENOVATING;
  }

  close(): void {
    this.status = VenueStatus.CLOSED;
    this.isActive = false;
  }

  canHostEvent(eventCapacity: number): boolean {
    return this.isAvailable() && this.maxCapacity >= eventCapacity;
  }

  getEventCapacityUtilization(eventCapacity: number): number {
    return (eventCapacity / this.maxCapacity) * 100;
  }

  getContactInfo(): string {
    const contact = [];
    if (this.phone) contact.push(`Tel: ${this.phone}`);
    if (this.email) contact.push(`Email: ${this.email}`);
    if (this.website) contact.push(`Web: ${this.website}`);
    return contact.length > 0
      ? contact.join(" | ")
      : "Sin información de contacto";
  }

  getManagerInfo(): string {
    if (this.managerName) {
      const parts = [this.managerName];
      if (this.managerEmail) parts.push(`(${this.managerEmail})`);
      return parts.join(" ");
    }
    return "Sin información de gerente";
  }

  getVenueSummary(): string {
    return `${this.name} (${this.getTypeDisplayName()}) - Capacidad: ${
      this.maxCapacity
    } - ${this.getCapacityCategory()} - Rating: ${this.rating}/5 - Eventos: ${
      this.totalEventsHosted
    }`;
  }
}
