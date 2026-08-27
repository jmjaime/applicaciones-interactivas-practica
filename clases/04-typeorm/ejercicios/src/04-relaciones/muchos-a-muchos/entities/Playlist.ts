import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Track } from "./Track";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @ManyToOne(() => User)
  owner!: User;

  // @JoinTable va en el lado "dueño" de la relación N:M — TypeORM crea
  // la tabla intermedia (playlist_tracks_track) automáticamente, sin
  // necesidad de declararla como entidad propia.
  @ManyToMany(() => Track, (track) => track.playlists)
  @JoinTable()
  tracks?: Track[];
}
