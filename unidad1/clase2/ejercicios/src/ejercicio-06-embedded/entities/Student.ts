import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PersonalInfo, Gender } from "./PersonalInfo";
import { ContactInfo, ContactPreference } from "./ContactInfo";
import { Address, AddressType } from "./Address";

export enum StudentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  GRADUATED = "graduated",
  DROPPED_OUT = "dropped_out",
  ON_LEAVE = "on_leave",
}

export enum EducationLevel {
  HIGH_SCHOOL = "high_school",
  UNDERGRADUATE = "undergraduate",
  GRADUATE = "graduate",
  POSTGRADUATE = "postgraduate",
  DOCTORATE = "doctorate",
  PROFESSIONAL = "professional",
}

export enum LearningStyle {
  VISUAL = "visual",
  AUDITORY = "auditory",
  KINESTHETIC = "kinesthetic",
  READING_WRITING = "reading_writing",
  MULTIMODAL = "multimodal",
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  studentId: string;

  // ===== OBJETOS EMBEBIDOS =====

  @Column(() => PersonalInfo, { prefix: "personal_" })
  personalInfo: PersonalInfo;

  @Column(() => ContactInfo, { prefix: "contact_" })
  contactInfo: ContactInfo;

  @Column(() => Address, { prefix: "address_" })
  address: Address;

  // ===== INFORMACIÓN ACADÉMICA =====

