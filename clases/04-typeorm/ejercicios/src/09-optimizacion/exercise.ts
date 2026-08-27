import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { User } from "./entities/User";
import { Playlist } from "./entities/Playlist";
import { Track } from "./entities/Track";

// Ejercicio 9 – Optimización: evitar N+1 (práctica en casa)
// getUsersWithPlaylistsNaive() ya está resuelta — hace 1 query para
// traer los usuarios y después 1 query MÁS por cada usuario para traer
// sus playlists (el problema N+1). El ejercicio es escribir la versión
// optimizada, en una sola consulta.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Track).clear();
  await AppDataSource.getRepository(Playlist).clear();
  await AppDataSource.getRepository(User).clear();
}

export async function seedUserWithPlaylists(
  username: string,
  playlistNames: string[]
): Promise<User> {
  const userRepo = AppDataSource.getRepository(User);
  const playlistRepo = AppDataSource.getRepository(Playlist);
  const user = await userRepo.save(userRepo.create({ username }));
  for (const name of playlistNames) {
    await playlistRepo.save(playlistRepo.create({ name, owner: user }));
  }
  return user;
}

export async function getUsersWithPlaylistsNaive(): Promise<
  Array<{ username: string; playlistCount: number }>
> {
  const userRepo = AppDataSource.getRepository(User);
  const playlistRepo = AppDataSource.getRepository(Playlist);
  const users = await userRepo.find(); // 1 query
  const result = [];
  for (const user of users) {
    // 1 query MÁS por cada usuario — acá está el N+1.
    const playlists = await playlistRepo.find({ where: { owner: { id: user.id } } });
    result.push({ username: user.username, playlistCount: playlists.length });
  }
  return result;
}

export async function getUsersWithPlaylistsOptimized(): Promise<
  Array<{ username: string; playlistCount: number }>
> {
  // TODO: mismo resultado que getUsersWithPlaylistsNaive(), pero en UNA
  // sola consulta. Usar `relations: ["playlists"]` en el find() (o un
  // QueryBuilder con leftJoinAndSelect) y mapear playlistCount a partir
  // de `user.playlists!.length`.
  throw new Error("TODO: Implement getUsersWithPlaylistsOptimized");
}
