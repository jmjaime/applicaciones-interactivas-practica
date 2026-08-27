import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// ============================================================================
// TABLE PER CLASS (TPC) - TYPEORM ENTITIES
// Herencia verdadera: cada clase tiene su tabla completa
// ============================================================================

// Clase base abstracta (no se mapea a tabla)
export abstract class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: "int" })
  durationSeconds!: number;

  abstract getDisplayInfo(): string;
}

@Entity("songs")
export class Song extends Track {
  @Column({ length: 150 })
  albumTitle!: string;

  @Column({ type: "int" })
  trackNumber!: number;

  getDisplayInfo(): string {
    return `${this.title} — ${this.albumTitle} (pista ${this.trackNumber})`;
  }
}

@Entity("podcasts")
export class Podcast extends Track {
  @Column({ length: 100 })
  hostName!: string;

  @Column({ type: "int" })
  episodeNumber!: number;

  getDisplayInfo(): string {
    return `${this.title} — con ${this.hostName} (episodio ${this.episodeNumber})`;
  }
}

@Entity("audiobooks")
export class Audiobook extends Track {
  @Column({ length: 100 })
  narrator!: string;

  @Column({ type: "int" })
  chapterCount!: number;

  getDisplayInfo(): string {
    return `${this.title} — narrado por ${this.narrator} (${this.chapterCount} capítulos)`;
  }
}
