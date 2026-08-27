import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Profile } from "./Profile";

// Misma entidad conceptual que 01-entidades/entities/User.ts, con el agregado
// de la relación 1:1 — separada en su propio archivo para que el ejemplo de
// entidades no muestre un decorador de relación antes de tiempo.
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ default: "user" })
  role!: "admin" | "user" | "guest";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { nullable: true })
  profile?: Profile;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }
}
