import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Artist } from "./entities/Artist";
import { Track } from "./entities/Track";

// Ejercicio 8 – QueryBuilder (práctica en casa)
// La creación de datos ya está resuelta (createArtist/createTrack); el
// ejercicio es sobre las consultas con QueryBuilder, no sobre el setup.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Track).clear();
  await AppDataSource.getRepository(Artist).clear();
}

export async function createArtist(name: string): Promise<Artist> {
  const repo = AppDataSource.getRepository(Artist);
  return repo.save(repo.create({ name }));
}

export async function createTrack(
  artist: Artist,
  data: Partial<Track>
): Promise<Track> {
  const repo = AppDataSource.getRepository(Track);
  return repo.save(repo.create({ ...data, artist }));
}

export async function topArtistsByPlays(
  limit: number
): Promise<Array<{ name: string; totalPlays: string }>> {
  // TODO: usar AppDataSource.getRepository(Track).createQueryBuilder("t")
  // con innerJoin a artist, groupBy artist.id, un SUM(t.plays) as
  // totalPlays, orderBy DESC y limit — devolver [{ name, totalPlays }]
  throw new Error("TODO: Implement topArtistsByPlays");
}

export async function getPaginatedTracks(
  page: number,
  pageSize: number
): Promise<Track[]> {
  // TODO: usar QueryBuilder con orderBy("t.title", "ASC"), skip((page-1)
  // * pageSize) y take(pageSize)
  throw new Error("TODO: Implement getPaginatedTracks");
}

export async function getAverageDurationByArtist(
  artistName: string
): Promise<number> {
  // TODO: usar QueryBuilder con AVG(t.durationSeconds), filtrando por
  // artist.name = :name; 0 si el artista no tiene tracks
  throw new Error("TODO: Implement getAverageDurationByArtist");
}
