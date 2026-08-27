import { Entity, PrimaryGeneratedColumn, Column, Check, Index } from "typeorm";
import { IsEmail, Min, Max, Length, IsEnum } from "class-validator";

export enum PlanType {
  FREE = "free",
  PREMIUM = "premium",
  FAMILY = "family",
}

// Misma entidad que 02-restricciones/entities/User.ts — se le agregan
// decoradores de class-validator (@IsEmail, @Length, @Min/@Max, @IsEnum)
// encima de los que ya tenía. Son dos capas independientes: los @Check/
// unique de abajo los revisa SQLite al guardar; los de class-validator los
// revisa la aplicación ANTES de siquiera intentar guardar.
@Entity("users")
@Check(`"age" >= 13 AND "age" <= 120`)
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
  @Min(13, { message: "La edad mínima para registrarse es 13 años" })
  @Max(120, { message: "La edad máxima es 120 años" })
  age!: number;

  @Column({ type: "text", default: PlanType.FREE })
  @IsEnum(PlanType, { message: "El plan debe ser válido" })
  plan!: PlanType;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
