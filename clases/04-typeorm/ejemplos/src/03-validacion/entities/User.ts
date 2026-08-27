import { Entity, PrimaryGeneratedColumn, Column, Check, Index } from "typeorm";
import { IsEmail, Min, Max, Length, IsEnum } from "class-validator";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
  GUEST = "guest",
}

// Misma entidad que 02-restricciones/entities/User.ts — se le agregan
// decoradores de class-validator (@IsEmail, @Length, @Min/@Max, @IsEnum)
// encima de los que ya tenía. Son dos capas independientes: los @Check/
// unique de abajo los revisa SQLite al guardar; los de class-validator los
// revisa la aplicación ANTES de siquiera intentar guardar.
@Entity("users")
@Check(`"age" >= 18 AND "age" <= 120`)
@Check(`"salary" >= 0`)
@Index(["lastName", "firstName"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: false })
  @Length(2, 50, { message: "El nombre debe tener entre 2 y 50 caracteres" })
  firstName!: string;

  @Column({ length: 50, nullable: false })
  @Length(2, 50, { message: "El apellido debe tener entre 2 y 50 caracteres" })
  lastName!: string;

  @Column({ unique: true, length: 30, nullable: false })
  @Length(3, 30, { message: "El username debe tener entre 3 y 30 caracteres" })
  username!: string;

  @Column({ unique: true, length: 255, nullable: false })
  @IsEmail({}, { message: "Debe proporcionar un email válido" })
  email!: string;

  @Column({ type: "int", unsigned: true })
  @Min(18, { message: "La edad mínima es 18 años" })
  @Max(120, { message: "La edad máxima es 120 años" })
  age!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  @Min(0, { message: "El salario no puede ser negativo" })
  salary?: number;

  @Column({ type: "text", default: UserRole.USER })
  @IsEnum(UserRole, { message: "El rol debe ser válido" })
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
