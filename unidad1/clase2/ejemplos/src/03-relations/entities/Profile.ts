import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../01-entities/entities/User";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  avatar?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  website?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  location?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  profession?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  gender?: "male" | "female" | "other" | "prefer_not_to_say";

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string;

  @Column({ type: "json", nullable: true })
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };

  @Column({ type: "boolean", default: true })
  isPublic!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación One-to-One con User
  @OneToOne(() => User, (user) => user.profile, { nullable: false })
  @JoinColumn()
  user!: User;

  // Métodos de negocio
  getAge(): number | null {
    if (!this.birthDate) return null;
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  hasAvatar(): boolean {
    return !!this.avatar;
  }

  hasSocialLinks(): boolean {
    return !!this.socialLinks && Object.keys(this.socialLinks).length > 0;
  }

  getDisplayLocation(): string {
    return this.location || "Not specified";
  }

  getDisplayProfession(): string {
    return this.profession || "Not specified";
  }

  isComplete(): boolean {
    return !!(this.bio && this.location && this.profession);
  }
}
