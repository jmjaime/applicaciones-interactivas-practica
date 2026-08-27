import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Track } from "./Track";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @OneToMany(() => Track, (track) => track.artist)
  tracks?: Track[];
}
