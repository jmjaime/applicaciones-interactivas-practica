import "reflect-metadata";
import { AppDataSource } from "../../common/data-source";
import { Track, Song, Podcast, Audiobook } from "./entities";

// Ejercicio 11 – Herencia (Table Per Class) — Song / Podcast / Audiobook
// Instrucciones: implementar las funciones marcadas con TODO. A
// diferencia del ejercicio 7 (Table Per Hierarchy), acá cada subtipo
// vive en su propia tabla — no existe una consulta polimórfica
// automática sobre "todos los tracks": hay que combinar manualmente los
// resultados de cada repositorio.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Song).clear();
  await AppDataSource.getRepository(Podcast).clear();
  await AppDataSource.getRepository(Audiobook).clear();
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
  // TODO: no hay consulta polimórfica automática en TPC — traer los tres
  // repositorios por separado (Song, Podcast, Audiobook) y combinar los
  // resultados en un solo array
  throw new Error("TODO: Implement listAllTracks");
}

export async function getTotalDurationBySong(): Promise<number> {
  // TODO: sumar durationSeconds SOLO de los Song (no Podcast ni
  // Audiobook), usando getRepository(Song)
  throw new Error("TODO: Implement getTotalDurationBySong");
}
