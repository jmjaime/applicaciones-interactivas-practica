import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Playlist } from "./entities/Playlist";
import { Track } from "./entities/Track";
import { PlaylistEager } from "./entities/PlaylistEager";
import { TrackEager } from "./entities/TrackEager";

// Ejercicio 5 – Carga por defecto vs. eager (práctica en casa)
// Instrucciones: implementar las funciones marcadas con TODO. El objetivo
// es comparar qué trae find() en cada entidad, no solo hacerlo andar.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Track).clear();
  await AppDataSource.getRepository(Playlist).clear();
  await AppDataSource.getRepository(TrackEager).clear();
  await AppDataSource.getRepository(PlaylistEager).clear();
}

export async function createPlaylistWithTracks(
  name: string,
  titles: string[]
): Promise<Playlist> {
  // TODO: crear la Playlist, después cada Track con `track.playlist =
  // playlist`. Devolver la Playlist (no hace falta que tenga `tracks`
  // cargado en el objeto devuelto).
  throw new Error("TODO: Implement createPlaylistWithTracks");
}

export async function getPlaylistDefault(
  name: string
): Promise<Playlist | null> {
  // TODO: buscar la playlist por nombre SIN pedir relations — el objeto
  // devuelto no va a traer `tracks` poblado
  throw new Error("TODO: Implement getPlaylistDefault");
}

export async function getPlaylistWithTracks(
  name: string
): Promise<Playlist | null> {
  // TODO: buscar la misma playlist, esta vez pidiendo explícitamente
  // relations: ["tracks"]
  throw new Error("TODO: Implement getPlaylistWithTracks");
}

export async function createPlaylistEagerWithTracks(
  name: string,
  titles: string[]
): Promise<PlaylistEager> {
  // TODO: mismo patrón que createPlaylistWithTracks(), pero con las
  // entidades *Eager
  throw new Error("TODO: Implement createPlaylistEagerWithTracks");
}

export async function getPlaylistEager(
  name: string
): Promise<PlaylistEager | null> {
  // TODO: buscar la playlist eager por nombre SIN pedir relations — a
  // diferencia de getPlaylistDefault(), acá `tracks` SÍ va a venir
  // poblado por el `eager: true` de la entidad
  throw new Error("TODO: Implement getPlaylistEager");
}
