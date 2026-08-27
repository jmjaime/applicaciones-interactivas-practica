import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Playlist } from "./Playlist";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30, unique: true })
  username!: string;

  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists?: Playlist[];
}
