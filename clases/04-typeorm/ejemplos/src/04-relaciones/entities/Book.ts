import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Author } from "./Author";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ unique: true, length: 20 })
  isbn!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ type: "int" })
  pages!: number;

  @Column({ type: "date", nullable: true })
  publishedDate?: Date;

  @Column({ type: "boolean", default: false })
  isPublished!: boolean;

  @Column({ type: "varchar", length: 100, nullable: true })
  genre?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  publisher?: string;

  @Column({ type: "int", default: 0 })
  stock!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relación Many-to-One con Author
  @ManyToOne(() => Author, (author) => author.books, { nullable: false })
  author!: Author;

  // Métodos de negocio
  isAvailable(): boolean {
    return this.stock > 0 && this.isPublished;
  }

  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  getYearPublished(): number | null {
    if (!this.publishedDate) return null;
    const d =
      this.publishedDate instanceof Date
        ? this.publishedDate
        : new Date(this.publishedDate as any);
    return d.getFullYear();
  }

  isNewRelease(): boolean {
    if (!this.publishedDate) return false;
    const d =
      this.publishedDate instanceof Date
        ? this.publishedDate
        : new Date(this.publishedDate as any);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return d > oneYearAgo;
  }

  getTotalValue(): number {
    return this.price * this.stock;
  }
}
