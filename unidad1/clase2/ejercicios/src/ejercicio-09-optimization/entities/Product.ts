import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { OrderItem } from "./OrderItem";
import { Review } from "./Review";

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DISCONTINUED = "discontinued",
  OUT_OF_STOCK = "out_of_stock",
}

export enum ProductCondition {
  NEW = "new",
  USED = "used",
  REFURBISHED = "refurbished",
}

@Entity("products")
@Index("idx_product_name", ["name"]) // Búsqueda por nombre
@Index("idx_product_sku", ["sku"]) // Búsqueda por SKU
@Index("idx_product_category_price", ["categoryId", "price"]) // Consultas por categoría y precio
@Index("idx_product_category_rating", ["categoryId", "rating"]) // Consultas por categoría y rating
@Index("idx_product_active_stock", ["status", "stock"]) // Productos disponibles
@Index("idx_product_created", ["createdAt"]) // Ordenamiento por fecha
@Index("idx_product_rating_reviews", ["rating", "reviewCount"]) // Ordenamiento por rating y reseñas
@Index("idx_product_price_range", ["price"]) // Ordenamiento por precio
@Index("idx_product_sales_popularity", ["totalSales", "rating"]) // Productos populares
@Index("idx_product_brand_category", ["brand", "categoryId"]) // Consultas por marca y categoría
@Index("idx_product_featured", ["isFeatured", "status"]) // Productos destacados
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 300 })
  name!: string;

  @Column({ type: "varchar", unique: true, length: 50 })
  sku!: string;

  @Column({ type: "varchar", length: 100 })
  brand!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "text", nullable: true })
  shortDescription!: string | null;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  comparePrice!: number | null; // Precio de comparación (precio original)

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  cost!: number; // Costo para cálculo de margen

  @Column({ default: 0 })
  stock!: number;

  @Column({ default: 0 })
  reservedStock!: number; // Stock reservado en carritos

  @Column({ default: 0 })
  minStock!: number; // Stock mínimo para alertas

  @Column({
    type: "varchar",
    length: 20,
    default: ProductStatus.ACTIVE,
  })
  status!: ProductStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: ProductCondition.NEW,
  })
  condition!: ProductCondition;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ default: false })
  isDigital!: boolean;

  @Column({
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0,
  })
  rating!: number;

  @Column({ default: 0 })
  reviewCount!: number; // Campo desnormalizado para evitar COUNT()

  @Column({ default: 0 })
  totalSales!: number; // Campo desnormalizado para evitar SUM()

  @Column({ default: 0 })
  viewCount!: number; // Campo desnormalizado para analytics

  @Column({ default: 0 })
  favoriteCount!: number; // Campo desnormalizado para favoritos

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    default: 0,
  })
  weight!: number; // Peso en kg

  @Column({ type: "varchar", length: 200, nullable: true })
  dimensions!: string | null; // Dimensiones como string "LxWxH"

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl!: string | null;

  @Column({ type: "text", nullable: true })
  imageUrls!: string | null; // JSON array de URLs

  @Column({ type: "text", nullable: true })
  tags!: string | null; // Tags separados por coma

  @Column({ type: "text", nullable: true })
  metaDescription!: string | null;

  @Column({ type: "text", nullable: true })
  metaKeywords!: string | null;

  @Column({ type: "text", nullable: true })
  attributes!: string | null; // JSON de atributos adicionales

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación muchos-a-uno con categoría
  @Column()
  categoryId!: number; // FK explícita para optimización

  @ManyToOne(() => Category, (category) => category.products, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categoryId" })
  category!: Promise<Category>;

  // Relación uno-a-muchos con items de pedido
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {
    lazy: true,
  })
  orderItems!: Promise<OrderItem[]>;

  // Relación uno-a-muchos con reseñas
  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
    lazy: true,
  })
  reviews!: Promise<Review[]>;

  // Métodos helper
  get isActive(): boolean {
    return this.status === ProductStatus.ACTIVE;
  }

  get isAvailable(): boolean {
    return this.isActive && this.availableStock > 0;
  }

  get availableStock(): number {
    return this.stock - this.reservedStock;
  }

  get isLowStock(): boolean {
    return this.availableStock <= this.minStock;
  }

  get isOutOfStock(): boolean {
    return this.availableStock <= 0;
  }

  get hasDiscount(): boolean {
    return this.comparePrice !== null && this.comparePrice > this.price;
  }

  get discountAmount(): number {
    if (!this.hasDiscount) return 0;
    return this.comparePrice! - this.price;
  }

  get discountPercentage(): number {
    if (!this.hasDiscount) return 0;
    return Math.round((this.discountAmount / this.comparePrice!) * 100);
  }

  get profitMargin(): number {
    return this.price - this.cost;
  }

  get profitMarginPercentage(): number {
    if (this.price === 0) return 0;
    return Math.round((this.profitMargin / this.price) * 100);
  }

  get isHighRated(): boolean {
    return this.rating >= 4.0 && this.reviewCount >= 5;
  }

  get isBestseller(): boolean {
    return this.totalSales >= 100;
  }

  get isPopular(): boolean {
    return this.viewCount >= 1000 || this.favoriteCount >= 50;
  }

  get priceFormatted(): string {
    return `$${this.price.toFixed(2)}`;
  }

  get comparePriceFormatted(): string | null {
    return this.comparePrice ? `$${this.comparePrice.toFixed(2)}` : null;
  }

  // Método para actualizar estadísticas desnormalizadas
  updateStats(
    rating: number,
    reviewCount: number,
    totalSales: number,
    viewCount: number,
    favoriteCount: number
  ) {
    this.rating = rating;
    this.reviewCount = reviewCount;
    this.totalSales = totalSales;
    this.viewCount = viewCount;
    this.favoriteCount = favoriteCount;
  }

  // Método para incrementar vistas
  incrementViews() {
    this.viewCount++;
  }

  // Método para reservar stock
  reserveStock(quantity: number): boolean {
    if (this.availableStock >= quantity) {
      this.reservedStock += quantity;
      return true;
    }
    return false;
  }

  // Método para liberar stock reservado
  releaseStock(quantity: number) {
    this.reservedStock = Math.max(0, this.reservedStock - quantity);
  }

  // Método para confirmar venta
  confirmSale(quantity: number): boolean {
    if (this.reservedStock >= quantity) {
      this.reservedStock -= quantity;
      this.stock -= quantity;
      this.totalSales += quantity;
      return true;
    }
    return false;
  }

  // Método para obtener tags parseados
  getParsedTags(): string[] {
    if (!this.tags) return [];
    return this.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }

  // Método para setear tags
  setTags(tags: string[]) {
    this.tags = tags.join(", ");
  }

  // Método para obtener atributos parseados
  getParsedAttributes(): Record<string, any> {
    if (!this.attributes) return {};
    try {
      return JSON.parse(this.attributes);
    } catch {
      return {};
    }
  }

  // Método para setear atributos
  setAttributes(attributes: Record<string, any>) {
    this.attributes = JSON.stringify(attributes);
  }

  // Método para obtener URLs de imágenes parseadas
  getParsedImageUrls(): string[] {
    if (!this.imageUrls) return this.imageUrl ? [this.imageUrl] : [];
    try {
      return JSON.parse(this.imageUrls);
    } catch {
      return this.imageUrl ? [this.imageUrl] : [];
    }
  }

  // Método para setear URLs de imágenes
  setImageUrls(urls: string[]) {
    this.imageUrls = JSON.stringify(urls);
    if (urls.length > 0) {
      this.imageUrl = urls[0]; // Primera imagen como principal
    }
  }

  // Método para generar URL amigable
  getUrl(): string {
    const slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    return `/product/${slug}-${this.id}`;
  }

  // Método para verificar si necesita restock
  needsRestock(): boolean {
    return this.isLowStock && this.isActive;
  }

  // Método para calcular precio con descuento
  getPriceWithDiscount(discountPercentage: number): number {
    return this.price * (1 - discountPercentage / 100);
  }
}
