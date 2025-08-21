import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Loan } from "./Loan";
import { Category } from "./Category";

export enum BookStatus {
  AVAILABLE = "available",
  BORROWED = "borrowed",
  RESERVED = "reserved",
  MAINTENANCE = "maintenance",
  LOST = "lost",
  DAMAGED = "damaged",
  RETIRED = "retired",
}

export enum BookCondition {
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
  DAMAGED = "damaged",
}

export enum BookFormat {
  HARDCOVER = "hardcover",
  PAPERBACK = "paperback",
  EBOOK = "ebook",
  AUDIOBOOK = "audiobook",
  MAGAZINE = "magazine",
  JOURNAL = "journal",
  REFERENCE = "reference",
}

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ length: 255, nullable: false })
  author: string;

  @Column({ length: 20, unique: true, nullable: false })
  isbn: string;

  @Column({ length: 100, nullable: true })
  publisher?: string;

  @Column({ type: "date", nullable: true })
  publicationDate?: Date;

  @Column({ type: "int", unsigned: true, nullable: true })
  pages?: number;

  @Column({ length: 20, nullable: true })
  edition?: string;

  @Column({ length: 10, nullable: true })
  language?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: BookFormat.PAPERBACK,
  })
  format: BookFormat;

  @Column({
    type: "varchar",
    length: 20,
    default: BookStatus.AVAILABLE,
  })
  status: BookStatus;

  @Column({
    type: "varchar",
    length: 20,
    default: BookCondition.GOOD,
  })
  condition: BookCondition;

  @Column({ length: 50, unique: true, nullable: false })
  barcode: string;

  @Column({ length: 20, nullable: true })
  callNumber?: string; // Número de clasificación (Dewey, etc.)

  @Column({ type: "varchar", length: 50, nullable: true })
  location?: string; // Estantería, piso, etc.

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: "date", nullable: false })
  acquisitionDate: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalLoans: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  currentReservations: number;

  @Column({ type: "int", unsigned: true, default: 3 })
  maxReservations: number;

  @Column({ type: "boolean", default: true })
  isLoanable: boolean;

  @Column({ type: "boolean", default: true })
  isReservable: boolean;

  @Column({ type: "boolean", default: false })
  isReference: boolean; // Libros de consulta que no se prestan

  @Column({ type: "int", unsigned: true, default: 14 })
  defaultLoanPeriod: number; // Días de préstamo por defecto

  @Column({ type: "int", unsigned: true, default: 2 })
  maxRenewals: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "json", nullable: true })
  keywords?: string[]; // Palabras clave para búsqueda

  @Column({ type: "json", nullable: true })
  subjects?: string[]; // Temas/materias

  @Column({ type: "decimal", precision: 3, scale: 2, nullable: true })
  rating?: number; // Rating promedio (1-5)

  @Column({ type: "int", unsigned: true, default: 0 })
  ratingsCount: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl?: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "datetime", nullable: true })
  lastBorrowedDate?: Date;

  @Column({ type: "datetime", nullable: true })
  lastReturnedDate?: Date;

  @Column({ type: "int", unsigned: true, default: 0 })
  timesReported: number; // Veces reportado como perdido/dañado

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  replacementCost: number;

  @Column({ type: "json", nullable: true })
  dimensions?: {
    height?: number;
    width?: number;
    thickness?: number;
    weight?: number;
  };

  @Column({ type: "varchar", length: 100, nullable: true })
  series?: string; // Serie o colección

  @Column({ type: "int", unsigned: true, nullable: true })
  volumeNumber?: number;

  @Column({ type: "boolean", default: false })
  isDigital: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  digitalUrl?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  digitalFormat?: string; // PDF, EPUB, etc.

  @Column({ type: "bigint", unsigned: true, nullable: true })
  digitalFileSize?: number; // En bytes

  @Column({ type: "int", unsigned: true, nullable: true })
  digitalDownloads: number;

  @Column({ type: "boolean", default: false })
  requiresSpecialHandling: boolean;

  @Column({ type: "text", nullable: true })
  specialInstructions?: string;

  // ===== RELACIONES =====

  @OneToMany(() => Loan, (loan) => loan.book, {
    cascade: true,
  })
  loans: Loan[];

  @ManyToOne(() => Category, (category) => category.books, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @Column({ type: "int", unsigned: true, nullable: true })
  categoryId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    title?: string,
    author?: string,
    isbn?: string,
    barcode?: string
  ) {
    this.title = title || "";
    this.author = author || "";
    this.isbn = isbn || "";
    this.barcode = barcode || this.generateBarcode();
    this.acquisitionDate = new Date();
    this.digitalDownloads = 0;
  }

  // ===== MÉTODOS UTILITARIOS =====

  private generateBarcode(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString().substr(2, 4);
    return `${timestamp}${random}`;
  }

  getFullTitle(): string {
    let fullTitle = this.title;
    if (this.edition) fullTitle += ` (${this.edition})`;
    if (this.volumeNumber) fullTitle += ` - Vol. ${this.volumeNumber}`;
    return fullTitle;
  }

  getStatusDisplayName(): string {
    const statusNames: Record<BookStatus, string> = {
      [BookStatus.AVAILABLE]: "Disponible",
      [BookStatus.BORROWED]: "Prestado",
      [BookStatus.RESERVED]: "Reservado",
      [BookStatus.MAINTENANCE]: "Mantenimiento",
      [BookStatus.LOST]: "Perdido",
      [BookStatus.DAMAGED]: "Dañado",
      [BookStatus.RETIRED]: "Dado de baja",
    };
    return statusNames[this.status];
  }

  getConditionDisplayName(): string {
    const conditionNames: Record<BookCondition, string> = {
      [BookCondition.EXCELLENT]: "Excelente",
      [BookCondition.GOOD]: "Bueno",
      [BookCondition.FAIR]: "Regular",
      [BookCondition.POOR]: "Pobre",
      [BookCondition.DAMAGED]: "Dañado",
    };
    return conditionNames[this.condition];
  }

  getFormatDisplayName(): string {
    const formatNames: Record<BookFormat, string> = {
      [BookFormat.HARDCOVER]: "Tapa Dura",
      [BookFormat.PAPERBACK]: "Tapa Blanda",
      [BookFormat.EBOOK]: "Libro Digital",
      [BookFormat.AUDIOBOOK]: "Audiolibro",
      [BookFormat.MAGAZINE]: "Revista",
      [BookFormat.JOURNAL]: "Diario/Periódico",
      [BookFormat.REFERENCE]: "Referencia",
    };
    return formatNames[this.format];
  }

  isAvailable(): boolean {
    return (
      this.status === BookStatus.AVAILABLE &&
      this.isActive &&
      this.isLoanable &&
      !this.isReference
    );
  }

  canBeBorrowed(): boolean {
    return this.isAvailable() && !this.requiresSpecialHandling;
  }

  canBeReserved(): boolean {
    return (
      this.isActive &&
      this.isReservable &&
      !this.isReference &&
      this.currentReservations < this.maxReservations
    );
  }

  isCurrentlyBorrowed(): boolean {
    return this.status === BookStatus.BORROWED;
  }

  isOverdue(): boolean {
    if (!this.isCurrentlyBorrowed()) return false;

    const currentLoan = this.loans.find((loan) => !loan.isReturned);
    return currentLoan ? currentLoan.isOverdue() : false;
  }

  getCurrentLoan(): Loan | null {
    return this.loans.find((loan) => !loan.isReturned) || null;
  }

  getDaysUntilDue(): number | null {
    const currentLoan = this.getCurrentLoan();
    if (!currentLoan) return null;

    const diff = currentLoan.dueDate.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getAvailableReservationSlots(): number {
    return Math.max(0, this.maxReservations - this.currentReservations);
  }

  calculatePopularity(): number {
    if (this.totalLoans === 0) return 0;

    const daysSinceAcquisition = Math.floor(
      (new Date().getTime() - this.acquisitionDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const monthsSinceAcquisition = Math.max(1, daysSinceAcquisition / 30);
    return this.totalLoans / monthsSinceAcquisition;
  }

  getAgeInDays(): number {
    return Math.floor(
      (new Date().getTime() - this.acquisitionDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }

  getAgeInYears(): number {
    return Math.floor(this.getAgeInDays() / 365);
  }

  updateRating(newRating: number): void {
    if (newRating < 1 || newRating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const totalRating = (this.rating || 0) * this.ratingsCount + newRating;
    this.ratingsCount++;
    this.rating = totalRating / this.ratingsCount;
  }

  addKeyword(keyword: string): void {
    if (!this.keywords) this.keywords = [];
    if (!this.keywords.includes(keyword.toLowerCase())) {
      this.keywords.push(keyword.toLowerCase());
    }
  }

  removeKeyword(keyword: string): void {
    if (this.keywords) {
      this.keywords = this.keywords.filter((k) => k !== keyword.toLowerCase());
    }
  }

  addSubject(subject: string): void {
    if (!this.subjects) this.subjects = [];
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
    }
  }

  removeSubject(subject: string): void {
    if (this.subjects) {
      this.subjects = this.subjects.filter((s) => s !== subject);
    }
  }

  borrow(): void {
    if (!this.canBeBorrowed()) {
      throw new Error("Book cannot be borrowed in its current state");
    }

    this.status = BookStatus.BORROWED;
    this.totalLoans++;
    this.lastBorrowedDate = new Date();
  }

  return(): void {
    if (!this.isCurrentlyBorrowed()) {
      throw new Error("Book is not currently borrowed");
    }

    this.status = BookStatus.AVAILABLE;
    this.lastReturnedDate = new Date();
  }

  reserve(): void {
    if (!this.canBeReserved()) {
      throw new Error("Book cannot be reserved");
    }

    this.currentReservations++;
    if (this.status === BookStatus.AVAILABLE) {
      this.status = BookStatus.RESERVED;
    }
  }

  cancelReservation(): void {
    if (this.currentReservations > 0) {
      this.currentReservations--;
      if (
        this.currentReservations === 0 &&
        this.status === BookStatus.RESERVED
      ) {
        this.status = BookStatus.AVAILABLE;
      }
    }
  }

  markAsLost(): void {
    this.status = BookStatus.LOST;
    this.timesReported++;
  }

  markAsDamaged(): void {
    this.status = BookStatus.DAMAGED;
    this.timesReported++;
  }

  sendToMaintenance(): void {
    this.status = BookStatus.MAINTENANCE;
  }

  returnFromMaintenance(): void {
    if (this.status === BookStatus.MAINTENANCE) {
      this.status = BookStatus.AVAILABLE;
    }
  }

  retire(): void {
    this.status = BookStatus.RETIRED;
    this.isActive = false;
  }

  reactivate(): void {
    if (this.status === BookStatus.RETIRED) {
      this.status = BookStatus.AVAILABLE;
      this.isActive = true;
    }
  }

  updateDimensions(dimensions: {
    height?: number;
    width?: number;
    thickness?: number;
    weight?: number;
  }): void {
    this.dimensions = { ...this.dimensions, ...dimensions };
  }

  getPhysicalDescription(): string {
    const parts = [];

    if (this.pages) parts.push(`${this.pages} páginas`);
    if (this.dimensions?.height && this.dimensions?.width) {
      parts.push(`${this.dimensions.height}x${this.dimensions.width}cm`);
    }
    if (this.dimensions?.weight) parts.push(`${this.dimensions.weight}g`);

    return parts.length > 0 ? parts.join(", ") : "Sin información física";
  }

  getDigitalInfo(): string {
    if (!this.isDigital) return "No es formato digital";

    const parts = [];
    if (this.digitalFormat) parts.push(this.digitalFormat);
    if (this.digitalFileSize) {
      const sizeMB = (this.digitalFileSize / (1024 * 1024)).toFixed(2);
      parts.push(`${sizeMB} MB`);
    }
    if (this.digitalDownloads) parts.push(`${this.digitalDownloads} descargas`);

    return parts.length > 0 ? parts.join(", ") : "Formato digital sin detalles";
  }

  getLocationInfo(): string {
    const parts = [];
    if (this.callNumber) parts.push(`Clasificación: ${this.callNumber}`);
    if (this.location) parts.push(`Ubicación: ${this.location}`);
    return parts.length > 0
      ? parts.join(" | ")
      : "Sin información de ubicación";
  }

  getCategoryInfo(): string {
    return this.category ? this.category.name : "Sin categoría";
  }

  getPublicationInfo(): string {
    const parts = [];
    if (this.publisher) parts.push(this.publisher);
    if (this.publicationDate)
      parts.push(this.publicationDate.getFullYear().toString());
    return parts.length > 0
      ? parts.join(", ")
      : "Sin información de publicación";
  }

  getBasicInfo(): string {
    return `${this.getFullTitle()} - ${this.author} (${this.isbn})`;
  }

  getDetailedInfo(): string {
    const parts = [
      `Título: ${this.getFullTitle()}`,
      `Autor: ${this.author}`,
      `ISBN: ${this.isbn}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `Condición: ${this.getConditionDisplayName()}`,
      `Formato: ${this.getFormatDisplayName()}`,
      `Categoría: ${this.getCategoryInfo()}`,
      `Préstamos: ${this.totalLoans}`,
    ];

    if (this.rating) {
      parts.push(
        `Rating: ${this.rating.toFixed(1)}/5.0 (${this.ratingsCount} votos)`
      );
    }

    return parts.join(" | ");
  }

  getAvailabilityInfo(): string {
    if (this.isAvailable()) return "✅ Disponible para préstamo";
    if (this.isCurrentlyBorrowed()) {
      const daysUntilDue = this.getDaysUntilDue();
      if (daysUntilDue !== null) {
        return daysUntilDue > 0
          ? `📚 Prestado - Vence en ${daysUntilDue} días`
          : `⚠️ Prestado - Vencido hace ${Math.abs(daysUntilDue)} días`;
      }
    }
    if (this.status === BookStatus.RESERVED) return "🔒 Reservado";
    if (this.status === BookStatus.MAINTENANCE) return "🔧 En mantenimiento";
    if (this.status === BookStatus.LOST) return "❌ Perdido";
    if (this.status === BookStatus.DAMAGED) return "💔 Dañado";
    if (this.status === BookStatus.RETIRED) return "🗄️ Dado de baja";

    return `❓ Estado: ${this.getStatusDisplayName()}`;
  }

  getBookSummary(): string {
    return `${this.getBasicInfo()} - ${this.getAvailabilityInfo()}`;
  }

  getLoanHistory(): {
    totalLoans: number;
    averageLoanDuration: number;
    popularityScore: number;
  } {
    const completedLoans = this.loans.filter((loan) => loan.isReturned);

    let totalDuration = 0;
    for (const loan of completedLoans) {
      const loanDuration = Math.floor(
        (loan.returnDate!.getTime() - loan.loanDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      totalDuration += loanDuration;
    }

    const averageLoanDuration =
      completedLoans.length > 0 ? totalDuration / completedLoans.length : 0;

    return {
      totalLoans: this.totalLoans,
      averageLoanDuration: Math.round(averageLoanDuration),
      popularityScore: this.calculatePopularity(),
    };
  }

  canBeRenewed(): boolean {
    const currentLoan = this.getCurrentLoan();
    return currentLoan ? currentLoan.canBeRenewed() : false;
  }

  needsSpecialHandling(): boolean {
    return (
      this.requiresSpecialHandling ||
      this.condition === BookCondition.POOR ||
      this.condition === BookCondition.DAMAGED ||
      this.isReference
    );
  }

  getSpecialRequirements(): string[] {
    const requirements = [];

    if (this.requiresSpecialHandling)
      requirements.push("Manejo especial requerido");
    if (this.isReference) requirements.push("Solo consulta en biblioteca");
    if (this.condition === BookCondition.POOR)
      requirements.push("Condición delicada");
    if (this.condition === BookCondition.DAMAGED)
      requirements.push("Tiene daños");
    if (this.specialInstructions)
      requirements.push(`Instrucciones: ${this.specialInstructions}`);

    return requirements;
  }
}
