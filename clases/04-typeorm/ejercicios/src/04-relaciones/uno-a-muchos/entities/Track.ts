import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Artist } from "./Artist";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;

  // Del lado "muchos" no hace falta unique — varios Track pueden apuntar
  // al mismo Artist, a diferencia de la FK 1:1 del ejercicio anterior.
  @ManyToOne(() => Artist, (artist) => artist.tracks)
  @JoinColumn()
  artist!: Artist;
}
