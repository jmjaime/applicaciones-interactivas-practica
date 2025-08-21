import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Dish } from "./Dish";

export enum IngredientType {
  VEGETABLE = "vegetable",
  FRUIT = "fruit",
  MEAT = "meat",
  SEAFOOD = "seafood",
  DAIRY = "dairy",
  GRAIN = "grain",
  LEGUME = "legume",
  HERB = "herb",
  SPICE = "spice",
  SAUCE = "sauce",
  OIL = "oil",
  NUTS = "nuts",
  CONDIMENT = "condiment",
  BEVERAGE = "beverage",
  OTHER = "other",
}

export enum IngredientStatus {
  AVAILABLE = "available",
  OUT_OF_STOCK = "out_of_stock",
  SEASONAL = "seasonal",
  DISCONTINUED = "discontinued",
}

export enum AllergenType {
  GLUTEN = "gluten",
  DAIRY = "dairy",
  EGGS = "eggs",
  NUTS = "nuts",
  PEANUTS = "peanuts",
  SHELLFISH = "shellfish",
  FISH = "fish",
  SOY = "soy",
  SESAME = "sesame",
  SULFITES = "sulfites",
}

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  type: IngredientType;

  @Column({
    type: "varchar",
    length: 20,
    default: IngredientStatus.AVAILABLE,
  })
  status: IngredientStatus;

  @Column({ type: "boolean", default: true })
  isAvailable: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  unitPrice?: number; // Precio por unidad de medida

  @Column({ type: "varchar", length: 20, nullable: true })
  unitOfMeasure?: string; // 'kg', 'g', 'L', 'ml', 'unidades', etc.

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  currentStock?: number; // Stock actual

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  minimumStock?: number; // Stock mínimo

  @Column({ type: "int", unsigned: true, nullable: true })
  caloriesPer100g?: number; // Calorías por 100g

  @Column({ type: "boolean", default: false })
  isOrganic: boolean;

  @Column({ type: "boolean", default: false })
  isVegetarian: boolean;

  @Column({ type: "boolean", default: false })
  isVegan: boolean;

  @Column({ type: "boolean", default: false })
  isGlutenFree: boolean;

  @Column({ type: "boolean", default: false })
  isDairyFree: boolean;

  @Column({ type: "json", nullable: true })
  allergens?: AllergenType[]; // Lista de alérgenos

  @Column({ type: "varchar", length: 100, nullable: true })
  origin?: string; // País o región de origen

  @Column({ type: "varchar", length: 100, nullable: true })
  supplier?: string; // Proveedor

  @Column({ type: "date", nullable: true })
  expirationDate?: Date; // Fecha de vencimiento

  @Column({ type: "int", unsigned: true, nullable: true })
  shelfLifeDays?: number; // Días de vida útil

  @Column({ type: "json", nullable: true })
  storageConditions?: {
    temperature?: string; // 'room', 'refrigerated', 'frozen'
    humidity?: string; // 'low', 'medium', 'high'
    light?: string; // 'dark', 'normal', 'direct'
    specialRequirements?: string[];
  };

  @Column({ type: "json", nullable: true })
  nutritionalInfo?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
    vitamins?: string[];
    minerals?: string[];
  };

  @Column({ type: "boolean", default: false })
  isSeasonalItem: boolean;

  @Column({ type: "json", nullable: true })
  seasonalMonths?: number[]; // Meses cuando está en temporada (1-12)

  @Column({ type: "varchar", length: 255, nullable: true })
  ingredientImage?: string; // URL de imagen del ingrediente

  @Column({ type: "text", nullable: true })
  preparationNotes?: string; // Notas de preparación

  @Column({ type: "int", unsigned: true, default: 0 })
  usageCount: number; // Número de veces usado en platos

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  quality: number; // Calidad del ingrediente (0-5)

  // ===== RELACIONES =====

  /**
   * Relación Many-to-Many con Dish
   * Un ingrediente puede estar en múltiples platos
   * Un plato puede tener múltiples ingredientes
   */
  @ManyToMany(() => Dish, (dish) => dish.ingredients)
  dishes: Dish[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(name?: string, type?: IngredientType) {
    this.name = name || "";
    this.type = type || IngredientType.OTHER;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullInfo(): string {
    return `${this.name} (${this.getTypeDisplayName()})`;
  }

  getTypeDisplayName(): string {
    const typeNames: Record<IngredientType, string> = {
      [IngredientType.VEGETABLE]: "Vegetal",
      [IngredientType.FRUIT]: "Fruta",
      [IngredientType.MEAT]: "Carne",
      [IngredientType.SEAFOOD]: "Mariscos",
      [IngredientType.DAIRY]: "Lácteo",
      [IngredientType.GRAIN]: "Grano",
      [IngredientType.LEGUME]: "Legumbre",
      [IngredientType.HERB]: "Hierba",
      [IngredientType.SPICE]: "Especia",
      [IngredientType.SAUCE]: "Salsa",
      [IngredientType.OIL]: "Aceite",
      [IngredientType.NUTS]: "Frutos Secos",
      [IngredientType.CONDIMENT]: "Condimento",
      [IngredientType.BEVERAGE]: "Bebida",
      [IngredientType.OTHER]: "Otro",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<IngredientStatus, string> = {
      [IngredientStatus.AVAILABLE]: "Disponible",
      [IngredientStatus.OUT_OF_STOCK]: "Sin Stock",
      [IngredientStatus.SEASONAL]: "Temporal",
      [IngredientStatus.DISCONTINUED]: "Descontinuado",
    };
    return statusNames[this.status];
  }

  isCurrentlyAvailable(): boolean {
    return this.isAvailable && this.status === IngredientStatus.AVAILABLE;
  }

  isInStock(): boolean {
    if (!this.currentStock) return false;
    return this.currentStock > 0;
  }

  isLowStock(): boolean {
    if (!this.currentStock || !this.minimumStock) return false;
    return this.currentStock <= this.minimumStock;
  }

  getStockStatus(): string {
    if (!this.currentStock) return "Stock no definido";
    if (this.currentStock === 0) return "Sin stock";
    if (this.isLowStock()) return "Stock bajo";
    return "Stock suficiente";
  }

  addAllergen(allergen: AllergenType): void {
    if (!this.allergens) {
      this.allergens = [];
    }
    if (!this.allergens.includes(allergen)) {
      this.allergens.push(allergen);
    }
  }

  removeAllergen(allergen: AllergenType): void {
    if (this.allergens) {
      this.allergens = this.allergens.filter((a) => a !== allergen);
    }
  }

  hasAllergen(allergen: AllergenType): boolean {
    return this.allergens ? this.allergens.includes(allergen) : false;
  }

  getAllergenList(): string {
    if (!this.allergens || this.allergens.length === 0) {
      return "Sin alérgenos conocidos";
    }

    const allergenNames: Record<AllergenType, string> = {
      [AllergenType.GLUTEN]: "Gluten",
      [AllergenType.DAIRY]: "Lácteos",
      [AllergenType.EGGS]: "Huevos",
      [AllergenType.NUTS]: "Frutos Secos",
      [AllergenType.PEANUTS]: "Maní",
      [AllergenType.SHELLFISH]: "Mariscos",
      [AllergenType.FISH]: "Pescado",
      [AllergenType.SOY]: "Soja",
      [AllergenType.SESAME]: "Sésamo",
      [AllergenType.SULFITES]: "Sulfitos",
    };

    return this.allergens.map((allergen) => allergenNames[allergen]).join(", ");
  }

  setNutritionalInfo(info: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
    vitamins?: string[];
    minerals?: string[];
  }): void {
    this.nutritionalInfo = info;
  }

  getNutritionalSummary(): string {
    if (!this.nutritionalInfo) return "Información nutricional no disponible";

    const info = this.nutritionalInfo;
    const parts: string[] = [];

    if (info.protein) parts.push(`Proteína: ${info.protein}g`);
    if (info.carbs) parts.push(`Carbohidratos: ${info.carbs}g`);
    if (info.fat) parts.push(`Grasa: ${info.fat}g`);
    if (info.fiber) parts.push(`Fibra: ${info.fiber}g`);
    if (info.sodium) parts.push(`Sodio: ${info.sodium}mg`);

    if (info.vitamins && info.vitamins.length > 0) {
      parts.push(`Vitaminas: ${info.vitamins.join(", ")}`);
    }

    if (info.minerals && info.minerals.length > 0) {
      parts.push(`Minerales: ${info.minerals.join(", ")}`);
    }

    return parts.length > 0 ? parts.join(" | ") : "Información parcial";
  }

  setStorageConditions(conditions: {
    temperature?: string;
    humidity?: string;
    light?: string;
    specialRequirements?: string[];
  }): void {
    this.storageConditions = conditions;
  }

  getStorageInstructions(): string {
    if (!this.storageConditions)
      return "Condiciones de almacenamiento no especificadas";

    const conditions = this.storageConditions;
    const parts: string[] = [];

    if (conditions.temperature) {
      const tempNames: Record<string, string> = {
        room: "Temperatura ambiente",
        refrigerated: "Refrigerado",
        frozen: "Congelado",
      };
      parts.push(
        `Temp: ${tempNames[conditions.temperature] || conditions.temperature}`
      );
    }

    if (conditions.humidity) {
      const humidityNames: Record<string, string> = {
        low: "Baja humedad",
        medium: "Humedad media",
        high: "Alta humedad",
      };
      parts.push(
        `Hum: ${humidityNames[conditions.humidity] || conditions.humidity}`
      );
    }

    if (conditions.light) {
      const lightNames: Record<string, string> = {
        dark: "Lugar oscuro",
        normal: "Luz normal",
        direct: "Luz directa",
      };
      parts.push(`Luz: ${lightNames[conditions.light] || conditions.light}`);
    }

    if (
      conditions.specialRequirements &&
      conditions.specialRequirements.length > 0
    ) {
      parts.push(`Especiales: ${conditions.specialRequirements.join(", ")}`);
    }

    return parts.length > 0 ? parts.join(" | ") : "Condiciones básicas";
  }

  addSeasonalMonth(month: number): void {
    if (month < 1 || month > 12) return;

    if (!this.seasonalMonths) {
      this.seasonalMonths = [];
    }

    if (!this.seasonalMonths.includes(month)) {
      this.seasonalMonths.push(month);
      this.seasonalMonths.sort();
    }
  }

  removeSeasonalMonth(month: number): void {
    if (this.seasonalMonths) {
      this.seasonalMonths = this.seasonalMonths.filter((m) => m !== month);
    }
  }

  isInSeason(month?: number): boolean {
    if (!this.isSeasonalItem) return true;
    if (!this.seasonalMonths || this.seasonalMonths.length === 0) return true;

    const checkMonth = month || new Date().getMonth() + 1;
    return this.seasonalMonths.includes(checkMonth);
  }

  getSeasonalMonthsString(): string {
    if (!this.isSeasonalItem) return "Todo el año";
    if (!this.seasonalMonths || this.seasonalMonths.length === 0)
      return "Temporada no definida";

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return this.seasonalMonths.map((month) => monthNames[month - 1]).join(", ");
  }

  getDietaryTags(): string[] {
    const tags: string[] = [];

    if (this.isVegetarian) tags.push("Vegetariano");
    if (this.isVegan) tags.push("Vegano");
    if (this.isGlutenFree) tags.push("Sin Gluten");
    if (this.isDairyFree) tags.push("Sin Lácteos");
    if (this.isOrganic) tags.push("Orgánico");

    return tags;
  }

  getDietaryTagsString(): string {
    const tags = this.getDietaryTags();
    return tags.length > 0 ? tags.join(", ") : "Sin etiquetas especiales";
  }

  updateStock(newStock: number): void {
    if (newStock >= 0) {
      this.currentStock = newStock;

      // Actualizar status basado en stock
      if (newStock === 0) {
        this.status = IngredientStatus.OUT_OF_STOCK;
        this.isAvailable = false;
      } else if (this.status === IngredientStatus.OUT_OF_STOCK) {
        this.status = IngredientStatus.AVAILABLE;
        this.isAvailable = true;
      }
    }
  }

  consumeStock(amount: number): boolean {
    if (!this.currentStock || this.currentStock < amount) {
      return false;
    }

    this.currentStock -= amount;
    this.updateStock(this.currentStock);
    return true;
  }

  restockIngredient(amount: number): void {
    if (!this.currentStock) {
      this.currentStock = amount;
    } else {
      this.currentStock += amount;
    }

    this.updateStock(this.currentStock);
  }

  incrementUsageCount(): void {
    this.usageCount++;
  }

  updateQuality(newQuality: number): void {
    if (newQuality >= 0 && newQuality <= 5) {
      this.quality = newQuality;
    }
  }

  isHighQuality(): boolean {
    return this.quality >= 4.0;
  }

  isExpired(): boolean {
    if (!this.expirationDate) return false;
    return new Date() > this.expirationDate;
  }

  isExpiringSoon(daysAhead: number = 7): boolean {
    if (!this.expirationDate) return false;

    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + daysAhead);

    return this.expirationDate <= warningDate;
  }

  getExpirationStatus(): string {
    if (!this.expirationDate) return "Sin fecha de vencimiento";

    if (this.isExpired()) return "Vencido";
    if (this.isExpiringSoon()) return "Próximo a vencer";

    return `Vence: ${this.expirationDate.toLocaleDateString()}`;
  }

  getUnitPriceFormatted(): string {
    if (!this.unitPrice) return "Precio no disponible";

    const unit = this.unitOfMeasure || "unidad";
    return `$${this.unitPrice.toLocaleString()} por ${unit}`;
  }

  getStockInfo(): string {
    if (!this.currentStock) return "Stock no definido";

    const unit = this.unitOfMeasure || "unidades";
    let info = `${this.currentStock} ${unit}`;

    if (this.minimumStock) {
      info += ` (mín: ${this.minimumStock})`;
    }

    return info;
  }

  getCaloriesString(): string {
    return this.caloriesPer100g
      ? `${this.caloriesPer100g} cal/100g`
      : "Calorías no disponibles";
  }

  getDishCount(): number {
    return this.dishes ? this.dishes.length : 0;
  }

  isPopularIngredient(): boolean {
    return this.usageCount >= 10;
  }

  getCompleteInfo(): string {
    const info: string[] = [];

    info.push(`${this.name} (${this.getTypeDisplayName()})`);
    info.push(this.getStatusDisplayName());

    if (this.origin) info.push(`Origen: ${this.origin}`);
    if (this.supplier) info.push(`Proveedor: ${this.supplier}`);

    const dietary = this.getDietaryTagsString();
    if (dietary !== "Sin etiquetas especiales") {
      info.push(dietary);
    }

    if (this.isSeasonalItem) {
      info.push(`Temporada: ${this.getSeasonalMonthsString()}`);
    }

    return info.join(" | ");
  }
}