  @Column({
    type: "varchar",
    length: 20,
    default: StudentStatus.ACTIVE,
  })
  status: StudentStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: EducationLevel.UNDERGRADUATE,
  })
  educationLevel: EducationLevel;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  learningStyle?: LearningStyle;

  @Column({ type: "date", nullable: false })
  enrollmentDate: Date;

  @Column({ type: "date", nullable: true })
  graduationDate?: Date;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 0.0 })
  gpa: number; // Grade Point Average

  @Column({ type: "int", unsigned: true, default: 0 })
  totalCredits: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  completedCredits: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalCourses: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  completedCourses: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  currentCourses: number;

  @Column({ length: 100, nullable: true })
  major?: string; // Carrera principal

  @Column({ length: 100, nullable: true })
  minor?: string; // Carrera secundaria

  @Column({ length: 100, nullable: true })
  advisor?: string; // Asesor académico

  @Column({ length: 100, nullable: true })
  institution?: string; // Institución

  @Column({ length: 100, nullable: true })
  faculty?: string; // Facultad

  @Column({ length: 100, nullable: true })
  department?: string; // Departamento

  // ===== CAMPOS CON TRANSFORMERS =====

  // Array de intereses usando transformer
  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  interests: string[];

  // Array de habilidades usando transformer
  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  skills: string[];

  // Array de idiomas usando transformer
  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  languages: string[];

  // Configuraciones como JSON usando transformer
  @Column({
    type: "text",
    transformer: {
      to: (value: any) => JSON.stringify(value),
      from: (value: string) => {
        try {
          return JSON.parse(value || "{}");
        } catch {
          return {};
        }
      },
    },
  })
  preferences: {
    theme?: string;
    notifications?: boolean;
    language?: string;
    timezone?: string;
    emailFrequency?: "daily" | "weekly" | "monthly" | "never";
    studyReminders?: boolean;
    assignmentReminders?: boolean;
    gradeNotifications?: boolean;
    courseUpdates?: boolean;
    accessibility?: {
      screenReader?: boolean;
      highContrast?: boolean;
      fontSize?: "small" | "medium" | "large";
      dyslexiaSupport?: boolean;
    };
  };

  // Historial académico como JSON
  @Column({
    type: "text",
    transformer: {
      to: (value: any) => JSON.stringify(value),
      from: (value: string) => {
        try {
          return JSON.parse(value || "[]");
        } catch {
          return [];
        }
      },
    },
  })
  academicHistory: {
    semester: string;
    year: number;
    courses: {
      code: string;
      name: string;
      credits: number;
      grade: string;
      gpa: number;
    }[];
    semesterGPA: number;
    cumulativeGPA: number;
  }[];

  // Progreso del estudiante como JSON
  @Column({
    type: "text",
    transformer: {
      to: (value: any) => JSON.stringify(value),
      from: (value: string) => {
        try {
          return JSON.parse(value || "{}");
        } catch {
          return {};
        }
      },
    },
  })
  progress: {
    currentSemester?: string;
    expectedGraduation?: string;
    completionPercentage?: number;
    milestones?: {
      name: string;
      completed: boolean;
      completedDate?: Date;
      required: boolean;
    }[];
    achievements?: {
      name: string;
      description: string;
      awardedDate: Date;
      category: string;
    }[];
    warnings?: {
      type: "academic" | "attendance" | "financial" | "disciplinary";
      message: string;
      date: Date;
      resolved: boolean;
    }[];
  };

  // ===== CAMPOS ADICIONALES =====

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "datetime", nullable: true })
  verifiedAt?: Date;

  @Column({ type: "datetime", nullable: true })
  lastLoginAt?: Date;

  @Column({ type: "datetime", nullable: true })
  lastActivityAt?: Date;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "text", nullable: true })
  emergencyContact?: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  totalTuitionPaid: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  outstandingBalance: number;

  @Column({ type: "boolean", default: false })
  hasScholarship: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.0 })
  scholarshipPercentage: number;

  @Column({ type: "boolean", default: false })
  isInternational: boolean;

  @Column({ type: "boolean", default: false })
  requiresVisa: boolean;

  @Column({ type: "date", nullable: true })
  visaExpiryDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    studentId?: string,
    personalInfo?: PersonalInfo,
    contactInfo?: ContactInfo,
    address?: Address
  ) {
    this.studentId = studentId || this.generateStudentId();
    this.personalInfo = personalInfo || new PersonalInfo();
    this.contactInfo = contactInfo || new ContactInfo();
    this.address = address || new Address();
    this.interests = [];
    this.skills = [];
    this.languages = [];
    this.preferences = {};
    this.academicHistory = [];
    this.progress = {};
    this.enrollmentDate = new Date();
  }

  // ===== MÉTODOS UTILITARIOS =====

  private generateStudentId(): string {
    const year = new Date().getFullYear().toString().substr(2);
    const timestamp = Date.now().toString().substr(-4);
    const random = Math.random().toString().substr(2, 3);
    return `STU${year}${timestamp}${random}`;
  }

  getStatusDisplayName(): string {
    const statusNames: Record<StudentStatus, string> = {
      [StudentStatus.ACTIVE]: "Activo",
      [StudentStatus.INACTIVE]: "Inactivo",
      [StudentStatus.SUSPENDED]: "Suspendido",
      [StudentStatus.GRADUATED]: "Graduado",
      [StudentStatus.DROPPED_OUT]: "Abandonó",
      [StudentStatus.ON_LEAVE]: "Licencia",
    };
    return statusNames[this.status];
  }

  getEducationLevelDisplayName(): string {
    const levelNames: Record<EducationLevel, string> = {
      [EducationLevel.HIGH_SCHOOL]: "Secundaria",
      [EducationLevel.UNDERGRADUATE]: "Licenciatura",
      [EducationLevel.GRADUATE]: "Posgrado",
      [EducationLevel.POSTGRADUATE]: "Maestría",
      [EducationLevel.DOCTORATE]: "Doctorado",
      [EducationLevel.PROFESSIONAL]: "Profesional",
    };
    return levelNames[this.educationLevel];
  }

  getLearningStyleDisplayName(): string {
    if (!this.learningStyle) return "Sin definir";

    const styleNames: Record<LearningStyle, string> = {
      [LearningStyle.VISUAL]: "Visual",
      [LearningStyle.AUDITORY]: "Auditivo",
      [LearningStyle.KINESTHETIC]: "Kinestésico",
      [LearningStyle.READING_WRITING]: "Lectura/Escritura",
      [LearningStyle.MULTIMODAL]: "Multimodal",
    };
    return styleNames[this.learningStyle];
  }

  getFullName(): string {
    return this.personalInfo.getFullName();
  }

  getAge(): number | null {
    return this.personalInfo.getAge();
  }

  getEmail(): string {
    return this.contactInfo.email;
  }

  getPhone(): string {
    return this.contactInfo.phone || "Sin teléfono";
  }

  getFullAddress(): string {
    return this.address.getFullAddress();
  }

  getShortAddress(): string {
    return this.address.getShortAddress();
  }

  getCompletionPercentage(): number {
    if (this.totalCredits === 0) return 0;
    return Math.round((this.completedCredits / this.totalCredits) * 100);
  }

  getProgressPercentage(): number {
    return this.progress.completionPercentage || this.getCompletionPercentage();
  }

  isGraduated(): boolean {
    return this.status === StudentStatus.GRADUATED;
  }

  isActiveStudent(): boolean {
    return this.status === StudentStatus.ACTIVE && this.isActive;
  }

  canEnrollInCourses(): boolean {
    return this.isActiveStudent() && this.outstandingBalance === 0;
  }

  hasGoodAcademicStanding(): boolean {
    return this.gpa >= 2.0; // Mínimo requerido
  }

  isOnProbation(): boolean {
    return this.gpa < 2.0 && this.gpa > 0;
  }

  needsAdvisingHold(): boolean {
    return this.completedCredits > 0 && this.completedCredits % 30 === 0; // Cada 30 créditos
  }

  getTimeToGraduation(): string {
    if (this.isGraduated()) return "Graduado";
    if (this.progress.expectedGraduation)
      return this.progress.expectedGraduation;

    const remainingCredits = this.totalCredits - this.completedCredits;
    const averageCreditsPerSemester = 15; // Promedio típico
    const semestersRemaining = Math.ceil(
      remainingCredits / averageCreditsPerSemester
    );

    return `${semestersRemaining} semestre(s) aproximadamente`;
  }

  addInterest(interest: string): void {
    if (!this.interests.includes(interest.trim())) {
      this.interests.push(interest.trim());
    }
  }

  removeInterest(interest: string): void {
    this.interests = this.interests.filter((i) => i !== interest);
  }

  addSkill(skill: string): void {
    if (!this.skills.includes(skill.trim())) {
      this.skills.push(skill.trim());
    }
  }

  removeSkill(skill: string): void {
    this.skills = this.skills.filter((s) => s !== skill);
  }

  addLanguage(language: string): void {
    if (!this.languages.includes(language.trim())) {
      this.languages.push(language.trim());
    }
  }

  removeLanguage(language: string): void {
    this.languages = this.languages.filter((l) => l !== language);
  }

  updatePreferences(newPreferences: Partial<typeof this.preferences>): void {
    this.preferences = { ...this.preferences, ...newPreferences };
  }

  addAcademicRecord(record: {
    semester: string;
    year: number;
    courses: {
      code: string;
      name: string;
      credits: number;
      grade: string;
      gpa: number;
    }[];
    semesterGPA: number;
    cumulativeGPA: number;
  }): void {
    this.academicHistory.push(record);
    this.gpa = record.cumulativeGPA;
  }

  addAchievement(achievement: {
    name: string;
    description: string;
    awardedDate: Date;
    category: string;
  }): void {
    if (!this.progress.achievements) this.progress.achievements = [];
    this.progress.achievements.push(achievement);
  }

  addWarning(warning: {
    type: "academic" | "attendance" | "financial" | "disciplinary";
    message: string;
    date: Date;
    resolved: boolean;
  }): void {
    if (!this.progress.warnings) this.progress.warnings = [];
    this.progress.warnings.push(warning);
  }

  resolveWarning(index: number): void {
    if (this.progress.warnings && this.progress.warnings[index]) {
      this.progress.warnings[index].resolved = true;
    }
  }

  getActiveWarnings(): any[] {
    return this.progress.warnings?.filter((w) => !w.resolved) || [];
  }

  hasActiveWarnings(): boolean {
    return this.getActiveWarnings().length > 0;
  }

  getAchievementsByCategory(category: string): any[] {
    return (
      this.progress.achievements?.filter((a) => a.category === category) || []
    );
  }

  getTotalAchievements(): number {
    return this.progress.achievements?.length || 0;
  }

  getGPAStatus(): string {
    if (this.gpa >= 3.8) return "Excelente";
    if (this.gpa >= 3.5) return "Muy bueno";
    if (this.gpa >= 3.0) return "Bueno";
    if (this.gpa >= 2.5) return "Regular";
    if (this.gpa >= 2.0) return "Suficiente";
    return "Insuficiente";
  }

  getStudentProfile(): string {
    const parts = [
      `${this.studentId}: ${this.getFullName()}`,
      `${this.getEducationLevelDisplayName()}`,
      `${this.getStatusDisplayName()}`,
      `GPA: ${this.gpa.toFixed(2)} (${this.getGPAStatus()})`,
      `Progreso: ${this.getProgressPercentage()}%`,
    ];

    if (this.major) parts.push(`Carrera: ${this.major}`);
    if (this.hasScholarship) parts.push(`Beca: ${this.scholarshipPercentage}%`);

    return parts.join(" | ");
  }

  getContactSummary(): string {
    return this.contactInfo.getContactSummary();
  }

  getAddressSummary(): string {
    return this.address.getShortAddress();
  }

  getPersonalSummary(): string {
    return this.personalInfo.getProfileSummary();
  }

  getAcademicSummary(): string {
    const parts = [
      `Nivel: ${this.getEducationLevelDisplayName()}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `GPA: ${this.gpa.toFixed(2)}`,
      `Créditos: ${this.completedCredits}/${this.totalCredits}`,
      `Cursos: ${this.completedCourses}/${this.totalCourses}`,
    ];

    return parts.join(" | ");
  }

  getInterestsList(): string {
    return this.interests.length > 0
      ? this.interests.join(", ")
      : "Sin intereses registrados";
  }

  getSkillsList(): string {
    return this.skills.length > 0
      ? this.skills.join(", ")
      : "Sin habilidades registradas";
  }

  getLanguagesList(): string {
    return this.languages.length > 0
      ? this.languages.join(", ")
      : "Sin idiomas registrados";
  }

  getFinancialStatus(): string {
    const parts = [];

    parts.push(`Pagado: $${this.totalTuitionPaid.toLocaleString()}`);

    if (this.outstandingBalance > 0) {
      parts.push(`Pendiente: $${this.outstandingBalance.toLocaleString()}`);
    }

    if (this.hasScholarship) {
      parts.push(`Beca: ${this.scholarshipPercentage}%`);
    }

    return parts.join(" | ");
  }

  getInternationalStatus(): string {
    if (!this.isInternational) return "Estudiante nacional";

    const parts = ["Estudiante internacional"];

    if (this.requiresVisa) {
      parts.push("Requiere visa");
      if (this.visaExpiryDate) {
        parts.push(`Visa vence: ${this.visaExpiryDate.toLocaleDateString()}`);
      }
    }

    return parts.join(" | ");
  }

  getLastActivityInfo(): string {
    const parts = [];

    if (this.lastLoginAt) {
      parts.push(`Último login: ${this.lastLoginAt.toLocaleDateString()}`);
    }

    if (this.lastActivityAt) {
      parts.push(
        `Última actividad: ${this.lastActivityAt.toLocaleDateString()}`
      );
    }

    return parts.length > 0 ? parts.join(" | ") : "Sin actividad registrada";
  }

  updateLastActivity(): void {
    this.lastActivityAt = new Date();
  }

  updateLastLogin(): void {
    this.lastLoginAt = new Date();
    this.updateLastActivity();
  }

  verify(): void {
    this.isVerified = true;
    this.verifiedAt = new Date();
  }

  suspend(reason?: string): void {
    this.status = StudentStatus.SUSPENDED;
    this.isActive = false;

    if (reason) {
      this.addWarning({
        type: "disciplinary",
        message: `Suspendido: ${reason}`,
        date: new Date(),
        resolved: false,
      });
    }
  }

  reactivate(): void {
    this.status = StudentStatus.ACTIVE;
    this.isActive = true;
  }

  graduate(): void {
    this.status = StudentStatus.GRADUATED;
    this.graduationDate = new Date();
    this.completedCredits = this.totalCredits;
    this.completedCourses = this.totalCourses;

    this.addAchievement({
      name: "Graduación",
      description: `Graduado en ${this.major || "programa académico"}`,
      awardedDate: new Date(),
      category: "academic",
    });
  }

  dropout(reason?: string): void {
    this.status = StudentStatus.DROPPED_OUT;
    this.isActive = false;

    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nAbandonó: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  takeLeave(reason?: string): void {
    this.status = StudentStatus.ON_LEAVE;

    if (reason) {
      this.notes =
        (this.notes || "") +
        `\nLicencia: ${reason} - ${new Date().toLocaleDateString()}`;
    }
  }

  validateStudentData(): { isValid: boolean; errors: string[] } {
    const errors = [];

    // Validar información personal
    const personalValidation = this.personalInfo.validatePersonalInfo();
    if (!personalValidation.isValid) {
      errors.push(...personalValidation.errors);
    }

    // Validar información de contacto
    const contactValidation = this.contactInfo.validateContactInfo();
    if (!contactValidation.isValid) {
      errors.push(...contactValidation.errors);
    }

    // Validar dirección
    const addressValidation = this.address.validateAddress();
    if (!addressValidation.isValid) {
      errors.push(...addressValidation.errors);
    }

    // Validaciones específicas del estudiante
    if (!this.studentId || this.studentId.trim() === "") {
      errors.push("ID de estudiante es obligatorio");
    }

    if (this.gpa < 0 || this.gpa > 4.0) {
      errors.push("GPA debe estar entre 0 y 4.0");
    }

    if (this.completedCredits > this.totalCredits) {
      errors.push("Créditos completados no pueden superar el total");
    }

    if (this.outstandingBalance < 0) {
      errors.push("Balance pendiente no puede ser negativo");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getComprehensiveInfo(): string {
    const sections = [
      `🎓 ${this.getStudentProfile()}`,
      `👤 ${this.getPersonalSummary()}`,
      `📞 ${this.getContactSummary()}`,
      `🏠 ${this.getAddressSummary()}`,
      `📚 ${this.getAcademicSummary()}`,
      `🎯 Intereses: ${this.getInterestsList()}`,
      `💪 Habilidades: ${this.getSkillsList()}`,
      `🌍 Idiomas: ${this.getLanguagesList()}`,
      `💰 ${this.getFinancialStatus()}`,
      `🌎 ${this.getInternationalStatus()}`,
      `⏰ ${this.getLastActivityInfo()}`,
    ];

    return sections.join("\n");
  }

  clone(): Student {
    const clone = new Student(
      this.studentId,
      this.personalInfo.clone(),
      this.contactInfo.clone(),
      this.address.clone()
    );
    clone.status = this.status;
    clone.educationLevel = this.educationLevel;
    clone.learningStyle = this.learningStyle;
    clone.gpa = this.gpa;
    clone.totalCredits = this.totalCredits;
    clone.completedCredits = this.completedCredits;
    clone.totalCourses = this.totalCourses;
    clone.completedCourses = this.completedCourses;
    clone.currentCourses = this.currentCourses;
    clone.major = this.major;
    clone.minor = this.minor;
    clone.interests = [...this.interests];
    clone.skills = [...this.skills];
    clone.languages = [...this.languages];
    clone.preferences = { ...this.preferences };
    clone.academicHistory = [...this.academicHistory];
    clone.progress = { ...this.progress };
    return clone;
  }

  toString(): string {
    return `Student(${
      this.studentId
    }: ${this.getFullName()}, ${this.getStatusDisplayName()})`;
  }
}
