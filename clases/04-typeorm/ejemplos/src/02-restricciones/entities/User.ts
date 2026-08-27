import { Entity, PrimaryGeneratedColumn, Column, Check, Index } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
  GUEST = "guest",
}

// Solo restricciones de base de datos (TypeORM) — sin class-validator todavía,
// eso se agrega en el tema siguiente (03-validacion) sobre esta misma entidad.
@Entity("users")
@Check(`"age" >= 18 AND "age" <= 120`)
@Check(`"salary" >= 0`)
@Index(["lastName", "firstName"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: false })
  firstName!: string;

  @Column({ length: 50, nullable: false })
  lastName!: string;

  // unique: true ya genera un índice único — no hace falta además un
  // @Unique(["username"]) a nivel de clase (duplicarlo rompe el
  // synchronize con "index already exists").
  @Column({ unique: true, length: 30, nullable: false })
  username!: string;

  @Column({ unique: true, length: 255, nullable: false })
  email!: string;

  @Column({ type: "int", unsigned: true })
  age!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  salary?: number;

  @Column({ type: "text", default: UserRole.USER })
  role!: UserRole;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdult(): boolean {
    return this.age >= 18;
  }
}
