import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum CourseStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  ARCHIVED = "archived",
}

export enum CourseDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export enum CourseFormat {
  ONLINE = "online",
  PRESENCIAL = "presencial",
  HYBRID = "hybrid",
  SELF_PACED = "self_paced",
}

export class CourseContent {
  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  objectives?: string;

  @Column({ type: "text", nullable: true })
  prerequisites?: string;

  @Column({ type: "text", nullable: true })
  syllabus?: string;

  @Column({ type: "text", nullable: true })
  resources?: string;

  @Column({ type: "text", nullable: true })
  assessmentMethods?: string;

  @Column({ type: "text", nullable: true })
  gradingPolicy?: string;

  @Column({ type: "text", nullable: true })
  attendancePolicy?: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalModules: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalLessons: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalVideos: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalAssignments: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalQuizzes: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  estimatedHours: number;

  constructor() {
    this.totalModules = 0;
    this.totalLessons = 0;
    this.totalVideos = 0;
    this.totalAssignments = 0;
    this.totalQuizzes = 0;
    this.estimatedHours = 0;
  }

  getContentSummary(): string {
    const parts = [];

    if (this.totalModules > 0) parts.push(`${this.totalModules} módulos`);
    if (this.totalLessons > 0) parts.push(`${this.totalLessons} lecciones`);
    if (this.totalVideos > 0) parts.push(`${this.totalVideos} videos`);
    if (this.totalAssignments > 0)
      parts.push(`${this.totalAssignments} tareas`);
    if (this.totalQuizzes > 0) parts.push(`${this.totalQuizzes} cuestionarios`);
    if (this.estimatedHours > 0) parts.push(`${this.estimatedHours} horas`);

    return parts.join(" | ");
  }

  isComplete(): boolean {
    return !!(
      this.description &&
      this.objectives &&
      this.syllabus &&
      this.totalModules > 0 &&
      this.totalLessons > 0
    );
  }
}

