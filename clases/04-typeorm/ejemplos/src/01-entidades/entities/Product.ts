import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int", default: 0 })
  stock!: number;

  @Column({ unique: true, length: 50 })
  sku!: string;

  @Column({ type: "boolean", default: true })
  isAvailable!: boolean;

  @Column({ type: "varchar", length: 50, nullable: true })
  category?: string;

  @Column({ type: "float", default: 0.0 })
  weight!: number;

  @Column({ type: "json", nullable: true })
  metadata?: {
    brand?: string;
    color?: string;
    size?: string;
    tags?: string[];
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
  generateSKU() {
    if (!this.sku) {
      this.sku = `PRD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  // Métodos de negocio
  calculateTotalValue(): number {
    return this.price * this.stock;
  }

  isInStock(): boolean {
    return this.stock > 0;
  }

  canBeSold(quantity: number): boolean {
    return this.isAvailable && this.stock >= quantity;
  }

  reduceStock(quantity: number): void {
    if (this.canBeSold(quantity)) {
      this.stock -= quantity;
    } else {
      throw new Error("Stock insuficiente o producto no disponible");
    }
  }

  addStock(quantity: number): void {
    this.stock += quantity;
  }
}
