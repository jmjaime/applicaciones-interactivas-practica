import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Check,
  Index,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import {
  Length,
  IsOptional,
  IsUrl,
  IsHexColor,
  Matches,
} from "class-validator";

@Entity("categories")
@Unique(["name"])
@Unique(["slug"])
@Check(`"priority" >= 1 AND "priority" <= 10`)
@Check(`"discount_percentage" >= 0 AND "discount_percentage" <= 100`)
@Index(["isActive", "priority"])
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false })
  @Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
  name!: string;

  @Column({ unique: true, length: 120 })
  @Length(2, 120, { message: "El slug debe tener entre 2 y 120 caracteres" })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "El slug debe contener solo letras minúsculas, números y guiones",
  })
  slug!: string;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @Length(0, 500, {
    message: "La descripción no puede superar los 500 caracteres",
  })
  description?: string;

  @Column({ type: "varchar", length: 7, nullable: true })
  @IsOptional()
  @IsHexColor({ message: "El color debe ser un código hexadecimal válido" })
  color?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  @IsOptional()
  @IsUrl({}, { message: "Debe proporcionar una URL válida para la imagen" })
  imageUrl?: string;

  @Column({ type: "int", default: 5 })
  @Length(1, 10, { message: "La prioridad debe estar entre 1 y 10" })
  priority!: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discountPercentage!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "boolean", default: false })
  isFeatured!: boolean;

  @Column({ type: "int", default: 0 })
  productCount!: number;

  @Column({ type: "json", nullable: true })
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    customAttributes?: Record<string, any>;
  };

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  // Hooks del ciclo de vida
  @BeforeInsert()
  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    if (!this.slug && this.name) {
      this.slug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  validatePriority() {
    if (this.priority < 1 || this.priority > 10) {
      throw new Error("La prioridad debe estar entre 1 y 10");
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  validateDiscountPercentage() {
    if (this.discountPercentage < 0 || this.discountPercentage > 100) {
      throw new Error("El porcentaje de descuento debe estar entre 0 y 100");
    }
  }

  // Métodos de negocio
  getDisplayName(): string {
    return this.isFeatured ? `⭐ ${this.name}` : this.name;
  }

  hasDiscount(): boolean {
    return this.discountPercentage > 0;
  }

  getPriorityLevel(): string {
    if (this.priority >= 8) return "Alta";
    if (this.priority >= 5) return "Media";
    return "Baja";
  }

  incrementProductCount(): void {
    this.productCount += 1;
  }

  decrementProductCount(): void {
    if (this.productCount > 0) {
      this.productCount -= 1;
    }
  }

  getUrl(): string {
    return `/categories/${this.slug}`;
  }
}
