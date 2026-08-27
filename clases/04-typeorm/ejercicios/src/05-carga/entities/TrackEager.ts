import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PlaylistEager } from "./PlaylistEager";

@Entity()
export class TrackEager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @ManyToOne(() => PlaylistEager, (playlist) => playlist.tracks)
  playlist!: PlaylistEager;
}
