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

@Entity("products")
@Index("idx_product_name", ["name"]) // Búsqueda por nombre
@Index("idx_product_sku", ["sku"]) // Búsqueda por SKU
@Index("idx_product_category_price", ["categoryId", "price"]) // Consultas por categoría y precio
@Index("idx_product_active_stock", ["isActive", "stock"]) // Productos disponibles
@Index("idx_product_created", ["createdAt"]) // Ordenamiento por fecha
@Index("idx_product_rating", ["rating"]) // Ordenamiento por rating
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 300 })
  name!: string;

  @Column({ unique: true, length: 50 })
  sku!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({ default: 0 })
  stock!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0,
  })
  rating!: number;

  @Column({ default: 0 })
  totalSales!: number; // Campo desnormalizado para evitar SUM()

  @Column({ default: 0 })
  reviewCount!: number; // Campo desnormalizado para evitar COUNT()

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
}