export class InstructorProfile {
  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ length: 100, nullable: true })
  title?: string;

  @Column({ length: 100, nullable: true })
  department?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "text", nullable: true })
  qualifications?: string;

  @Column({ type: "text", nullable: true })
  experience?: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  yearsOfExperience: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  rating: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalReviews: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalCourses: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalStudents: number;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  constructor(name?: string, email?: string) {
    this.name = name || "";
    this.email = email;
  }

  getInstructorSummary(): string {
    const parts = [this.name];

    if (this.title) parts.push(this.title);
    if (this.department) parts.push(this.department);
    if (this.rating > 0) parts.push(`⭐ ${this.rating.toFixed(1)}`);
    if (this.totalStudents > 0) parts.push(`👥 ${this.totalStudents}`);

    return parts.join(" | ");
  }

  getExperienceLevel(): string {
    if (this.yearsOfExperience >= 10) return "Experto";
    if (this.yearsOfExperience >= 5) return "Avanzado";
    if (this.yearsOfExperience >= 2) return "Intermedio";
    return "Principiante";
  }

  hasGoodRating(): boolean {
    return this.rating >= 4.0 && this.totalReviews >= 10;
  }
}

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  courseCode: string;

  @Column({ length: 200, nullable: false })
  title: string;

  @Column({ length: 100, nullable: true })
  subtitle?: string;

  @Column({ length: 100, nullable: true })
  category?: string;

  @Column({ length: 100, nullable: true })
  subcategory?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: CourseStatus.DRAFT,
  })
  status: CourseStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: CourseDifficulty.BEGINNER,
  })
  difficulty: CourseDifficulty;

  @Column({
    type: "varchar",
    length: 20,
    default: CourseFormat.ONLINE,
  })
  format: CourseFormat;

  // ===== OBJETOS EMBEBIDOS =====

  @Column(() => CourseContent, { prefix: "content_" })
  content: CourseContent;

  @Column(() => InstructorProfile, { prefix: "instructor_" })
  instructor: InstructorProfile;

  // ===== CAMPOS CON TRANSFORMERS =====

  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  tags: string[];

  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  targetAudience: string[];

  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  learningOutcomes: string[];

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
  settings: {
    allowDiscussions?: boolean;
    allowDownloads?: boolean;
    allowCertificates?: boolean;
    requiresApproval?: boolean;
    isPublic?: boolean;
    maxStudents?: number;
    language?: string;
    timezone?: string;
    startDate?: Date;
    endDate?: Date;
    enrollmentDeadline?: Date;
    passingGrade?: number;
    retakePolicy?: string;
    refundPolicy?: string;
  };

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
  statistics: {
    totalEnrollments?: number;
    activeEnrollments?: number;
    completedEnrollments?: number;
    averageRating?: number;
    totalReviews?: number;
    averageCompletionTime?: number;
    dropoutRate?: number;
    passRate?: number;
    engagementRate?: number;
    totalRevenue?: number;
    monthlyEnrollments?: { month: string; count: number }[];
    topPerformers?: { studentId: string; score: number }[];
    commonFeedback?: { feedback: string; count: number }[];
  };

  // ===== CAMPOS ADICIONALES =====

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  price: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.0 })
  discountPercentage: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  credits: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "boolean", default: false })
  isFeatured: boolean;

  @Column({ type: "boolean", default: false })
  isRecommended: boolean;

  @Column({ type: "boolean", default: false })
  isBestseller: boolean;

  @Column({ type: "boolean", default: false })
  isNew: boolean;

  @Column({ type: "date", nullable: true })
  publishedDate?: Date;

  @Column({ type: "date", nullable: true })
  lastUpdated?: Date;

  @Column({ type: "text", nullable: true })
  imageUrl?: string;

  @Column({ type: "text", nullable: true })
  videoPreviewUrl?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    courseCode?: string,
    title?: string,
    instructor?: InstructorProfile
  ) {
    this.courseCode = courseCode || this.generateCourseCode();
    this.title = title || "";
    this.content = new CourseContent();
    this.instructor = instructor || new InstructorProfile();
    this.tags = [];
    this.targetAudience = [];
    this.learningOutcomes = [];
    this.settings = {};
    this.statistics = {};
  }

  private generateCourseCode(): string {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `CS${year}${random}`;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getStatusDisplayName(): string {
    const statusNames: Record<CourseStatus, string> = {
      [CourseStatus.DRAFT]: "Borrador",
      [CourseStatus.PUBLISHED]: "Publicado",
      [CourseStatus.ACTIVE]: "Activo",
      [CourseStatus.COMPLETED]: "Completado",
      [CourseStatus.CANCELLED]: "Cancelado",
      [CourseStatus.ARCHIVED]: "Archivado",
    };
    return statusNames[this.status];
  }

  getDifficultyDisplayName(): string {
    const difficultyNames: Record<CourseDifficulty, string> = {
      [CourseDifficulty.BEGINNER]: "Principiante",
      [CourseDifficulty.INTERMEDIATE]: "Intermedio",
      [CourseDifficulty.ADVANCED]: "Avanzado",
      [CourseDifficulty.EXPERT]: "Experto",
    };
    return difficultyNames[this.difficulty];
  }

  getFormatDisplayName(): string {
    const formatNames: Record<CourseFormat, string> = {
      [CourseFormat.ONLINE]: "En línea",
      [CourseFormat.PRESENCIAL]: "Presencial",
      [CourseFormat.HYBRID]: "Híbrido",
      [CourseFormat.SELF_PACED]: "A tu ritmo",
    };
    return formatNames[this.format];
  }

  getEffectivePrice(): number {
    if (this.discountPercentage > 0) {
      return this.price * (1 - this.discountPercentage / 100);
    }
    return this.price;
  }

  getDiscountAmount(): number {
    return this.price - this.getEffectivePrice();
  }

  hasDiscount(): boolean {
    return this.discountPercentage > 0;
  }

  isFree(): boolean {
    return this.price === 0;
  }

  isPublished(): boolean {
    return [CourseStatus.PUBLISHED, CourseStatus.ACTIVE].includes(this.status);
  }

  isAvailableForEnrollment(): boolean {
    return this.isPublished() && this.isActive;
  }

  canEnroll(): boolean {
    const now = new Date();
    const hasCapacity =
      !this.settings.maxStudents ||
      (this.statistics.activeEnrollments || 0) < this.settings.maxStudents;
    const beforeDeadline =
      !this.settings.enrollmentDeadline ||
      this.settings.enrollmentDeadline > now;

    return this.isAvailableForEnrollment() && hasCapacity && beforeDeadline;
  }

  getEnrollmentStatus(): string {
    if (!this.isAvailableForEnrollment()) return "No disponible";
    if (!this.canEnroll()) return "Inscripciones cerradas";
    if (this.isFull()) return "Completo";
    return "Disponible";
  }

  isFull(): boolean {
    return this.settings.maxStudents
      ? (this.statistics.activeEnrollments || 0) >= this.settings.maxStudents
      : false;
  }

  getRemainingSpots(): number {
    if (!this.settings.maxStudents) return -1; // Sin límite
    return this.settings.maxStudents - (this.statistics.activeEnrollments || 0);
  }

  getAverageRating(): number {
    return this.statistics.averageRating || 0;
  }

  getTotalReviews(): number {
    return this.statistics.totalReviews || 0;
  }

  hasGoodRating(): boolean {
    return this.getAverageRating() >= 4.0 && this.getTotalReviews() >= 10;
  }

  getCourseSummary(): string {
    const parts = [
      `${this.courseCode}: ${this.title}`,
      this.getDifficultyDisplayName(),
      this.getFormatDisplayName(),
      this.getStatusDisplayName(),
    ];

    if (this.credits > 0) parts.push(`${this.credits} créditos`);
    if (this.getAverageRating() > 0)
      parts.push(`⭐ ${this.getAverageRating().toFixed(1)}`);
    if (this.isFree()) parts.push("Gratis");
    else if (this.hasDiscount())
      parts.push(
        `$${this.getEffectivePrice().toFixed(2)} (${
          this.discountPercentage
        }% off)`
      );
    else parts.push(`$${this.price.toFixed(2)}`);

    return parts.join(" | ");
  }

  getContentSummary(): string {
    return this.content.getContentSummary();
  }

  getInstructorSummary(): string {
    return this.instructor.getInstructorSummary();
  }

  getTagsList(): string {
    return this.tags.length > 0 ? this.tags.join(", ") : "Sin etiquetas";
  }

  getTargetAudienceList(): string {
    return this.targetAudience.length > 0
      ? this.targetAudience.join(", ")
      : "Audiencia general";
  }

  getLearningOutcomesList(): string {
    return this.learningOutcomes.length > 0
      ? this.learningOutcomes.join(", ")
      : "Sin objetivos definidos";
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag.trim())) {
      this.tags.push(tag.trim());
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  addTargetAudience(audience: string): void {
    if (!this.targetAudience.includes(audience.trim())) {
      this.targetAudience.push(audience.trim());
    }
  }

  removeTargetAudience(audience: string): void {
    this.targetAudience = this.targetAudience.filter((a) => a !== audience);
  }

  addLearningOutcome(outcome: string): void {
    if (!this.learningOutcomes.includes(outcome.trim())) {
      this.learningOutcomes.push(outcome.trim());
    }
  }

  removeLearningOutcome(outcome: string): void {
    this.learningOutcomes = this.learningOutcomes.filter((o) => o !== outcome);
  }

  updateSettings(newSettings: Partial<typeof this.settings>): void {
    this.settings = { ...this.settings, ...newSettings };
  }

  updateStatistics(newStats: Partial<typeof this.statistics>): void {
    this.statistics = { ...this.statistics, ...newStats };
  }

  publish(): void {
    this.status = CourseStatus.PUBLISHED;
    this.publishedDate = new Date();
  }

  activate(): void {
    this.status = CourseStatus.ACTIVE;
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  complete(): void {
    this.status = CourseStatus.COMPLETED;
  }

  cancel(): void {
    this.status = CourseStatus.CANCELLED;
    this.isActive = false;
  }

  archive(): void {
    this.status = CourseStatus.ARCHIVED;
    this.isActive = false;
  }

  setFeatured(featured: boolean = true): void {
    this.isFeatured = featured;
  }

  setRecommended(recommended: boolean = true): void {
    this.isRecommended = recommended;
  }

  setBestseller(bestseller: boolean = true): void {
    this.isBestseller = bestseller;
  }

  markAsNew(isNew: boolean = true): void {
    this.isNew = isNew;
  }

  applyDiscount(percentage: number): void {
    this.discountPercentage = Math.max(0, Math.min(100, percentage));
  }

  removeDiscount(): void {
    this.discountPercentage = 0;
  }

  getSpecialOffers(): string[] {
    const offers = [];

    if (this.isFree()) offers.push("Gratis");
    if (this.hasDiscount())
      offers.push(`${this.discountPercentage}% de descuento`);
    if (this.isFeatured) offers.push("Curso destacado");
    if (this.isRecommended) offers.push("Recomendado");
    if (this.isBestseller) offers.push("Más vendido");
    if (this.isNew) offers.push("Nuevo");

    return offers;
  }

  getSpecialOffersText(): string {
    const offers = this.getSpecialOffers();
    return offers.length > 0 ? offers.join(" | ") : "Sin ofertas especiales";
  }

  getCourseProfile(): string {
    const sections = [
      `📚 ${this.getCourseSummary()}`,
      `👨‍🏫 ${this.getInstructorSummary()}`,
      `📖 ${this.getContentSummary()}`,
      `🏷️ ${this.getTagsList()}`,
      `🎯 ${this.getTargetAudienceList()}`,
      `💰 ${this.getSpecialOffersText()}`,
      `📊 ${this.getEnrollmentStatus()}`,
    ];

    return sections.join("\n");
  }

  clone(): Course {
    const clone = new Course(this.courseCode, this.title);
    clone.subtitle = this.subtitle;
    clone.category = this.category;
    clone.subcategory = this.subcategory;
    clone.status = this.status;
    clone.difficulty = this.difficulty;
    clone.format = this.format;

    // Clonar contenido del curso
    clone.content = new CourseContent();
    Object.assign(clone.content, this.content);

    // Clonar perfil del instructor
    clone.instructor = new InstructorProfile();
    Object.assign(clone.instructor, this.instructor);

    clone.tags = [...this.tags];
    clone.targetAudience = [...this.targetAudience];
    clone.learningOutcomes = [...this.learningOutcomes];
    clone.settings = { ...this.settings };
    clone.statistics = { ...this.statistics };
    clone.price = this.price;
    clone.discountPercentage = this.discountPercentage;
    clone.credits = this.credits;
    return clone;
  }

  toString(): string {
    return `Course(${this.courseCode}: ${
      this.title
    }, ${this.getStatusDisplayName()})`;
  }
}
