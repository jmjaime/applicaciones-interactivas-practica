import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum PlanType {
  FREE = "free",
  PREMIUM = "premium",
  FAMILY = "family",
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  plan!: PlanType;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  monthlyPrice!: number;

  @Column({ type: "date" })
  startDate!: string;

  // @OneToOne + @JoinColumn generan la FK con UNIQUE automáticamente — es
  // lo que la distingue de @ManyToOne (misma FK, sin esa restricción), y
  // lo que garantiza que un mismo User no pueda tener dos Subscription.
  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn()
  user!: User;
}
