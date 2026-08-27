import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salary?: number;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ default: "user" })
  role!: "admin" | "user" | "guest";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Método para obtener el nombre completo
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Método para verificar si es administrador
  isAdmin(): boolean {
    return this.role === "admin";
  }
}
