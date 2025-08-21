import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum AccountType {
  CHECKING = "checking",
  SAVINGS = "savings",
  CREDIT = "credit",
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  accountNumber!: string;

  @Column({ default: AccountType.CHECKING })
  type!: AccountType;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  // Método para mostrar información de la cuenta
  displayInfo(): string {
    return `${this.accountNumber} (${this.type}) - Balance: $${this.balance}`;
  }

  // Método para verificar si tiene fondos suficientes
  hasSufficientFunds(amount: number): boolean {
    return this.balance >= amount;
  }

  // Método para debitar cuenta
  debit(amount: number): void {
    if (!this.hasSufficientFunds(amount)) {
      throw new Error(
        `Fondos insuficientes. Balance actual: $${this.balance}, monto requerido: $${amount}`
      );
    }
    this.balance = Number(this.balance) - Number(amount);
  }

  // Método para acreditar cuenta
  credit(amount: number): void {
    this.balance = Number(this.balance) + Number(amount);
  }
}
