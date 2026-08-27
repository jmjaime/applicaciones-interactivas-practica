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
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Category } from "./Category";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  AUTHOR = "author",
  SUBSCRIBER = "subscriber",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
  PENDING = "pending",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column({ unique: true, length: 30 })
  username!: string;

  @Column({ type: "int" })
  age!: number;

  @Column({ default: UserRole.SUBSCRIBER })
  role!: UserRole;

  @Column({ default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column({ type: "int", default: 0 })
  postCount!: number;

  @Column({ type: "int", default: 0 })
  commentCount!: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  city?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  country?: string;

  @Column({ type: "date", nullable: true })
  lastLoginDate?: Date;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relaciones
  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @ManyToOne(() => Category, (category) => category.users, { nullable: true })
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @Column({ nullable: true })
  categoryId?: number;

  // Métodos de negocio
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  isEditor(): boolean {
    return this.role === UserRole.EDITOR || this.role === UserRole.ADMIN;
  }

  canPublish(): boolean {
    return (
      this.role === UserRole.ADMIN ||
      this.role === UserRole.EDITOR ||
      this.role === UserRole.AUTHOR
    );
  }

  getStatusDisplay(): string {
    const statusMap = {
      [UserStatus.ACTIVE]: "✅ Activo",
      [UserStatus.INACTIVE]: "⏸️ Inactivo",
      [UserStatus.BANNED]: "🚫 Bloqueado",
      [UserStatus.PENDING]: "⏳ Pendiente",
    };
    return statusMap[this.status];
  }

  getRoleDisplay(): string {
    const roleMap = {
      [UserRole.ADMIN]: "👑 Administrador",
      [UserRole.EDITOR]: "✏️ Editor",
      [UserRole.AUTHOR]: "📝 Autor",
      [UserRole.SUBSCRIBER]: "👤 Suscriptor",
    };
    return roleMap[this.role];
  }

  getActivityLevel(): string {
    const totalActivity = this.postCount + this.commentCount;
    if (totalActivity >= 100) return "🔥 Muy Activo";
    if (totalActivity >= 50) return "⚡ Activo";
    if (totalActivity >= 10) return "📈 Moderado";
    return "💤 Nuevo";
  }

  getFormattedBalance(): string {
    return `$${this.balance.toFixed(2)}`;
  }

  getDaysActive(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getLocation(): string {
    if (this.city && this.country) {
      return `${this.city}, ${this.country}`;
    }
    return this.country || this.city || "No especificado";
  }

  hasRecentActivity(): boolean {
    if (!this.lastLoginDate) return false;
    const loginDate =
      this.lastLoginDate instanceof Date
        ? this.lastLoginDate
        : new Date(this.lastLoginDate);
    const daysSinceLogin = Math.floor(
      (Date.now() - loginDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceLogin <= 7;
  }
}
