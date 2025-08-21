import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Category } from "./Category";
import { Tag } from "./Tag";

export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
  DELETED = "deleted",
}

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "text", nullable: true })
  excerpt?: string;

  @Column({ length: 250, unique: true })
  slug!: string;

  @Column({ default: PostStatus.DRAFT })
  status!: PostStatus;

  @Column({ type: "int", default: 0 })
  viewCount!: number;

  @Column({ type: "int", default: 0 })
  likeCount!: number;

  @Column({ type: "int", default: 0 })
  commentCount!: number;

  @Column({ type: "int", default: 0 })
  shareCount!: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  rating!: number;

  @Column({ type: "boolean", default: false })
  isFeatured!: boolean;

  @Column({ type: "boolean", default: true })
  allowComments!: boolean;

  @Column({ type: "varchar", length: 500, nullable: true })
  metaDescription?: string;

  @Column({ type: "json", nullable: true })
  seoTags?: string[];

  @Column({ type: "date", nullable: true })
  publishedDate?: Date;

  @Column({ type: "int", default: 0 })
  readingTime!: number; // en minutos

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relaciones
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: "authorId" })
  author!: User;

  @Column()
  authorId!: number;

  @ManyToOne(() => Category, (category) => category.posts, { nullable: true })
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @Column({ nullable: true })
  categoryId?: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: "post_tags",
    joinColumn: { name: "postId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "tagId", referencedColumnName: "id" },
  })
  tags!: Tag[];

  // Métodos de negocio
  isPublished(): boolean {
    return this.status === PostStatus.PUBLISHED;
  }

  isDraft(): boolean {
    return this.status === PostStatus.DRAFT;
  }

  getStatusDisplay(): string {
    const statusMap = {
      [PostStatus.DRAFT]: "✏️ Borrador",
      [PostStatus.PUBLISHED]: "🌐 Publicado",
      [PostStatus.ARCHIVED]: "📦 Archivado",
      [PostStatus.DELETED]: "🗑️ Eliminado",
    };
    return statusMap[this.status];
  }

  getEngagementRate(): number {
    if (this.viewCount === 0) return 0;
    const engagements = this.likeCount + this.commentCount + this.shareCount;
    return (engagements / this.viewCount) * 100;
  }

  getPopularityScore(): number {
    // Algoritmo simple para calcular popularidad
    const viewWeight = 0.1;
    const likeWeight = 2;
    const commentWeight = 5;
    const shareWeight = 10;

    return (
      this.viewCount * viewWeight +
      this.likeCount * likeWeight +
      this.commentCount * commentWeight +
      this.shareCount * shareWeight
    );
  }

  getFormattedPublishedDate(): string {
    if (!this.publishedDate) return "No publicado";
    return this.publishedDate.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  getReadingTimeDisplay(): string {
    if (this.readingTime <= 0) return "< 1 min";
    return `${this.readingTime} min`;
  }

  isPopular(): boolean {
    return this.viewCount > 1000 || this.likeCount > 100;
  }

  isRecent(): boolean {
    const daysSincePublished = this.publishedDate
      ? Math.floor(
          (Date.now() - this.publishedDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : null;
    return daysSincePublished !== null && daysSincePublished <= 7;
  }

  getEngagementLevel(): string {
    const rate = this.getEngagementRate();
    if (rate >= 10) return "🔥 Muy Alto";
    if (rate >= 5) return "⚡ Alto";
    if (rate >= 2) return "📈 Moderado";
    return "💤 Bajo";
  }

  hasGoodRating(): boolean {
    return this.rating >= 4.0;
  }

  getUrl(): string {
    return `/posts/${this.slug}`;
  }

  getExcerpt(length: number = 150): string {
    if (this.excerpt) return this.excerpt;

    // Generar excerpt del contenido
    const plainText = this.content.replace(/<[^>]*>/g, ""); // Remover HTML
    if (plainText.length <= length) return plainText;

    return plainText.substring(0, length).trim() + "...";
  }
}
