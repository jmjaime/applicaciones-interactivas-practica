import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30, unique: true })
  username!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  walletBalance!: number;
}
