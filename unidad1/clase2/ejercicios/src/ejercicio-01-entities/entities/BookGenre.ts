import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BookGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ length: 10, unique: true })
  code: string;

  @Column({
    type: "int",
    unsigned: true,
    default: 3,
  })
  popularity: number; // 1-5 scale

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({
    type: "varchar",
    length: 20,
    default: "fiction",
  })
  category: string;

  @Column({ type: "int", unsigned: true, default: 0 })
  bookCount: number;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0.0 })
  averageRating: number;

  @Column({ type: "varchar", length: 7, nullable: true })
  colorCode?: string; // Hex color code for UI

  @Column({ type: "boolean", default: false })
  isFeatured: boolean;

  @Column({ type: "datetime", nullable: true })
  lastUpdated?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    name?: string,
    code?: string,
    popularity?: number,
    category?: string
  ) {
    this.name = name || "";
    this.code = code || "";
    this.popularity = popularity || 3;
    this.category = category || "fiction";
  }

  // Métodos de utilidad
  getPopularityDescription(): string {
    switch (this.popularity) {
      case 1:
        return "Muy baja";
      case 2:
        return "Baja";
      case 3:
        return "Media";
      case 4:
        return "Alta";
      case 5:
        return "Muy alta";
      default:
        return "Sin clasificar";
    }
  }

  isHighlyRated(): boolean {
    return this.averageRating >= 4.0;
  }

  updateLastModified(): void {
    this.lastUpdated = new Date();
  }
}
