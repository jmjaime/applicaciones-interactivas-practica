import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Account } from "./Account";
import { TransactionRecord } from "./TransactionRecord";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Account[];

  @OneToMany(() => TransactionRecord, (transaction) => transaction.user)
  transactions!: TransactionRecord[];

  // Método para mostrar información del usuario
  displayInfo(): string {
    return `${this.name} (${this.email}) - Balance: $${this.balance}`;
  }

  // Método para verificar si tiene fondos suficientes
  hasSufficientFunds(amount: number): boolean {
    return this.balance >= amount;
  }
}
