import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ChildEntity,
} from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;

  abstract getDisplayInfo(): string;
}

@ChildEntity("song")
export class Song extends Track {
  @Column({ length: 150, nullable: true })
  albumTitle!: string;

  @Column({ type: "int", nullable: true })
  trackNumber!: number;

  getDisplayInfo(): string {
    return `${this.title} — ${this.albumTitle} (pista ${this.trackNumber})`;
  }
}

@ChildEntity("podcast")
export class Podcast extends Track {
  @Column({ length: 100, nullable: true })
  hostName!: string;

  @Column({ type: "int", nullable: true })
  episodeNumber!: number;

  getDisplayInfo(): string {
    return `${this.title} — con ${this.hostName} (episodio ${this.episodeNumber})`;
  }
}

@ChildEntity("audiobook")
export class Audiobook extends Track {
  @Column({ length: 100, nullable: true })
  narrator!: string;

  @Column({ type: "int", nullable: true })
  chapterCount!: number;

  getDisplayInfo(): string {
    return `${this.title} — narrado por ${this.narrator} (${this.chapterCount} capítulos)`;
  }
}
