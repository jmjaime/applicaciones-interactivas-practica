import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Playlist } from "./Playlist";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.tracks)
  playlist!: Playlist;
}
