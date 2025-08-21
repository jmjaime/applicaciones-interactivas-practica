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
import { Restaurant } from "./Restaurant";
import { Dish } from "./Dish";

export enum MenuType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  BRUNCH = "brunch",
  APPETIZERS = "appetizers",
  DESSERTS = "desserts",
  BEVERAGES = "beverages",
  WINE_LIST = "wine_list",
  KIDS_MENU = "kids_menu",
  SEASONAL = "seasonal",
}

export enum MenuStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SEASONAL = "seasonal",
  SPECIAL = "special",
}

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  type: MenuType;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: MenuStatus.ACTIVE,
  })
  status: MenuStatus;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "date", nullable: true })
  validFrom?: Date; // Fecha desde cuando es válido

  @Column({ type: "date", nullable: true })
  validUntil?: Date; // Fecha hasta cuando es válido

  @Column({ type: "time", nullable: true })
  availableFrom?: string; // Hora desde cuando está disponible

  @Column({ type: "time", nullable: true })
  availableUntil?: string; // Hora hasta cuando está disponible

  @Column({ type: "json", nullable: true })
  availableDays?: string[]; // Días de la semana cuando está disponible

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  basePrice?: number; // Precio base del menú (si aplica)

  @Column({ type: "int", unsigned: true, default: 0 })
  dishCount: number; // Número de platos en el menú

  @Column({ type: "boolean", default: false })
  isSpecial: boolean; // Si es un menú especial o promocional

  @Column({ type: "varchar", length: 255, nullable: true })
  menuImage?: string; // URL de imagen del menú

  @Column({ type: "json", nullable: true })
  dietaryOptions?: string[]; // ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', etc.]

  @Column({ type: "text", nullable: true })
  allergenInfo?: string; // Información sobre alérgenos

  @Column({ type: "int", unsigned: true, default: 1 })
  displayOrder: number; // Orden de visualización en el restaurante

  // ===== RELACIONES =====

  /**
   * Relación Many-to-One con Restaurant
   * Muchos menús pueden pertenecer a un restaurante
   * Cada menú pertenece a un solo restaurante
   */
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "restaurantId" })
  restaurant: Restaurant;

  /**
   * Relación One-to-Many con Dish
   * Un menú puede tener múltiples platos
   * Cada plato pertenece a un solo menú
   */
  @OneToMany(() => Dish, (dish) => dish.menu, {
    cascade: true,
    eager: false,
  })
  dishes: Dish[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(name?: string, type?: MenuType, restaurant?: Restaurant) {
    this.name = name || "";
    this.type = type || MenuType.LUNCH;
    this.restaurant = restaurant!;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullName(): string {
    return `${this.name} - ${this.getTypeDisplayName()}`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<MenuType, string> = {
      [MenuType.BREAKFAST]: "Desayuno",
      [MenuType.LUNCH]: "Almuerzo",
      [MenuType.DINNER]: "Cena",
      [MenuType.BRUNCH]: "Brunch",
      [MenuType.APPETIZERS]: "Aperitivos",
      [MenuType.DESSERTS]: "Postres",
      [MenuType.BEVERAGES]: "Bebidas",
      [MenuType.WINE_LIST]: "Carta de Vinos",
      [MenuType.KIDS_MENU]: "Menú Infantil",
      [MenuType.SEASONAL]: "Menú de Temporada",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<MenuStatus, string> = {
      [MenuStatus.ACTIVE]: "Activo",
      [MenuStatus.INACTIVE]: "Inactivo",
      [MenuStatus.SEASONAL]: "Temporal",
      [MenuStatus.SPECIAL]: "Especial",
    };
    return statusNames[this.status];
  }

  isCurrentlyAvailable(): boolean {
    if (!this.isActive || this.status === MenuStatus.INACTIVE) {
      return false;
    }

    const now = new Date();

    // Verificar fechas de validez
    if (this.validFrom && now < this.validFrom) {
      return false;
    }

    if (this.validUntil && now > this.validUntil) {
      return false;
    }

    // Verificar día de la semana
    if (this.availableDays && this.availableDays.length > 0) {
      const currentDay = now
        .toLocaleDateString("en-US", { weekday: "short" })
        .toLowerCase(); // 'mon', 'tue', etc.
      const dayMap: Record<string, string> = {
        sun: "sunday",
        mon: "monday",
        tue: "tuesday",
        wed: "wednesday",
        thu: "thursday",
        fri: "friday",
        sat: "saturday",
      };

      const fullDayName = dayMap[currentDay];
      if (!this.availableDays.includes(fullDayName)) {
        return false;
      }
    }

    return true;
  }

  getDishCount(): number {
    return this.dishes ? this.dishes.length : 0;
  }

  updateDishCount(): void {
    this.dishCount = this.getDishCount();
  }

  addDietaryOption(option: string): void {
    if (!this.dietaryOptions) {
      this.dietaryOptions = [];
    }
    if (!this.dietaryOptions.includes(option)) {
      this.dietaryOptions.push(option);
    }
  }

  removeDietaryOption(option: string): void {
    if (this.dietaryOptions) {
      this.dietaryOptions = this.dietaryOptions.filter((opt) => opt !== option);
    }
  }

  hasDietaryOption(option: string): boolean {
    return this.dietaryOptions ? this.dietaryOptions.includes(option) : false;
  }

  addAvailableDay(day: string): void {
    if (!this.availableDays) {
      this.availableDays = [];
    }
    if (!this.availableDays.includes(day)) {
      this.availableDays.push(day);
    }
  }

  removeAvailableDay(day: string): void {
    if (this.availableDays) {
      this.availableDays = this.availableDays.filter((d) => d !== day);
    }
  }

  isAvailableOnDay(day: string): boolean {
    return this.availableDays ? this.availableDays.includes(day) : true;
  }

  setValidityPeriod(from: Date, until: Date): void {
    this.validFrom = from;
    this.validUntil = until;
  }

  setAvailabilityHours(from: string, until: string): void {
    this.availableFrom = from;
    this.availableUntil = until;
  }

  isSpecialMenu(): boolean {
    return this.isSpecial || this.status === MenuStatus.SPECIAL;
  }

  isSeasonalMenu(): boolean {
    return this.status === MenuStatus.SEASONAL;
  }

  activate(): void {
    this.isActive = true;
    this.status = MenuStatus.ACTIVE;
  }

  deactivate(): void {
    this.isActive = false;
    this.status = MenuStatus.INACTIVE;
  }

  markAsSpecial(): void {
    this.isSpecial = true;
    this.status = MenuStatus.SPECIAL;
  }

  markAsSeasonal(): void {
    this.status = MenuStatus.SEASONAL;
  }

  getTotalDishPrice(): number {
    if (!this.dishes || this.dishes.length === 0) return 0;
    return this.dishes.reduce((total, dish) => total + (dish.price || 0), 0);
  }

  getAverageDishPrice(): number {
    if (!this.dishes || this.dishes.length === 0) return 0;
    return this.getTotalDishPrice() / this.dishes.length;
  }

  getMinDishPrice(): number {
    if (!this.dishes || this.dishes.length === 0) return 0;
    return Math.min(...this.dishes.map((dish) => dish.price || 0));
  }

  getMaxDishPrice(): number {
    if (!this.dishes || this.dishes.length === 0) return 0;
    return Math.max(...this.dishes.map((dish) => dish.price || 0));
  }

  getPriceRange(): string {
    if (!this.dishes || this.dishes.length === 0) return "Sin platos";

    const min = this.getMinDishPrice();
    const max = this.getMaxDishPrice();

    if (min === max) {
      return `$${min.toLocaleString()}`;
    }

    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }

  hasVegetarianOptions(): boolean {
    return this.hasDietaryOption("vegetarian");
  }

  hasVeganOptions(): boolean {
    return this.hasDietaryOption("vegan");
  }

  hasGlutenFreeOptions(): boolean {
    return this.hasDietaryOption("gluten_free");
  }

  getDietaryOptionsCount(): number {
    return this.dietaryOptions ? this.dietaryOptions.length : 0;
  }

  getValidityInfo(): string {
    if (!this.validFrom && !this.validUntil) {
      return "Siempre válido";
    }

    if (this.validFrom && this.validUntil) {
      return `Válido desde ${this.validFrom.toLocaleDateString()} hasta ${this.validUntil.toLocaleDateString()}`;
    }

    if (this.validFrom) {
      return `Válido desde ${this.validFrom.toLocaleDateString()}`;
    }

    if (this.validUntil) {
      return `Válido hasta ${this.validUntil.toLocaleDateString()}`;
    }

    return "Información de validez no disponible";
  }

  getAvailabilityInfo(): string {
    const days =
      this.availableDays && this.availableDays.length > 0
        ? this.availableDays.join(", ")
        : "Todos los días";

    const hours =
      this.availableFrom && this.availableUntil
        ? `${this.availableFrom} - ${this.availableUntil}`
        : "Todo el día";

    return `${days}, ${hours}`;
  }
}
