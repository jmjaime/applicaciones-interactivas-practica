import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column({ default: 0 })
  stock!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems!: OrderItem[];

  // Método para mostrar información del producto
  displayInfo(): string {
    return `${this.name} - $${this.price} (Stock: ${this.stock})`;
  }

  // Método para verificar si hay stock suficiente
  hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }

  // Método para reducir stock
  reduceStock(quantity: number): void {
    if (!this.hasStock(quantity)) {
      throw new Error(
        `Stock insuficiente. Stock actual: ${this.stock}, cantidad requerida: ${quantity}`
      );
    }
    this.stock -= quantity;
  }

  // Método para aumentar stock
  increaseStock(quantity: number): void {
    this.stock += quantity;
  }
}
