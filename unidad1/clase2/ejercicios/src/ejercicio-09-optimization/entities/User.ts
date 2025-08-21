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
import { Review } from "./Review";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
  SUSPENDED = "suspended",
}

export enum UserRole {
  CUSTOMER = "customer",
  PREMIUM = "premium",
  ADMIN = "admin",
}

@Entity("users")
@Index("idx_user_email", ["email"]) // Índice único para búsquedas rápidas
@Index("idx_user_status_created", ["status", "createdAt"]) // Consultas por estado y fecha
@Index("idx_user_last_login", ["lastLoginAt"]) // Ordenamiento por último login
@Index("idx_user_role_status", ["role", "status"]) // Consultas por rol y estado
@Index("idx_user_total_spent", ["totalSpent"]) // Ordenamiento por gasto total
@Index("idx_user_created", ["createdAt"]) // Ordenamiento por fecha de registro
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  firstName!: string;

  @Column({ type: "varchar", length: 100 })
  lastName!: string;

  @Column({ type: "varchar", unique: true, length: 255 })
  email!: string;

  @Column({ type: "varchar", length: 255, select: false }) // No incluir en SELECT por defecto
  password!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: UserRole.CUSTOMER,
  })
  role!: UserRole;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: 0,
  })
  totalSpent!: number; // Campo desnormalizado para evitar SUM()

  @Column({ default: 0 })
  orderCount!: number; // Campo desnormalizado para evitar COUNT()

  @Column({ default: 0 })
  reviewCount!: number; // Campo desnormalizado para evitar COUNT()

  @Column({
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0,
  })
  averageRating!: number; // Campo desnormalizado para evitar AVG()

  @Column({ type: "datetime", nullable: true })
  lastLoginAt!: Date | null;

  @Column({ type: "datetime", nullable: true })
  lastOrderAt!: Date | null; // Para identificar usuarios activos

  @Column({ type: "varchar", length: 100, nullable: true })
  phone!: string | null;

  @Column({ type: "date", nullable: true })
  birthday!: Date | null;

  @Column({ type: "varchar", length: 2, default: "US" })
  countryCode!: string;

  @Column({ type: "varchar", length: 10, default: "USD" })
  preferredCurrency!: string;

  @Column({ type: "text", nullable: true })
  preferences!: string | null; // JSON serializado

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación uno-a-muchos con pedidos
  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    lazy: true, // Lazy loading para evitar N+1
  })
  orders!: Promise<Order[]>;

  // Relación uno-a-muchos con reseñas
  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
    lazy: true,
  })
  reviews!: Promise<Review[]>;

  // Métodos helper
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  get isPremium(): boolean {
    return this.role === UserRole.PREMIUM || this.role === UserRole.ADMIN;
  }

  get isHighValueCustomer(): boolean {
    return this.totalSpent >= 1000;
  }

  get loyaltyTier(): string {
    if (this.totalSpent >= 5000) return "platinum";
    if (this.totalSpent >= 2000) return "gold";
    if (this.totalSpent >= 500) return "silver";
    return "bronze";
  }

  // Método para actualizar estadísticas desnormalizadas
  updateStats(
    orderCount: number,
    totalSpent: number,
    reviewCount: number,
    averageRating: number
  ) {
    this.orderCount = orderCount;
    this.totalSpent = totalSpent;
    this.reviewCount = reviewCount;
    this.averageRating = averageRating;
  }

  // Método para verificar si el usuario está activo
  isActiveUser(): boolean {
    if (!this.lastLoginAt) return false;
    const daysSinceLastLogin =
      (Date.now() - this.lastLoginAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceLastLogin <= 30; // Activo si se logueó en los últimos 30 días
  }

  // Método para obtener preferencias parseadas
  getParsedPreferences(): Record<string, any> {
    if (!this.preferences) return {};
    try {
      return JSON.parse(this.preferences);
    } catch {
      return {};
    }
  }

  // Método para setear preferencias
  setPreferences(preferences: Record<string, any>) {
    this.preferences = JSON.stringify(preferences);
  }
}
