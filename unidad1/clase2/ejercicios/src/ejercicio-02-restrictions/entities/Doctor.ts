import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
  Check,
} from "typeorm";
import {
  IsEmail,
  IsPhoneNumber,
  Min,
  Max,
  Length,
  IsEnum,
} from "class-validator";

export enum MedicalSpecialty {
  CARDIOLOGY = "cardiology",
  DERMATOLOGY = "dermatology",
  PEDIATRICS = "pediatrics",
  NEUROLOGY = "neurology",
  ORTHOPEDICS = "orthopedics",
  PSYCHIATRY = "psychiatry",
  ONCOLOGY = "oncology",
  EMERGENCY = "emergency",
  GENERAL_PRACTICE = "general_practice",
  SURGERY = "surgery",
}

export enum DoctorStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ON_LEAVE = "on_leave",
  RETIRED = "retired",
}

@Entity()
@Unique(["licenseNumber"])
@Unique(["email"])
@Check(`"yearsOfExperience" >= 0`)
@Check(`"yearsOfExperience" <= 60`)
@Check(`"consultationFee" >= 0`)
@Index(["specialty", "isAvailable"]) // Índice compuesto para búsquedas frecuentes
@Index(["hospital", "department"]) // Índice compuesto para organización
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  @Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
  firstName: string;

  @Column({ length: 100, nullable: false })
  @Length(2, 100, {
    message: "El apellido debe tener entre 2 y 100 caracteres",
  })
  lastName: string;

  @Column({ length: 20, unique: true, nullable: false })
  @Length(5, 20, {
    message: "El número de matrícula debe tener entre 5 y 20 caracteres",
  })
  licenseNumber: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
  })
  @IsEnum(MedicalSpecialty, { message: "Especialidad médica no válida" })
  @Index() // Índice simple para búsquedas por especialidad
  specialty: MedicalSpecialty;

  @Column({ type: "int", unsigned: true, default: 0 })
  @Min(0, { message: "Los años de experiencia no pueden ser negativos" })
  @Max(60, { message: "Los años de experiencia no pueden exceder 60 años" })
  yearsOfExperience: number;

  @Column({ type: "boolean", default: true })
  @Index() // Índice simple para filtrar médicos disponibles
  isAvailable: boolean;

  @Column({ length: 255, unique: true, nullable: false })
  @IsEmail({}, { message: "Debe proporcionar un email válido" })
  email: string;

  @Column({ length: 20, nullable: true })
  @IsPhoneNumber("AR", {
    message: "Debe proporcionar un número de teléfono argentino válido",
  })
  phone?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: DoctorStatus.ACTIVE,
  })
  @IsEnum(DoctorStatus, { message: "Estado del médico no válido" })
  status: DoctorStatus;

  @Column({ length: 150, nullable: true })
  hospital?: string;

  @Column({ length: 100, nullable: true })
  department?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @Min(0, { message: "El costo de consulta no puede ser negativo" })
  consultationFee: number;

  @Column({ type: "text", nullable: true })
  @Length(0, 1000, {
    message: "La descripción no puede exceder 1000 caracteres",
  })
  description?: string;

  @Column({ type: "date", nullable: true })
  graduationDate?: Date;

  @Column({ type: "time", default: "09:00:00" })
  workStartTime: string;

  @Column({ type: "time", default: "17:00:00" })
  workEndTime: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  @Min(0, { message: "El número de pacientes no puede ser negativo" })
  totalPatients: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  @Min(0, { message: "La calificación no puede ser negativa" })
  @Max(5, { message: "La calificación no puede exceder 5.00" })
  rating: number;

  @Column({ type: "boolean", default: false })
  isEmergencyDoctor: boolean;

  @Column({ type: "json", nullable: true })
  workingDays?: string[]; // ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    firstName?: string,
    lastName?: string,
    licenseNumber?: string,
    specialty?: MedicalSpecialty,
    email?: string
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.licenseNumber = licenseNumber || "";
    this.specialty = specialty || MedicalSpecialty.GENERAL_PRACTICE;
    this.email = email || "";
  }

  // Métodos de utilidad
  getFullName(): string {
    return `Dr. ${this.firstName} ${this.lastName}`;
  }

  getSpecialtyDisplayName(): string {
    const specialtyNames: Record<MedicalSpecialty, string> = {
      [MedicalSpecialty.CARDIOLOGY]: "Cardiología",
      [MedicalSpecialty.DERMATOLOGY]: "Dermatología",
      [MedicalSpecialty.PEDIATRICS]: "Pediatría",
      [MedicalSpecialty.NEUROLOGY]: "Neurología",
      [MedicalSpecialty.ORTHOPEDICS]: "Ortopedia",
      [MedicalSpecialty.PSYCHIATRY]: "Psiquiatría",
      [MedicalSpecialty.ONCOLOGY]: "Oncología",
      [MedicalSpecialty.EMERGENCY]: "Emergencias",
      [MedicalSpecialty.GENERAL_PRACTICE]: "Medicina General",
      [MedicalSpecialty.SURGERY]: "Cirugía",
    };
    return specialtyNames[this.specialty];
  }

  getExperienceLevel(): string {
    if (this.yearsOfExperience < 2) return "Junior";
    if (this.yearsOfExperience < 10) return "Intermedio";
    if (this.yearsOfExperience < 20) return "Senior";
    return "Experto";
  }

  isHighlyRated(): boolean {
    return this.rating >= 4.5;
  }

  getStatusDisplayName(): string {
    const statusNames: Record<DoctorStatus, string> = {
      [DoctorStatus.ACTIVE]: "Activo",
      [DoctorStatus.INACTIVE]: "Inactivo",
      [DoctorStatus.ON_LEAVE]: "De Licencia",
      [DoctorStatus.RETIRED]: "Jubilado",
    };
    return statusNames[this.status];
  }

  canTakePatients(): boolean {
    return this.isAvailable && this.status === DoctorStatus.ACTIVE;
  }

  updateRating(newRating: number): void {
    if (newRating >= 0 && newRating <= 5) {
      this.rating = newRating;
    }
  }

  incrementPatientCount(): void {
    this.totalPatients++;
  }
}
