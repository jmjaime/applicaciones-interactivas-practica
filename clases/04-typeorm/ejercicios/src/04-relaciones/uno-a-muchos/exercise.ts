import "reflect-metadata";
import { AppDataSource } from "../../common/data-source";
import { Artist } from "./entities/Artist";
import { Track } from "./entities/Track";

// Ejercicio 4.2 – Relación 1:N — Artist → Track
// Instrucciones: implementar las funciones marcadas con TODO usando
// repositorios de TypeORM.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Track).clear();
  await AppDataSource.getRepository(Artist).clear();
}

export async function createArtistWithTracks(
  artistData: Partial<Artist>,
  tracksData: Array<Omit<Partial<Track>, "artist">>
): Promise<Artist> {
  // TODO: crear y guardar el Artist, después crear y guardar cada Track
  // con `track.artist = artist`. Devolver el Artist con `tracks` cargado.
  throw new Error("TODO: Implement createArtistWithTracks");
}

export async function listArtistTracks(artistName: string): Promise<Track[]> {
  // TODO: devolver los tracks de un artista (buscar por nombre), sin
  // ordenar en particular
  throw new Error("TODO: Implement listArtistTracks");
}

export async function getTotalDurationByArtist(
  artistName: string
): Promise<number> {
  // TODO: sumar durationSeconds de todos los tracks de un artista
  // (buscar por nombre); 0 si el artista no existe o no tiene tracks
  throw new Error("TODO: Implement getTotalDurationByArtist");
}
