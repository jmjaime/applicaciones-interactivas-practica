import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("categories")
@Index("idx_category_name", ["name"]) // Índice para búsquedas por nombre
@Index("idx_category_slug", ["slug"]) // Índice para URLs amigables
@Index("idx_category_active", ["isActive"]) // Índice para filtrado por estado
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  name!: string;

  @Column({ unique: true, length: 250 })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 0 })
  productCount!: number; // Campo desnormalizado para evitar COUNT()

  @CreateDateColumn()
  createdAt!: Date;

  // Relación uno-a-muchos con productos
  @OneToMany(() => Product, (product) => product.category, {
    lazy: true, // Lazy por defecto para optimización
  })
  products!: Promise<Product[]>;
}
