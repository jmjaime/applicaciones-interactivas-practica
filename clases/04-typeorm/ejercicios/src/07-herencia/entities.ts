import {
  Entity,
  ChildEntity,
  TableInheritance,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

// Table Per Hierarchy: una sola tabla `track` con una columna
// discriminadora (`type`) que dice de qué subtipo es cada fila. Mismo
// concepto que se vio en Clase 3 con SQL a mano (una tabla con columna
// `type` + columnas nullable de cada subtipo) — acá TypeORM genera ese
// esquema solo, a partir de la jerarquía de clases.
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;
}

@ChildEntity("song")
export class Song extends Track {
  @Column({ length: 150, nullable: true })
  albumTitle!: string;

  @Column({ type: "int", nullable: true })
  trackNumber!: number;
}

@ChildEntity("podcast")
export class Podcast extends Track {
  @Column({ length: 100, nullable: true })
  hostName!: string;

  @Column({ type: "int", nullable: true })
  episodeNumber!: number;
}

@ChildEntity("audiobook")
export class Audiobook extends Track {
  @Column({ length: 100, nullable: true })
  narrator!: string;

  @Column({ type: "int", nullable: true })
  chapterCount!: number;
}
