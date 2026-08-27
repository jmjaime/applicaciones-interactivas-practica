import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Track } from "./Track";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @ManyToOne(() => User, (user) => user.playlists)
  owner!: User;

  @OneToMany(() => Track, (track) => track.playlist)
  tracks?: Track[];
}
