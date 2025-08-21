import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

export enum CommentStatus {
  APPROVED = "approved",
  PENDING = "pending",
  SPAM = "spam",
  DELETED = "deleted",
}

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content!: string;

  @Column({ default: CommentStatus.PENDING })
  status!: CommentStatus;

  @Column({ type: "int", default: 0 })
  likeCount!: number;

  @Column({ type: "int", default: 0 })
  dislikeCount!: number;

  @Column({ type: "boolean", default: false })
  isEdited!: boolean;

  @Column({ type: "varchar", length: 45, nullable: true })
  ipAddress?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  userAgent?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relaciones
  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: "authorId" })
  author!: User;

  @Column()
  authorId!: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  @JoinColumn({ name: "postId" })
  post!: Post;

  @Column()
  postId!: number;

  // Métodos de negocio
  isApproved(): boolean {
    return this.status === CommentStatus.APPROVED;
  }

  isPending(): boolean {
    return this.status === CommentStatus.PENDING;
  }

  isSpam(): boolean {
    return this.status === CommentStatus.SPAM;
  }

  getStatusDisplay(): string {
    const statusMap = {
      [CommentStatus.APPROVED]: "✅ Aprobado",
      [CommentStatus.PENDING]: "⏳ Pendiente",
      [CommentStatus.SPAM]: "🚫 Spam",
      [CommentStatus.DELETED]: "🗑️ Eliminado",
    };
    return statusMap[this.status];
  }

  getEngagementScore(): number {
    return this.likeCount - this.dislikeCount;
  }

  isPopular(): boolean {
    return this.likeCount > 10;
  }

  isRecent(): boolean {
    const daysSinceCreated = Math.floor(
      (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceCreated <= 1;
  }

  getFormattedDate(): string {
    return this.createdAt.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getPreview(length: number = 100): string {
    if (this.content.length <= length) return this.content;
    return this.content.substring(0, length).trim() + "...";
  }

  hasGoodRating(): boolean {
    return this.getEngagementScore() > 0;
  }

  getEditedStatus(): string {
    return this.isEdited ? "✏️ Editado" : "";
  }
}
