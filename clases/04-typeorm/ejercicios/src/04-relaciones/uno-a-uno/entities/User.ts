import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Subscription } from "./Subscription";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30, unique: true })
  username!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @OneToOne(() => Subscription, (subscription) => subscription.user)
  subscription?: Subscription;
}
