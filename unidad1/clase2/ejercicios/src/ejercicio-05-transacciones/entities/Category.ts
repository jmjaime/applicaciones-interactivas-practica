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
import { Book } from "./Book";

export enum CategoryType {
  FICTION = "fiction",
  NON_FICTION = "non_fiction",
  REFERENCE = "reference",
  PERIODICAL = "periodical",
  DIGITAL = "digital",
  CHILDREN = "children",
  YOUNG_ADULT = "young_adult",
  ACADEMIC = "academic",
  PROFESSIONAL = "professional",
  RARE = "rare",
}

export enum CategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  ARCHIVED = "archived",
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 10, unique: true, nullable: false })
  code: string; // Código de clasificación (ej: 001, 796.332)

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({
    type: "varchar",
    length: 20,
    default: CategoryType.NON_FICTION,
  })
  type: CategoryType;

  @Column({
    type: "varchar",
    length: 20,
    default: CategoryStatus.ACTIVE,
  })
  status: CategoryStatus;

  @Column({ length: 7, nullable: true })
  color?: string; // Color hex para la interfaz

  @Column({ length: 50, nullable: true })
  icon?: string; // Icono para la interfaz

  @Column({ type: "int", unsigned: true, default: 14 })
  defaultLoanPeriod: number; // Días de préstamo por defecto para esta categoría

  @Column({ type: "int", unsigned: true, default: 2 })
  defaultMaxRenewals: number;

  @Column({ type: "boolean", default: true })
  isLoanable: boolean;

  @Column({ type: "boolean", default: true })
  isReservable: boolean;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0.0 })
  lateFeePerDay: number; // Multa por día de retraso

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  replacementCostMultiplier: number; // Multiplicador para costo de reemplazo

  @Column({ type: "int", unsigned: true, default: 0 })
  totalBooks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  availableBooks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  borrowedBooks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  reservedBooks: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  totalLoans: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  averageRating: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "text", nullable: true })
  notes?: string;

  @Column({ type: "json", nullable: true })
  metadata?: {
    deweyRange?: string;
    ageGroup?: string;
    specialRequirements?: string[];
    relatedCategories?: string[];
  };

  @Column({ type: "int", unsigned: true, nullable: true })
  sortOrder?: number; // Orden de visualización

  @Column({ type: "varchar", length: 100, nullable: true })
  locationPrefix?: string; // Prefijo de ubicación (ej: "A1", "REF")

  @Column({ type: "boolean", default: false })
  requiresSpecialHandling: boolean;

  @Column({ type: "boolean", default: false })
  isRestrictedAccess: boolean; // Acceso restringido

  @Column({ type: "json", nullable: true })
  allowedMemberTypes?: string[]; // Tipos de miembros que pueden acceder

  @Column({ type: "int", unsigned: true, nullable: true })
  maxBooksPerMember?: number; // Límite de libros por miembro en esta categoría

  @Column({ type: "datetime", nullable: true })
  lastUpdated?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  librarian?: string; // Bibliotecario responsable

  // ===== RELACIONES =====

  @OneToMany(() => Book, (book) => book.category, {
    cascade: true,
  })
  books: Book[];

  @ManyToOne(() => Category, (category) => category.subcategories, {
    nullable: true,
  })
  @JoinColumn({ name: "parentCategoryId" })
  parentCategory?: Category;

  @Column({ type: "int", unsigned: true, nullable: true })
  parentCategoryId?: number;

  @OneToMany(() => Category, (category) => category.parentCategory, {
    cascade: true,
  })
  subcategories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(name?: string, code?: string, type?: CategoryType) {
    this.name = name || "";
    this.code = code || "";
    this.type = type || CategoryType.NON_FICTION;
  }

  // ===== MÉTODOS UTILITARIOS =====

  getTypeDisplayName(): string {
    const typeNames: Record<CategoryType, string> = {
      [CategoryType.FICTION]: "Ficción",
      [CategoryType.NON_FICTION]: "No Ficción",
      [CategoryType.REFERENCE]: "Referencia",
      [CategoryType.PERIODICAL]: "Publicación Periódica",
      [CategoryType.DIGITAL]: "Digital",
      [CategoryType.CHILDREN]: "Infantil",
      [CategoryType.YOUNG_ADULT]: "Joven Adulto",
      [CategoryType.ACADEMIC]: "Académico",
      [CategoryType.PROFESSIONAL]: "Profesional",
      [CategoryType.RARE]: "Raro/Antiguo",
    };
    return typeNames[this.type];
  }

  getStatusDisplayName(): string {
    const statusNames: Record<CategoryStatus, string> = {
      [CategoryStatus.ACTIVE]: "Activa",
      [CategoryStatus.INACTIVE]: "Inactiva",
      [CategoryStatus.ARCHIVED]: "Archivada",
    };
    return statusNames[this.status];
  }

  getFullName(): string {
    if (this.parentCategory) {
      return `${this.parentCategory.name} > ${this.name}`;
    }
    return this.name;
  }

  getFullCode(): string {
    if (this.parentCategory) {
      return `${this.parentCategory.code}.${this.code}`;
    }
    return this.code;
  }

  isMainCategory(): boolean {
    return !this.parentCategory;
  }

  hasSubcategories(): boolean {
    return this.subcategories.length > 0;
  }

  getDepth(): number {
    let depth = 0;
    let current = this.parentCategory;
    while (current) {
      depth++;
      current = current.parentCategory;
    }
    return depth;
  }

  getRootCategory(): Category {
    let current: Category = this;
    while (current.parentCategory) {
      current = current.parentCategory;
    }
    return current;
  }

  getAllSubcategories(): Category[] {
    const allSubs: Category[] = [];

    for (const sub of this.subcategories) {
      allSubs.push(sub);
      allSubs.push(...sub.getAllSubcategories());
    }

    return allSubs;
  }

  getAllBooks(): Book[] {
    let allBooks = [...this.books];

    for (const sub of this.subcategories) {
      allBooks = allBooks.concat(sub.getAllBooks());
    }

    return allBooks;
  }

  getAvailableBooks(): Book[] {
    return this.getAllBooks().filter((book) => book.isAvailable());
  }

  getBorrowedBooks(): Book[] {
    return this.getAllBooks().filter((book) => book.isCurrentlyBorrowed());
  }

  getReservedBooks(): Book[] {
    return this.getAllBooks().filter((book) => book.status === "reserved");
  }

  calculateStatistics(): {
    totalBooks: number;
    availableBooks: number;
    borrowedBooks: number;
    reservedBooks: number;
    availabilityRate: number;
    utilizationRate: number;
    averageRating: number;
  } {
    const allBooks = this.getAllBooks();
    const available = this.getAvailableBooks();
    const borrowed = this.getBorrowedBooks();
    const reserved = this.getReservedBooks();

    const ratings = allBooks
      .filter((book) => book.rating !== null && book.rating !== undefined)
      .map((book) => book.rating!);

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;

    return {
      totalBooks: allBooks.length,
      availableBooks: available.length,
      borrowedBooks: borrowed.length,
      reservedBooks: reserved.length,
      availabilityRate:
        allBooks.length > 0 ? (available.length / allBooks.length) * 100 : 0,
      utilizationRate:
        allBooks.length > 0 ? (borrowed.length / allBooks.length) * 100 : 0,
      averageRating: Number(averageRating.toFixed(2)),
    };
  }

  updateStatistics(): void {
    const stats = this.calculateStatistics();
    this.totalBooks = stats.totalBooks;
    this.availableBooks = stats.availableBooks;
    this.borrowedBooks = stats.borrowedBooks;
    this.reservedBooks = stats.reservedBooks;
    this.averageRating = stats.averageRating;
    this.lastUpdated = new Date();
  }

  canMemberAccess(memberType: string): boolean {
    if (!this.isRestrictedAccess) return true;
    if (!this.allowedMemberTypes) return true;
    return this.allowedMemberTypes.includes(memberType);
  }

  getMemberBookLimit(memberType: string): number {
    if (!this.canMemberAccess(memberType)) return 0;
    return this.maxBooksPerMember || 999; // Sin límite por defecto
  }

  addBook(book: Book): void {
    if (!this.books.includes(book)) {
      this.books.push(book);
      book.category = this;
      book.categoryId = this.id;
      this.updateStatistics();
    }
  }

  removeBook(book: Book): void {
    const index = this.books.indexOf(book);
    if (index > -1) {
      this.books.splice(index, 1);
      book.category = undefined;
      book.categoryId = undefined;
      this.updateStatistics();
    }
  }

  addSubcategory(subcategory: Category): void {
    if (!this.subcategories.includes(subcategory)) {
      this.subcategories.push(subcategory);
      subcategory.parentCategory = this;
      subcategory.parentCategoryId = this.id;
    }
  }

  removeSubcategory(subcategory: Category): void {
    const index = this.subcategories.indexOf(subcategory);
    if (index > -1) {
      this.subcategories.splice(index, 1);
      subcategory.parentCategory = undefined;
      subcategory.parentCategoryId = undefined;
    }
  }

  activate(): void {
    this.status = CategoryStatus.ACTIVE;
    this.isActive = true;
  }

  deactivate(): void {
    this.status = CategoryStatus.INACTIVE;
    this.isActive = false;
  }

  archive(): void {
    this.status = CategoryStatus.ARCHIVED;
    this.isActive = false;
  }

  getLocationInfo(): string {
    if (this.locationPrefix) {
      return `Ubicación: ${this.locationPrefix}`;
    }
    return "Sin ubicación específica";
  }

  getAccessRequirements(): string[] {
    const requirements = [];

    if (this.isRestrictedAccess) {
      requirements.push("Acceso restringido");
      if (this.allowedMemberTypes && this.allowedMemberTypes.length > 0) {
        requirements.push(`Solo para: ${this.allowedMemberTypes.join(", ")}`);
      }
    }

    if (this.requiresSpecialHandling) {
      requirements.push("Requiere manejo especial");
    }

    if (this.maxBooksPerMember) {
      requirements.push(`Límite: ${this.maxBooksPerMember} libros por miembro`);
    }

    return requirements;
  }

  getHierarchyPath(): string {
    const path = [];
    let current: Category = this;

    while (current) {
      path.unshift(current.name);
      current = current.parentCategory!;
    }

    return path.join(" > ");
  }

  getBreadcrumbs(): { name: string; code: string; id: number }[] {
    const breadcrumbs = [];
    let current: Category = this;

    while (current) {
      breadcrumbs.unshift({
        name: current.name,
        code: current.code,
        id: current.id,
      });
      current = current.parentCategory!;
    }

    return breadcrumbs;
  }

  getDisplayInfo(): string {
    const parts = [
      `Categoría: ${this.name}`,
      `Código: ${this.code}`,
      `Tipo: ${this.getTypeDisplayName()}`,
      `Estado: ${this.getStatusDisplayName()}`,
      `Libros: ${this.totalBooks}`,
      `Disponibles: ${this.availableBooks}`,
    ];

    if (this.averageRating > 0) {
      parts.push(`Rating: ${this.averageRating.toFixed(1)}/5.0`);
    }

    return parts.join(" | ");
  }

  getCategoryTree(): string {
    const indent = "  ".repeat(this.getDepth());
    let tree = `${indent}${this.name} (${this.code}) [${this.totalBooks} libros]`;

    for (const sub of this.subcategories) {
      tree += "\n" + sub.getCategoryTree();
    }

    return tree;
  }

  getDetailedSummary(): string {
    const stats = this.calculateStatistics();
    const requirements = this.getAccessRequirements();

    let summary = `📚 ${this.getFullName()} (${this.getFullCode()})\n`;
    summary += `   Tipo: ${this.getTypeDisplayName()} | Estado: ${this.getStatusDisplayName()}\n`;
    summary += `   Libros: ${stats.totalBooks} total, ${stats.availableBooks} disponibles, ${stats.borrowedBooks} prestados\n`;
    summary += `   Disponibilidad: ${stats.availabilityRate.toFixed(
      1
    )}% | Utilización: ${stats.utilizationRate.toFixed(1)}%\n`;

    if (stats.averageRating > 0) {
      summary += `   Rating promedio: ${stats.averageRating}/5.0\n`;
    }

    if (requirements.length > 0) {
      summary += `   Requisitos: ${requirements.join(", ")}\n`;
    }

    if (this.hasSubcategories()) {
      summary += `   Subcategorías: ${this.subcategories.length}\n`;
    }

    return summary;
  }

  getLoanPolicy(): {
    defaultLoanPeriod: number;
    defaultMaxRenewals: number;
    lateFeePerDay: number;
    isLoanable: boolean;
    isReservable: boolean;
  } {
    return {
      defaultLoanPeriod: this.defaultLoanPeriod,
      defaultMaxRenewals: this.defaultMaxRenewals,
      lateFeePerDay: this.lateFeePerDay,
      isLoanable: this.isLoanable,
      isReservable: this.isReservable,
    };
  }

  findBookByBarcode(barcode: string): Book | null {
    return this.getAllBooks().find((book) => book.barcode === barcode) || null;
  }

  findBooksByAuthor(author: string): Book[] {
    return this.getAllBooks().filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  findBooksByTitle(title: string): Book[] {
    return this.getAllBooks().filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  getPopularBooks(limit: number = 10): Book[] {
    return this.getAllBooks()
      .sort((a, b) => b.totalLoans - a.totalLoans)
      .slice(0, limit);
  }

  getNewBooks(days: number = 30): Book[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.getAllBooks()
      .filter((book) => book.acquisitionDate >= cutoffDate)
      .sort(
        (a, b) => b.acquisitionDate.getTime() - a.acquisitionDate.getTime()
      );
  }

  getOverdueBooks(): Book[] {
    return this.getAllBooks().filter((book) => book.isOverdue());
  }

  canAccommodateNewBooks(): boolean {
    return this.status === CategoryStatus.ACTIVE && this.isActive;
  }
}
