import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  plan!: string;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  price!: number;

  @ManyToOne(() => User)
  user!: User;
}
