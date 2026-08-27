import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  releaseYear!: number;

  @Column({ length: 40 })
  genre!: string;

  @Column({ type: "int" })
  durationMinutes!: number;

  @Column({ type: "boolean", default: false })
  isExplicit!: boolean;
}
