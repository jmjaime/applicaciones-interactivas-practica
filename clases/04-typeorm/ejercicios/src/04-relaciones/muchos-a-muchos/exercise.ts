import "reflect-metadata";
import { AppDataSource } from "../../common/data-source";
import { User } from "./entities/User";
import { Track } from "./entities/Track";
import { Playlist } from "./entities/Playlist";

// Ejercicio 4.3 – Relación N:M — Playlist ↔ Track (integrador)
// Combina lo visto en 4.1/4.2 (crear entidades relacionadas) con una
// relación N:M vía @ManyToMany + @JoinTable. Pensado para resolver en
// parejas.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Playlist).clear();
  await AppDataSource.getRepository(Track).clear();
  await AppDataSource.getRepository(User).clear();
}

export async function createPlaylist(
  ownerUsername: string,
  playlistName: string
): Promise<Playlist> {
  // TODO: crear el User dueño y la Playlist vacía (tracks: []), y
  // devolver la Playlist creada
  throw new Error("TODO: Implement createPlaylist");
}

export async function addTrackToPlaylist(
  playlistName: string,
  trackData: Partial<Track>
): Promise<Track> {
  // TODO: crear el Track y agregarlo a la lista `tracks` de la playlist
  // (buscada por nombre), guardando la playlist actualizada. Devolver el
  // Track creado.
  throw new Error("TODO: Implement addTrackToPlaylist");
}

export async function getPlaylistWithTracks(
  playlistName: string
): Promise<Playlist | null> {
  // TODO: buscar la playlist por nombre con sus tracks cargados
  // (relations: ["tracks"]); null si no existe
  throw new Error("TODO: Implement getPlaylistWithTracks");
}

export async function getPlaylistsContainingTrack(
  trackTitle: string
): Promise<Playlist[]> {
  // TODO: la consulta "del otro lado" — qué playlists contienen un track
  // dado (buscado por título)
  throw new Error("TODO: Implement getPlaylistsContainingTrack");
}

export async function getPlaylistDurationSeconds(
  playlistName: string
): Promise<number> {
  // TODO: sumar durationSeconds de todos los tracks de una playlist;
  // 0 si no existe o no tiene tracks
  throw new Error("TODO: Implement getPlaylistDurationSeconds");
}
