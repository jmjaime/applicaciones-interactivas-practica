import { Entity, PrimaryGeneratedColumn, Column, Check, Index } from "typeorm";

export enum PlanType {
  FREE = "free",
  PREMIUM = "premium",
  FAMILY = "family",
}

// Solo restricciones de base de datos (TypeORM) — sin class-validator
// todavía, eso se agrega en el ejercicio siguiente (03-validacion) sobre
// esta misma entidad.
@Entity("users")
@Check(`"age" >= 13 AND "age" <= 120`)
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

  @Column({ type: "text", default: PlanType.FREE })
  plan!: PlanType;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
