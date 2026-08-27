import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, unique: true })
  name!: string;

  @Column({ length: 150, unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 7, default: "#6B7280" })
  color!: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  icon?: string;

  @Column({ type: "int", default: 0 })
  postCount!: number;

  @Column({ type: "int", default: 0 })
  userCount!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "boolean", default: false })
  isFeatured!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @Column({ type: "varchar", length: 500, nullable: true })
  metaDescription?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relaciones
  @OneToMany(() => Post, (post) => post.category)
  posts!: Post[];

  @OneToMany(() => User, (user) => user.category)
  users!: User[];

  // Métodos de negocio
  getDisplayName(): string {
    return this.name;
  }

  getUrl(): string {
    return `/categories/${this.slug}`;
  }

  hasIcon(): boolean {
    return !!this.icon;
  }

  getIconDisplay(): string {
    return this.icon || "📁";
  }

  isPopular(): boolean {
    return this.postCount > 50;
  }

  isEmpty(): boolean {
    return this.postCount === 0;
  }

  getActivityLevel(): string {
    if (this.postCount >= 100) return "🔥 Muy Activa";
    if (this.postCount >= 50) return "⚡ Activa";
    if (this.postCount >= 10) return "📈 Moderada";
    return "💤 Baja";
  }

  getColorStyle(): string {
    return `background-color: ${this.color}`;
  }

  getStats(): { posts: number; users: number } {
    return {
      posts: this.postCount,
      users: this.userCount,
    };
  }

  getFormattedDescription(length: number = 200): string {
    if (!this.description) return "Sin descripción";
    if (this.description.length <= length) return this.description;
    return this.description.substring(0, length).trim() + "...";
  }
}
