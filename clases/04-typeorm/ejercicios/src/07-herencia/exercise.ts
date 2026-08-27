import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Track, Song, Podcast, Audiobook } from "./entities";

// Ejercicio 7 – Herencia (Table Per Hierarchy) — Song / Podcast / Audiobook
// Instrucciones: implementar las funciones marcadas con TODO. Guardar
// cada subtipo con su propio repositorio (getRepository(Song), etc.) —
// TypeORM se encarga de escribir la columna `type` correcta.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Track).clear();
}

export async function createSong(data: Partial<Song>): Promise<Song> {
  // TODO: crear y guardar un Song con getRepository(Song)
  throw new Error("TODO: Implement createSong");
}

export async function createPodcast(data: Partial<Podcast>): Promise<Podcast> {
  // TODO: crear y guardar un Podcast con getRepository(Podcast)
  throw new Error("TODO: Implement createPodcast");
}

export async function createAudiobook(
  data: Partial<Audiobook>
): Promise<Audiobook> {
  // TODO: crear y guardar un Audiobook con getRepository(Audiobook)
  throw new Error("TODO: Implement createAudiobook");
}

export async function listAllTracks(): Promise<Track[]> {
  // TODO: devolver TODOS los tracks (de cualquier subtipo) usando
  // getRepository(Track) — es una consulta polimórfica: TypeORM arma
  // cada instancia con la clase correcta según la columna `type`
  throw new Error("TODO: Implement listAllTracks");
}

export async function getTotalDurationBySong(): Promise<number> {
  // TODO: sumar durationSeconds SOLO de los Song (no Podcast ni
  // Audiobook), usando getRepository(Song)
  throw new Error("TODO: Implement getTotalDurationBySong");
}
