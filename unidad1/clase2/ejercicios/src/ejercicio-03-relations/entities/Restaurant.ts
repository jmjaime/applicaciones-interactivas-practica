import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Chef } from "./Chef";
import { Menu } from "./Menu";

export enum RestaurantType {
  FINE_DINING = "fine_dining",
  CASUAL_DINING = "casual_dining",
  FAST_FOOD = "fast_food",
  CAFE = "cafe",
  BISTRO = "bistro",
  PIZZERIA = "pizzeria",
  STEAKHOUSE = "steakhouse",
  SEAFOOD = "seafood",
  ETHNIC = "ethnic",
  BUFFET = "buffet",
}

export enum RestaurantStatus {
  OPEN = "open",
  CLOSED = "closed",
  TEMPORARILY_CLOSED = "temporarily_closed",
  UNDER_RENOVATION = "under_renovation",
}

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  type: RestaurantType;

  @Column({ length: 200, nullable: false })
  address: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ length: 255, nullable: true })
  website?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  capacity: number; // Número de comensales

  @Column({
    type: "varchar",
    length: 20,
    default: RestaurantStatus.OPEN,
  })
  status: RestaurantStatus;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  rating: number; // Rating de 0 a 5

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  averagePrice?: number; // Precio promedio por persona

  @Column({ type: "time", default: "11:00:00" })
  openingTime: string;

  @Column({ type: "time", default: "23:00:00" })
  closingTime: string;

  @Column({ type: "json", nullable: true })
  workingDays?: string[]; // ['monday', 'tuesday', 'wednesday', etc.]

  @Column({ type: "boolean", default: false })
  hasDelivery: boolean;

  @Column({ type: "boolean", default: false })
  hasTakeaway: boolean;

  @Column({ type: "boolean", default: false })
  hasReservations: boolean;

  @Column({ type: "json", nullable: true })
  amenities?: string[]; // ['wifi', 'parking', 'terrace', 'air_conditioning', etc.]

  @Column({ type: "json", nullable: true })
  paymentMethods?: string[]; // ['cash', 'credit_card', 'debit_card', 'digital_wallet']

  @Column({ type: "varchar", length: 255, nullable: true })
  logoImage?: string; // URL del logo

  @Column({ type: "json", nullable: true })
  galleryImages?: string[]; // URLs de imágenes del restaurante

  @Column({ type: "int", unsigned: true, default: 0 })
  totalReviews: number;

  @Column({ type: "date", nullable: true })
  establishedDate?: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  // ===== RELACIONES =====

  /**
   * Relación One-to-One con Chef
   * Un restaurante tiene un chef principal
   * Un chef puede ser principal de un solo restaurante
   */
  @OneToOne(() => Chef, (chef) => chef.restaurant, {
    onDelete: "SET NULL",
  })
  headChef?: Chef;

  /**
   * Relación One-to-Many con Menu
   * Un restaurante puede tener múltiples menús (desayuno, almuerzo, cena, etc.)
   * Cada menú pertenece a un solo restaurante
   */
  @OneToMany(() => Menu, (menu) => menu.restaurant, {
    cascade: true,
    eager: false,
  })
  menus: Menu[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(name?: string, type?: RestaurantType, address?: string) {
    this.name = name || "";
    this.type = type || RestaurantType.CASUAL_DINING;
    this.address = address || "";
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullInfo(): string {
    return `${this.name} - ${this.getTypeDisplayName()}`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<RestaurantType, string> = {
      [RestaurantType.FINE_DINING]: "Alta Cocina",
      [RestaurantType.CASUAL_DINING]: "Restaurante Casual",
      [RestaurantType.FAST_FOOD]: "Comida Rápida",
      [RestaurantType.CAFE]: "Café",
      [RestaurantType.BISTRO]: "Bistró",
      [RestaurantType.PIZZERIA]: "Pizzería",
      [RestaurantType.STEAKHOUSE]: "Parrilla",
      [RestaurantType.SEAFOOD]: "Marisquería",
      [RestaurantType.ETHNIC]: "Cocina Étnica",
      [RestaurantType.BUFFET]: "Buffet",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<RestaurantStatus, string> = {
      [RestaurantStatus.OPEN]: "Abierto",
      [RestaurantStatus.CLOSED]: "Cerrado",
      [RestaurantStatus.TEMPORARILY_CLOSED]: "Cerrado Temporalmente",
      [RestaurantStatus.UNDER_RENOVATION]: "En Renovación",
    };
    return statusNames[this.status];
  }

  isHighlyRated(): boolean {
    return this.rating >= 4.5;
  }

  isCurrentlyOpen(): boolean {
    return this.status === RestaurantStatus.OPEN;
  }

  hasChef(): boolean {
    return this.headChef !== undefined && this.headChef !== null;
  }

  getMenuCount(): number {
    return this.menus ? this.menus.length : 0;
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

  addPaymentMethod(method: string): void {
    if (!this.paymentMethods) {
      this.paymentMethods = [];
    }
    if (!this.paymentMethods.includes(method)) {
      this.paymentMethods.push(method);
    }
  }

  removePaymentMethod(method: string): void {
    if (this.paymentMethods) {
      this.paymentMethods = this.paymentMethods.filter((m) => m !== method);
    }
  }

  acceptsPaymentMethod(method: string): boolean {
    return this.paymentMethods ? this.paymentMethods.includes(method) : false;
  }

  addWorkingDay(day: string): void {
    if (!this.workingDays) {
      this.workingDays = [];
    }
    if (!this.workingDays.includes(day)) {
      this.workingDays.push(day);
    }
  }

  removeWorkingDay(day: string): void {
    if (this.workingDays) {
      this.workingDays = this.workingDays.filter((d) => d !== day);
    }
  }

  isOpenOnDay(day: string): boolean {
    return this.workingDays ? this.workingDays.includes(day) : false;
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
    this.totalReviews++;
  }

  assignChef(chef: Chef): void {
    this.headChef = chef;
    chef.assignToRestaurant(this);
  }

  removeChef(): void {
    if (this.headChef) {
      this.headChef.removeFromRestaurant();
      this.headChef = undefined;
    }
  }

  getEstablishedYears(): number {
    if (!this.establishedDate) return 0;
    const today = new Date();
    return today.getFullYear() - this.establishedDate.getFullYear();
  }

  hasDeliveryService(): boolean {
    return this.hasDelivery;
  }

  hasTakeawayService(): boolean {
    return this.hasTakeaway;
  }

  acceptsReservations(): boolean {
    return this.hasReservations;
  }

  getCapacityStatus(): string {
    if (this.capacity === 0) return "Capacidad no definida";
    if (this.capacity <= 20) return "Íntimo";
    if (this.capacity <= 50) return "Pequeño";
    if (this.capacity <= 100) return "Mediano";
    if (this.capacity <= 200) return "Grande";
    return "Muy grande";
  }

  getPriceRange(): string {
    if (!this.averagePrice) return "Precio no disponible";
    if (this.averagePrice <= 1000) return "$";
    if (this.averagePrice <= 3000) return "$$";
    if (this.averagePrice <= 6000) return "$$$";
    return "$$$$";
  }
}
