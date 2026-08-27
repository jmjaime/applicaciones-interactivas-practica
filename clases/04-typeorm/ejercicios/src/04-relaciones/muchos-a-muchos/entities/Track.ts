import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Playlist } from "./Playlist";

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;

  @ManyToMany(() => Playlist, (playlist) => playlist.tracks)
  playlists?: Playlist[];
}
