import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Book } from "./Book";

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "text", nullable: true })
  biography?: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  nationality?: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación One-to-Many con Book
  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books!: Book[];

  // Métodos de negocio
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

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

  getBookCount(): number {
    return this.books ? this.books.length : 0;
  }

  isPublished(): boolean {
    return this.books ? this.books.some((book) => book.isPublished) : false;
  }
}
