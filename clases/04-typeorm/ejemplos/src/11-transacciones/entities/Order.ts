import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderNumber!: string;

  @Column({ default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  total!: number;

  @Column({ nullable: true })
  notes?: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];

  // Método para mostrar información del pedido
  displayInfo(): string {
    return `Order #${this.orderNumber} - Total: $${this.total} (${this.status})`;
  }

  // Método para calcular el total del pedido
  calculateTotal(): number {
    if (!this.items || this.items.length === 0) {
      return 0;
    }
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  // Método para actualizar el total
  updateTotal(): void {
    this.total = this.calculateTotal();
  }

  // Método para confirmar el pedido
  confirm(): void {
    this.status = OrderStatus.CONFIRMED;
  }

  // Método para cancelar el pedido
  cancel(): void {
    this.status = OrderStatus.CANCELLED;
  }
}
