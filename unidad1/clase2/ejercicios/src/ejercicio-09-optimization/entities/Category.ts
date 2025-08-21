import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

export enum CategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SEASONAL = "seasonal",
}

@Entity("categories")
@Index("idx_category_name", ["name"]) // Búsqueda por nombre
@Index("idx_category_slug", ["slug"]) // Búsqueda por slug
@Index("idx_category_status", ["status"]) // Filtrado por estado
@Index("idx_category_parent_order", ["parentId", "sortOrder"]) // Jerarquía ordenada
@Index("idx_category_active_products", ["status", "productCount"]) // Categorías con productos
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 200 })
  name!: string;

  @Column({ type: "varchar", unique: true, length: 200 })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({
    type: "varchar",
    length: 20,
    default: CategoryStatus.ACTIVE,
  })
  status!: CategoryStatus;

  @Column({ type: "integer", nullable: true })
  parentId!: number | null;

  @Column({ default: 0 })
  sortOrder!: number;

  @Column({ default: 0 })
  productCount!: number; // Campo desnormalizado para evitar COUNT()

  @Column({ default: 0 })
  activeProductCount!: number; // Campo desnormalizado para productos activos

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  averagePrice!: number; // Campo desnormalizado para evitar AVG()

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  iconUrl!: string | null;

  @Column({ type: "text", nullable: true })
  metaDescription!: string | null;

  @Column({ type: "text", nullable: true })
  metaKeywords!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación uno-a-muchos con productos
  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    lazy: true,
  })
  products!: Promise<Product[]>;

  // Métodos helper
  get isActive(): boolean {
    return this.status === CategoryStatus.ACTIVE;
  }

  get hasProducts(): boolean {
    return this.productCount > 0;
  }

  get hasActiveProducts(): boolean {
    return this.activeProductCount > 0;
  }

  get isRoot(): boolean {
    return this.parentId === null;
  }

  get isPopular(): boolean {
    return this.productCount >= 10;
  }

  // Método para actualizar estadísticas desnormalizadas
  updateStats(
    productCount: number,
    activeProductCount: number,
    averagePrice: number
  ) {
    this.productCount = productCount;
    this.activeProductCount = activeProductCount;
    this.averagePrice = averagePrice;
  }

  // Método para generar slug automáticamente
  generateSlug(): string {
    return this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  // Método para obtener URL amigable
  getUrl(): string {
    return `/category/${this.slug}`;
  }

  // Método para verificar si es categoría padre
  isParentCategory(): boolean {
    return this.productCount > 0 && this.parentId === null;
  }

  // Método para obtener nivel de jerarquía
  getLevel(): number {
    return this.parentId === null ? 1 : 2; // Simplificado para 2 niveles
  }
}
