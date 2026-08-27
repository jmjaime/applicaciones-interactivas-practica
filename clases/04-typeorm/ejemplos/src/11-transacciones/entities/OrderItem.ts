import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  unitPrice!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product!: Product;

  // Método para calcular el subtotal
  getSubtotal(): number {
    return Number(this.unitPrice) * this.quantity;
  }

  // Método para actualizar el subtotal
  updateSubtotal(): void {
    this.subtotal = this.getSubtotal();
  }

  // Método para mostrar información del item
  displayInfo(): string {
    return `${this.product?.name || "Producto"} x${this.quantity} - $${
      this.unitPrice
    } c/u = $${this.subtotal}`;
  }
}
