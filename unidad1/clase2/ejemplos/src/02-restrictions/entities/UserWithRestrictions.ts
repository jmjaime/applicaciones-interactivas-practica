import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Check,
  Index,
} from "typeorm";
import {
  IsEmail,
  MinLength,
  Min,
  Max,
  IsOptional,
  Length,
  IsEnum,
  IsBoolean,
} from "class-validator";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
  GUEST = "guest",
}

@Entity("users_with_restrictions")
@Unique(["email"])
@Unique(["username"])
@Check(`"age" >= 18 AND "age" <= 120`)
@Check(`"salary" >= 0`)
@Index(["lastName", "firstName"])
@Index(["email"])
export class UserWithRestrictions {
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
  @IsOptional()
  @Min(0, { message: "El salario no puede ser negativo" })
  salary?: number;

  @Column({ type: "text", default: UserRole.USER })
  @IsEnum(UserRole, { message: "El rol debe ser válido" })
  role!: UserRole;

  @Column({ type: "boolean", default: true })
  @IsBoolean({ message: "isActive debe ser un valor booleano" })
  isActive!: boolean;

  @Column({ type: "varchar", length: 20, nullable: true })
  @IsOptional()
  @Length(10, 20, {
    message: "El teléfono debe tener entre 10 y 20 caracteres",
  })
  phone?: string;

  @Column({ type: "date", nullable: true })
  @IsOptional()
  birthDate?: Date;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @Length(0, 500, {
    message: "La biografía no puede superar los 500 caracteres",
  })
  biography?: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  // Métodos de negocio
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdult(): boolean {
    return this.age >= 18;
  }

  canModerate(): boolean {
    return this.role === UserRole.ADMIN || this.role === UserRole.MODERATOR;
  }

  getSalaryCategory(): string {
    if (!this.salary) return "No especificado";
    if (this.salary < 30000) return "Entrada";
    if (this.salary < 60000) return "Intermedio";
    if (this.salary < 100000) return "Senior";
    return "Ejecutivo";
  }
}
