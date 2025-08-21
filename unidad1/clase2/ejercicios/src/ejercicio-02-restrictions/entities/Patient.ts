import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  Index,
  Unique,
  Check
} from "typeorm";
import { IsEmail, IsPhoneNumber, Length, IsEnum, IsDate, Min, Max } from "class-validator";

export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-"
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export enum InsuranceType {
  OSDE = "osde",
  SWISS_MEDICAL = "swiss_medical",
  MEDICUS = "medicus",
  GALENO = "galeno",
  OMINT = "omint",
  SANCOR = "sancor",
  UNION_PERSONAL = "union_personal",
  OBRA_SOCIAL_EMPLEADOS_PUBLICOS = "obra_social_empleados_publicos",
  PAMI = "pami",
  NONE = "none"
}

export enum PatientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DECEASED = "deceased",
  TRANSFERRED = "transferred"
}

@Entity()
@Unique(["documentNumber"])
@Unique(["email"])
@Check(`"age" >= 0`)
@Check(`"age" <= 150`)
@Check(`"weight" > 0`)
@Check(`"height" > 0`)
@Index(["bloodType"]) // Índice simple para búsquedas de compatibilidad sanguínea
@Index(["insuranceType", "insuranceNumber"]) // Índice compuesto para verificación de seguro
@Index(["status", "isActive"]) // Índice compuesto para filtros de estado
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  @Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
  firstName: string;

  @Column({ length: 100, nullable: false })
  @Length(2, 100, { message: "El apellido debe tener entre 2 y 100 caracteres" })
  lastName: string;

  @Column({ length: 20, unique: true, nullable: false })
  @Length(7, 20, { message: "El número de documento debe tener entre 7 y 20 caracteres" })
  documentNumber: string;

  @Column({ 
    type: "varchar", 
    nullable: false
  })
  @IsEnum(BloodType, { message: "Tipo de sangre no válido" })
  @Index() // Índice simple para búsquedas por tipo de sangre
  bloodType: BloodType;

  @Column({ type: "date", nullable: false })
  birthDate: Date;

  @Column({ type: "int", unsigned: true, nullable: false })
  @Min(0, { message: "La edad no puede ser negativa" })
  @Max(150, { message: "La edad no puede exceder 150 años" })
  age: number;

  @Column({ 
    type: "varchar", 
    nullable: false
  })
  @IsEnum(Gender, { message: "Género no válido" })
  gender: Gender;

  @Column({ length: 255, unique: true, nullable: true })
  @IsEmail({}, { message: "Debe proporcionar un email válido" })
  email?: string;

  @Column({ length: 20, nullable: true })
  @IsPhoneNumber("AR", { message: "Debe proporcionar un número de teléfono argentino válido" })
  phone?: string;

  @Column({ length: 20, nullable: true })
  emergencyPhone?: string;

  @Column({ length: 200, nullable: false })
  @Length(5, 200, { message: "La dirección debe tener entre 5 y 200 caracteres" })
  address: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @Column({ length: 50, nullable: true })
  province?: string;

  @Column({ length: 10, nullable: true })
  postalCode?: string;

  @Column({ 
    type: "varchar", 
    default: InsuranceType.NONE
  })
  @IsEnum(InsuranceType, { message: "Tipo de obra social no válido" })
  insuranceType: InsuranceType;

  @Column({ length: 50, nullable: true })
  @Length(0, 50, { message: "El número de obra social no puede exceder 50 caracteres" })
  insuranceNumber?: string;

  @Column({ length: 100, nullable: true })
  insurancePlan?: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  @Min(0, { message: "El peso no puede ser negativo" })
  @Max(999, { message: "El peso no puede exceder 999 kg" })
  weight?: number; // en kg

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  @Min(0, { message: "La altura no puede ser negativa" })
  @Max(999, { message: "La altura no puede exceder 999 cm" })
  height?: number; // en cm

  @Column({ type: "text", nullable: true })
  @Length(0, 2000, { message: "El historial médico no puede exceder 2000 caracteres" })
  medicalHistory?: string;

  @Column({ type: "text", nullable: true })
  @Length(0, 1000, { message: "Las alergias no pueden exceder 1000 caracteres" })
  allergies?: string;

  @Column({ type: "text", nullable: true })
  @Length(0, 1000, { message: "Los medicamentos no pueden exceder 1000 caracteres" })
  currentMedications?: string;

  @Column({ 
    type: "varchar", 
    default: PatientStatus.ACTIVE
  })
  @IsEnum(PatientStatus, { message: "Estado del paciente no válido" })
  status: PatientStatus;

  @Column({ type: "boolean", default: true })
  @Index() // Índice simple para filtrar pacientes activos
  isActive: boolean;

  @Column({ length: 100, nullable: true })
  emergencyContactName?: string;

  @Column({ length: 100, nullable: true })
  emergencyContactRelation?: string;

  @Column({ length: 20, nullable: true })
  emergencyContactPhone?: string;

  @Column({ type: "datetime", nullable: true })
  lastVisit?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  @Min(0, { message: "El número de visitas no puede ser negativo" })
  totalVisits: number;

  @Column({ type: "json", nullable: true })
  chronicConditions?: string[]; // Array de condiciones crónicas

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    firstName?: string,
    lastName?: string,
    documentNumber?: string,
    bloodType?: BloodType,
    birthDate?: Date,
    gender?: Gender
  ) {
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.documentNumber = documentNumber || "";
    this.bloodType = bloodType || BloodType.O_POSITIVE;
    this.birthDate = birthDate || new Date();
    this.gender = gender || Gender.OTHER;
    this.age = this.calculateAge();
  }

  // Métodos de utilidad
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  updateAge(): void {
    this.age = this.calculateAge();
  }

  getBloodTypeCompatibility(): BloodType[] {
    const compatibilityMap: Record<BloodType, BloodType[]> = {
      [BloodType.A_POSITIVE]: [BloodType.A_POSITIVE, BloodType.A_NEGATIVE, BloodType.O_POSITIVE, BloodType.O_NEGATIVE],
      [BloodType.A_NEGATIVE]: [BloodType.A_NEGATIVE, BloodType.O_NEGATIVE],
      [BloodType.B_POSITIVE]: [BloodType.B_POSITIVE, BloodType.B_NEGATIVE, BloodType.O_POSITIVE, BloodType.O_NEGATIVE],
      [BloodType.B_NEGATIVE]: [BloodType.B_NEGATIVE, BloodType.O_NEGATIVE],
      [BloodType.AB_POSITIVE]: [BloodType.A_POSITIVE, BloodType.A_NEGATIVE, BloodType.B_POSITIVE, BloodType.B_NEGATIVE, BloodType.AB_POSITIVE, BloodType.AB_NEGATIVE, BloodType.O_POSITIVE, BloodType.O_NEGATIVE],
      [BloodType.AB_NEGATIVE]: [BloodType.A_NEGATIVE, BloodType.B_NEGATIVE, BloodType.AB_NEGATIVE, BloodType.O_NEGATIVE],
      [BloodType.O_POSITIVE]: [BloodType.O_POSITIVE, BloodType.O_NEGATIVE],
      [BloodType.O_NEGATIVE]: [BloodType.O_NEGATIVE]
    };
    
    return compatibilityMap[this.bloodType];
  }

  getInsuranceDisplayName(): string {
    const insuranceNames: Record<InsuranceType, string> = {
      [InsuranceType.OSDE]: "OSDE",
      [InsuranceType.SWISS_MEDICAL]: "Swiss Medical",
      [InsuranceType.MEDICUS]: "Medicus",
      [InsuranceType.GALENO]: "Galeno",
      [InsuranceType.OMINT]: "OMINT",
      [InsuranceType.SANCOR]: "Sancor Salud",
      [InsuranceType.UNION_PERSONAL]: "Unión Personal",
      [InsuranceType.OBRA_SOCIAL_EMPLEADOS_PUBLICOS]: "Obra Social Empleados Públicos",
      [InsuranceType.PAMI]: "PAMI",
      [InsuranceType.NONE]: "Sin Obra Social"
    };
    return insuranceNames[this.insuranceType];
  }

  getGenderDisplayName(): string {
    const genderNames: Record<Gender, string> = {
      [Gender.MALE]: "Masculino",
      [Gender.FEMALE]: "Femenino",
      [Gender.OTHER]: "Otro"
    };
    return genderNames[this.gender];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<PatientStatus, string> = {
      [PatientStatus.ACTIVE]: "Activo",
      [PatientStatus.INACTIVE]: "Inactivo",
      [PatientStatus.DECEASED]: "Fallecido",
      [PatientStatus.TRANSFERRED]: "Transferido"
    };
    return statusNames[this.status];
  }

  hasInsurance(): boolean {
    return this.insuranceType !== InsuranceType.NONE;
  }

  isAdult(): boolean {
    return this.age >= 18;
  }

  isElderly(): boolean {
    return this.age >= 65;
  }

  isChild(): boolean {
    return this.age < 18;
  }

  getBMI(): number | null {
    if (this.weight && this.height) {
      const heightInMeters = this.height / 100;
      return this.weight / (heightInMeters * heightInMeters);
    }
    return null;
  }

  getBMICategory(): string {
    const bmi = this.getBMI();
    if (!bmi) return "No disponible";
    
    if (bmi < 18.5) return "Bajo peso";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Sobrepeso";
    return "Obesidad";
  }

  incrementVisitCount(): void {
    this.totalVisits++;
    this.lastVisit = new Date();
  }

  hasChronicCondition(condition: string): boolean {
    return this.chronicConditions ? this.chronicConditions.includes(condition) : false;
  }

  addChronicCondition(condition: string): void {
    if (!this.chronicConditions) {
      this.chronicConditions = [];
    }
    if (!this.chronicConditions.includes(condition)) {
      this.chronicConditions.push(condition);
    }
  }

  removeChronicCondition(condition: string): void {
    if (this.chronicConditions) {
      this.chronicConditions = this.chronicConditions.filter(c => c !== condition);
    }
  }
} 