import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Track } from "./Track";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  // Por defecto, TypeORM NO carga esta relación al hacer find() — hay que
  // pedirla explícitamente (relations: ["tracks"]). Contraste con
  // PlaylistEager, que la carga siempre.
  @OneToMany(() => Track, (track) => track.playlist)
  tracks?: Track[];
}
