import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Artist } from "./Artist";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;

  @Column({ type: "int", default: 0 })
  plays!: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks)
  artist!: Artist;
}
