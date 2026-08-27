import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Table Per Class: cada subtipo tiene su propia tabla completa (id,
// title, durationSeconds + sus columnas propias) — a diferencia del
// ejercicio 7 (Table Per Hierarchy), acá no hay una tabla común ni una
// columna discriminadora. Track es abstract: no se mapea a ninguna tabla.
export abstract class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;
}

@Entity("songs")
export class Song extends Track {
  @Column({ length: 150 })
  albumTitle!: string;

  @Column({ type: "int" })
  trackNumber!: number;
}

@Entity("podcasts")
export class Podcast extends Track {
  @Column({ length: 100 })
  hostName!: string;

  @Column({ type: "int" })
  episodeNumber!: number;
}

@Entity("audiobooks")
export class Audiobook extends Track {
  @Column({ length: 100 })
  narrator!: string;

  @Column({ type: "int" })
  chapterCount!: number;
}
