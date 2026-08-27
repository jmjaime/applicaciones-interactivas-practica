import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  PAYMENT = "payment",
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

@Entity()
export class TransactionRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: TransactionType;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column({ default: TransactionStatus.PENDING })
  status!: TransactionStatus;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  reference?: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", nullable: true })
  completedAt?: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user!: User;

  // Método para mostrar información de la transacción
  displayInfo(): string {
    return `${this.type.toUpperCase()} - $${this.amount} (${this.status}) - ${
      this.description || "Sin descripción"
    }`;
  }

  // Método para marcar como completada
  markAsCompleted(): void {
    this.status = TransactionStatus.COMPLETED;
    this.completedAt = new Date();
  }

  // Método para marcar como fallida
  markAsFailed(): void {
    this.status = TransactionStatus.FAILED;
  }
}
