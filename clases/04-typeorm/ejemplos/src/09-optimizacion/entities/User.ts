import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity("users")
@Index("idx_user_email", ["email"]) // Índice único en email para búsquedas rápidas
@Index("idx_user_status_created", ["status", "createdAt"]) // Índice compuesto para consultas comunes
@Index("idx_user_last_login", ["lastLoginAt"]) // Índice para ordenamiento por último login
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: "active",
  })
  status!: "active" | "inactive" | "banned";

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  totalSpent!: number;

  @Column({ type: "datetime", nullable: true })
  lastLoginAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación uno-a-muchos con pedidos
  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    // Por defecto lazy para evitar N+1
    lazy: true,
  })
  orders!: Promise<Order[]>;

  // Método helper para obtener nombre completo
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
