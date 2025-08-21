import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

export enum ReviewStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  FLAGGED = "flagged",
}

@Entity("reviews")
@Index("idx_review_product", ["productId"]) // Consultas por producto
@Index("idx_review_user", ["userId"]) // Consultas por usuario
@Index("idx_review_rating", ["rating"]) // Ordenamiento por rating
@Index("idx_review_status", ["status"]) // Filtrado por estado
@Index("idx_review_product_rating", ["productId", "rating"]) // Consultas específicas
@Index("idx_review_verified", ["isVerified"]) // Filtrado por verificación
@Index("idx_review_helpful", ["helpfulVotes"]) // Ordenamiento por votos útiles
@Index("idx_review_created", ["createdAt"]) // Ordenamiento por fecha
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    default: 5,
  })
  rating!: number; // 1-5

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "text" })
  comment!: string;

  @Column({
    type: "varchar",
    length: 20,
    default: ReviewStatus.PENDING,
  })
  status!: ReviewStatus;

  @Column({ default: false })
  isVerified!: boolean; // Usuario verificado que compró el producto

  @Column({ default: 0 })
  helpfulVotes!: number; // Votos de "útil"

  @Column({ default: 0 })
  unhelpfulVotes!: number; // Votos de "no útil"

  @Column({ default: 0 })
  totalVotes!: number; // Campo desnormalizado

  @Column({
    type: "decimal",
    precision: 3,
    scale: 2,
    default: 0,
  })
  helpfulRatio!: number; // Ratio de votos útiles

  // Campos desnormalizados para evitar JOINs en listados
  @Column({ type: "varchar", length: 300 })
  productName!: string;

  @Column({ type: "varchar", length: 50 })
  productSku!: string;

  @Column({ type: "varchar", length: 100 })
  userName!: string;

  @Column({ type: "varchar", length: 255 })
  userEmail!: string;

  @Column({ default: false })
  isUserPremium!: boolean;

  @Column({ type: "text", nullable: true })
  adminNotes!: string | null;

  @Column({ type: "text", nullable: true })
  images!: string | null; // JSON array de URLs de imágenes

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación muchos-a-uno con usuario
  @Column()
  userId!: number; // FK explícita para optimización

  @ManyToOne(() => User, (user) => user.reviews, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: Promise<User>;

  // Relación muchos-a-uno con producto
  @Column()
  productId!: number; // FK explícita para optimización

  @ManyToOne(() => Product, (product) => product.reviews, {
    lazy: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productId" })
  product!: Promise<Product>;

  // Métodos helper
  get isPending(): boolean {
    return this.status === ReviewStatus.PENDING;
  }

  get isApproved(): boolean {
    return this.status === ReviewStatus.APPROVED;
  }

  get isRejected(): boolean {
    return this.status === ReviewStatus.REJECTED;
  }

  get isFlagged(): boolean {
    return this.status === ReviewStatus.FLAGGED;
  }

  get isHighRating(): boolean {
    return this.rating >= 4;
  }

  get isLowRating(): boolean {
    return this.rating <= 2;
  }

  get isPositive(): boolean {
    return this.rating >= 4;
  }

  get isNegative(): boolean {
    return this.rating <= 2;
  }

  get isNeutral(): boolean {
    return this.rating === 3;
  }

  get isHelpful(): boolean {
    return this.helpfulRatio >= 0.7 && this.totalVotes >= 5;
  }

  get hasImages(): boolean {
    return this.images !== null && this.images !== "";
  }

  get isDetailed(): boolean {
    return this.comment.length >= 100;
  }

  get ageInDays(): number {
    return Math.floor(
      (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  get isRecent(): boolean {
    return this.ageInDays <= 30;
  }

  get ratingStars(): string {
    return "★".repeat(this.rating) + "☆".repeat(5 - this.rating);
  }

  get shortComment(): string {
    if (this.comment.length <= 100) return this.comment;
    return this.comment.substring(0, 100) + "...";
  }

  // Método para aprobar review
  approve() {
    this.status = ReviewStatus.APPROVED;
  }

  // Método para rechazar review
  reject(reason?: string) {
    this.status = ReviewStatus.REJECTED;
    if (reason) {
      this.adminNotes = reason;
    }
  }

  // Método para marcar como flagged
  flag(reason?: string) {
    this.status = ReviewStatus.FLAGGED;
    if (reason) {
      this.adminNotes = reason;
    }
  }

  // Método para agregar voto útil
  addHelpfulVote() {
    this.helpfulVotes++;
    this.updateVoteStats();
  }

  // Método para agregar voto no útil
  addUnhelpfulVote() {
    this.unhelpfulVotes++;
    this.updateVoteStats();
  }

  // Método para actualizar estadísticas de votos
  private updateVoteStats() {
    this.totalVotes = this.helpfulVotes + this.unhelpfulVotes;
    this.helpfulRatio =
      this.totalVotes > 0 ? this.helpfulVotes / this.totalVotes : 0;
  }

  // Método para actualizar información del producto (desnormalización)
  updateProductInfo(name: string, sku: string) {
    this.productName = name;
    this.productSku = sku;
  }

  // Método para actualizar información del usuario (desnormalización)
  updateUserInfo(name: string, email: string, isPremium: boolean) {
    this.userName = name;
    this.userEmail = email;
    this.isUserPremium = isPremium;
  }

  // Método para obtener imágenes parseadas
  getParsedImages(): string[] {
    if (!this.images) return [];
    try {
      return JSON.parse(this.images);
    } catch {
      return [];
    }
  }

  // Método para setear imágenes
  setImages(imageUrls: string[]) {
    this.images = JSON.stringify(imageUrls);
  }

  // Método para obtener resumen de la review
  getSummary(): string {
    return `${this.ratingStars} "${this.title}" por ${this.userName}`;
  }

  // Método para verificar si la review es spam
  isSpam(): boolean {
    // Lógica simple para detectar spam
    const spamKeywords = ["spam", "fake", "bot", "promotional"];
    const commentLower = this.comment.toLowerCase();
    return spamKeywords.some((keyword) => commentLower.includes(keyword));
  }

  // Método para obtener sentiment score básico
  getSentimentScore(): number {
    // Lógica simple basada en palabras clave
    const positiveWords = [
      "excellent",
      "great",
      "amazing",
      "perfect",
      "love",
      "best",
    ];
    const negativeWords = [
      "terrible",
      "awful",
      "worst",
      "hate",
      "bad",
      "horrible",
    ];

    const commentLower = this.comment.toLowerCase();
    let score = 0;

    positiveWords.forEach((word) => {
      if (commentLower.includes(word)) score++;
    });

    negativeWords.forEach((word) => {
      if (commentLower.includes(word)) score--;
    });

    return score;
  }

  // Método para validar rating
  validateRating(rating: number): boolean {
    return rating >= 1 && rating <= 5 && Number.isInteger(rating);
  }

  // Método para verificar si necesita moderación
  needsModeration(): boolean {
    return (
      this.isSpam() ||
      this.getSentimentScore() <= -2 ||
      this.comment.length < 10
    );
  }

  // Método para obtener tipo de review
  getType(): string {
    if (this.isPositive) return "positive";
    if (this.isNegative) return "negative";
    return "neutral";
  }

  // Método para calcular peso de la review
  getWeight(): number {
    let weight = 1;

    // Usuarios verificados tienen mayor peso
    if (this.isVerified) weight += 0.5;

    // Usuarios premium tienen mayor peso
    if (this.isUserPremium) weight += 0.3;

    // Reviews con imágenes tienen mayor peso
    if (this.hasImages) weight += 0.2;

    // Reviews detalladas tienen mayor peso
    if (this.isDetailed) weight += 0.2;

    // Reviews con muchos votos útiles tienen mayor peso
    if (this.isHelpful) weight += 0.3;

    return weight;
  }
}
