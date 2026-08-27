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
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity("orders")
@Index("idx_order_user_status", ["userId", "status"]) // Consultas por usuario y estado
@Index("idx_order_status_date", ["status", "createdAt"]) // Consultas por estado y fecha
@Index("idx_order_total", ["total"]) // Ordenamiento por total
@Index("idx_order_date", ["createdAt"]) // Ordenamiento por fecha
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 20,
    default: "pending",
  })
  status!: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
  })
  total!: number;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  tax!: number;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  shipping!: number;

  @Column({ default: 0 })
  itemCount!: number; // Campo desnormalizado para evitar COUNT()

  @Column({ type: "text", nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación muchos-a-uno con usuario
  @Column()
  userId!: number; // FK explícita para optimización

  @ManyToOne(() => User, (user) => user.orders, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>;

  // Relación uno-a-muchos con items del pedido
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    lazy: true,
  })
  orderItems!: Promise<OrderItem[]>;
}
