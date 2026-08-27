import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Post } from "./Post";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ length: 75, unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 7, default: "#6366F1" })
  color!: string;

  @Column({ type: "int", default: 0 })
  postCount!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "boolean", default: false })
  isTrending!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relaciones
  @ManyToMany(() => Post, (post) => post.tags)
  posts!: Post[];

  // Métodos de negocio
  getDisplayName(): string {
    return `#${this.name}`;
  }

  getUrl(): string {
    return `/tags/${this.slug}`;
  }

  isPopular(): boolean {
    return this.postCount > 20;
  }

  isEmpty(): boolean {
    return this.postCount === 0;
  }

  getPopularityLevel(): string {
    if (this.postCount >= 100) return "🔥 Muy Popular";
    if (this.postCount >= 50) return "⚡ Popular";
    if (this.postCount >= 10) return "📈 Moderado";
    return "💤 Nuevo";
  }

  getColorStyle(): string {
    return `background-color: ${this.color}`;
  }

  getFormattedDescription(length: number = 100): string {
    if (!this.description) return "Sin descripción";
    if (this.description.length <= length) return this.description;
    return this.description.substring(0, length).trim() + "...";
  }

  getTrendingStatus(): string {
    return this.isTrending ? "🔥 Trending" : "";
  }
}
