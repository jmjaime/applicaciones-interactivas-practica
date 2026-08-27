import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TrackEager } from "./TrackEager";

@Entity()
export class PlaylistEager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  // eager: true hace que TypeORM cargue esta relación SIEMPRE, en
  // cualquier find(), sin pedirla en `relations`.
  @OneToMany(() => TrackEager, (track) => track.playlist, { eager: true })
  tracks?: TrackEager[];
}
