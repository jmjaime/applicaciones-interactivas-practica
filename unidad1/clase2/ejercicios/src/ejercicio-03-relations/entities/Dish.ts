import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from "typeorm";
import { Menu } from "./Menu";
import { Ingredient } from "./Ingredient";

export enum DishCategory {
  APPETIZER = "appetizer",
  SOUP = "soup",
  SALAD = "salad",
  MAIN_COURSE = "main_course",
  SIDE_DISH = "side_dish",
  DESSERT = "dessert",
  BEVERAGE = "beverage",
  PASTA = "pasta",
  PIZZA = "pizza",
  SEAFOOD = "seafood",
  MEAT = "meat",
  VEGETARIAN = "vegetarian",
  VEGAN = "vegan",
}

export enum DishStatus {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
  SEASONAL = "seasonal",
  SPECIAL = "special",
  DISCONTINUED = "discontinued",
}

export enum SpiceLevel {
  NONE = "none",
  MILD = "mild",
  MEDIUM = "medium",
  HOT = "hot",
  VERY_HOT = "very_hot",
}

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  category: DishCategory;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({
    type: "varchar",
    length: 20,
    default: DishStatus.AVAILABLE,
  })
  status: DishStatus;

  @Column({ type: "boolean", default: true })
  isAvailable: boolean;

  @Column({ type: "int", unsigned: true, nullable: true })
  preparationTime?: number; // Tiempo de preparación en minutos

  @Column({ type: "int", unsigned: true, nullable: true })
  calories?: number; // Calorías aproximadas

  @Column({
    type: "varchar",
    length: 20,
    default: SpiceLevel.NONE,
  })
  spiceLevel: SpiceLevel;

  @Column({ type: "boolean", default: false })
  isVegetarian: boolean;

  @Column({ type: "boolean", default: false })
  isVegan: boolean;

  @Column({ type: "boolean", default: false })
  isGlutenFree: boolean;

  @Column({ type: "boolean", default: false })
  isDairyFree: boolean;

  @Column({ type: "boolean", default: false })
  isSpecial: boolean; // Si es plato especial o de temporada

  @Column({ type: "boolean", default: false })
  isPopular: boolean; // Si es un plato popular

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  rating: number; // Rating de 0 a 5

  @Column({ type: "int", unsigned: true, default: 0 })
  orderCount: number; // Número de veces ordenado

  @Column({ type: "varchar", length: 255, nullable: true })
  dishImage?: string; // URL de imagen del plato

  @Column({ type: "json", nullable: true })
  allergens?: string[]; // ['nuts', 'shellfish', 'eggs', 'dairy', etc.]

  @Column({ type: "text", nullable: true })
  cookingInstructions?: string; // Instrucciones especiales de cocina

  @Column({ type: "json", nullable: true })
  nutritionalInfo?: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
  }; // Información nutricional

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  portionSize?: number; // Tamaño de la porción en gramos

  @Column({ type: "varchar", length: 50, nullable: true })
  origin?: string; // País o región de origen del plato

  @Column({ type: "int", unsigned: true, default: 1 })
  displayOrder: number; // Orden de visualización en el menú

  // ===== RELACIONES =====

  /**
   * Relación Many-to-One con Menu
   * Muchos platos pueden pertenecer a un menú
   * Cada plato pertenece a un solo menú
   */
  @ManyToOne(() => Menu, (menu) => menu.dishes, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "menuId" })
  menu: Menu;

  /**
   * Relación Many-to-Many con Ingredient
   * Un plato puede tener múltiples ingredientes
   * Un ingrediente puede estar en múltiples platos
   */
  @ManyToMany(() => Ingredient, (ingredient) => ingredient.dishes, {
    cascade: true,
    eager: false,
  })
  @JoinTable({
    name: "dish_ingredients", // Nombre de la tabla intermedia
    joinColumn: {
      name: "dishId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "ingredientId",
      referencedColumnName: "id",
    },
  })
  ingredients: Ingredient[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    name?: string,
    category?: DishCategory,
    price?: number,
    menu?: Menu
  ) {
    this.name = name || "";
    this.category = category || DishCategory.MAIN_COURSE;
    this.price = price || 0;
    this.menu = menu!;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getFullName(): string {
    return `${this.name} - ${this.getCategoryDisplayName()}`;
  }

  getCategoryDisplayName(): string {
    const categoryNames: Record<DishCategory, string> = {
      [DishCategory.APPETIZER]: "Aperitivo",
      [DishCategory.SOUP]: "Sopa",
      [DishCategory.SALAD]: "Ensalada",
      [DishCategory.MAIN_COURSE]: "Plato Principal",
      [DishCategory.SIDE_DISH]: "Acompañamiento",
      [DishCategory.DESSERT]: "Postre",
      [DishCategory.BEVERAGE]: "Bebida",
      [DishCategory.PASTA]: "Pasta",
      [DishCategory.PIZZA]: "Pizza",
      [DishCategory.SEAFOOD]: "Mariscos",
      [DishCategory.MEAT]: "Carne",
      [DishCategory.VEGETARIAN]: "Vegetariano",
      [DishCategory.VEGAN]: "Vegano",
    };
    return categoryNames[this.category];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<DishStatus, string> = {
      [DishStatus.AVAILABLE]: "Disponible",
      [DishStatus.UNAVAILABLE]: "No Disponible",
      [DishStatus.SEASONAL]: "Temporal",
      [DishStatus.SPECIAL]: "Especial",
      [DishStatus.DISCONTINUED]: "Descontinuado",
    };
    return statusNames[this.status];
  }

  getSpiceLevelDisplayName(): string {
    const spiceNames: Record<SpiceLevel, string> = {
      [SpiceLevel.NONE]: "Sin Picante",
      [SpiceLevel.MILD]: "Suave",
      [SpiceLevel.MEDIUM]: "Medio",
      [SpiceLevel.HOT]: "Picante",
      [SpiceLevel.VERY_HOT]: "Muy Picante",
    };
    return spiceNames[this.spiceLevel];
  }

  isCurrentlyAvailable(): boolean {
    return this.isAvailable && this.status === DishStatus.AVAILABLE;
  }

  isHighlyRated(): boolean {
    return this.rating >= 4.5;
  }

  isPopularDish(): boolean {
    return this.isPopular || this.orderCount >= 100;
  }

  getIngredientCount(): number {
    return this.ingredients ? this.ingredients.length : 0;
  }

  addIngredient(ingredient: Ingredient): void {
    if (!this.ingredients) {
      this.ingredients = [];
    }

    // Verificar si el ingrediente ya está en el plato
    const exists = this.ingredients.some((ing) => ing.id === ingredient.id);
    if (!exists) {
      this.ingredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: Ingredient): void {
    if (this.ingredients) {
      this.ingredients = this.ingredients.filter(
        (ing) => ing.id !== ingredient.id
      );
    }
  }

  hasIngredient(ingredient: Ingredient): boolean {
    return this.ingredients
      ? this.ingredients.some((ing) => ing.id === ingredient.id)
      : false;
  }

  hasIngredientByName(ingredientName: string): boolean {
    return this.ingredients
      ? this.ingredients.some((ing) =>
          ing.name.toLowerCase().includes(ingredientName.toLowerCase())
        )
      : false;
  }

  addAllergen(allergen: string): void {
    if (!this.allergens) {
      this.allergens = [];
    }
    if (!this.allergens.includes(allergen)) {
      this.allergens.push(allergen);
    }
  }

  removeAllergen(allergen: string): void {
    if (this.allergens) {
      this.allergens = this.allergens.filter((a) => a !== allergen);
    }
  }

  hasAllergen(allergen: string): boolean {
    return this.allergens ? this.allergens.includes(allergen) : false;
  }

  getAllergenList(): string {
    return this.allergens ? this.allergens.join(", ") : "Ninguno conocido";
  }

  setNutritionalInfo(info: {
    protein?: number;
    carbs?: number;
    fat?: number;
    fiber?: number;
    sodium?: number;
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

    return parts.length > 0 ? parts.join(", ") : "Información parcial";
  }

  getDietaryTags(): string[] {
    const tags: string[] = [];

    if (this.isVegetarian) tags.push("Vegetariano");
    if (this.isVegan) tags.push("Vegano");
    if (this.isGlutenFree) tags.push("Sin Gluten");
    if (this.isDairyFree) tags.push("Sin Lácteos");
    if (this.spiceLevel !== SpiceLevel.NONE)
      tags.push(`Picante: ${this.getSpiceLevelDisplayName()}`);

    return tags;
  }

  getDietaryTagsString(): string {
    const tags = this.getDietaryTags();
    return tags.length > 0 ? tags.join(", ") : "Sin restricciones especiales";
  }

  updateRating(newRating: number): void {
    if (newRating >= 0 && newRating <= 5) {
      this.rating = newRating;
    }
  }

  incrementOrderCount(): void {
    this.orderCount++;

    // Marcar como popular si supera cierto umbral
    if (this.orderCount >= 100) {
      this.isPopular = true;
    }
  }

  markAsSpecial(): void {
    this.isSpecial = true;
    this.status = DishStatus.SPECIAL;
  }

  markAsSeasonal(): void {
    this.status = DishStatus.SEASONAL;
  }

  markAsUnavailable(): void {
    this.isAvailable = false;
    this.status = DishStatus.UNAVAILABLE;
  }

  markAsAvailable(): void {
    this.isAvailable = true;
    this.status = DishStatus.AVAILABLE;
  }

  discontinue(): void {
    this.isAvailable = false;
    this.status = DishStatus.DISCONTINUED;
  }

  getPreparationTimeString(): string {
    if (!this.preparationTime) return "Tiempo no especificado";

    if (this.preparationTime < 60) {
      return `${this.preparationTime} minutos`;
    } else {
      const hours = Math.floor(this.preparationTime / 60);
      const minutes = this.preparationTime % 60;

      if (minutes === 0) {
        return `${hours} hora${hours > 1 ? "s" : ""}`;
      } else {
        return `${hours}h ${minutes}min`;
      }
    }
  }

  getCaloriesString(): string {
    return this.calories ? `${this.calories} cal` : "Calorías no disponibles";
  }

  getPriceFormatted(): string {
    return `$${this.price.toLocaleString()}`;
  }

  getPortionSizeString(): string {
    return this.portionSize
      ? `${this.portionSize}g`
      : "Porción no especificada";
  }

  isHealthy(): boolean {
    // Consideramos saludable si es vegetariano/vegano o tiene pocas calorías
    return (
      this.isVegetarian ||
      this.isVegan ||
      (this.calories !== undefined && this.calories < 400)
    );
  }

  getIngredientNames(): string[] {
    return this.ingredients ? this.ingredients.map((ing) => ing.name) : [];
  }

  getIngredientNamesString(): string {
    const names = this.getIngredientNames();
    return names.length > 0
      ? names.join(", ")
      : "Sin ingredientes especificados";
  }

  getCompleteDescription(): string {
    let description = this.description || "Sin descripción disponible";

    // Agregar información adicional
    const additionalInfo: string[] = [];

    if (this.isSpecial) additionalInfo.push("Plato especial");
    if (this.isPopular) additionalInfo.push("Muy popular");
    if (this.preparationTime)
      additionalInfo.push(`Preparación: ${this.getPreparationTimeString()}`);
    if (this.calories) additionalInfo.push(this.getCaloriesString());

    const dietaryTags = this.getDietaryTags();
    if (dietaryTags.length > 0) {
      additionalInfo.push(`Opciones: ${dietaryTags.join(", ")}`);
    }

    if (additionalInfo.length > 0) {
      description += ` | ${additionalInfo.join(" | ")}`;
    }

    return description;
  }
}
