import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Artist } from "./entities/Artist";
import { Album } from "./entities/Album";

// Ejercicio 01 – Entidades básicas con TypeORM
// Instrucciones: implementar las funciones marcadas con TODO usando
// repositorios de TypeORM (`AppDataSource.getRepository(...)`).
// No modificar las entidades. Se pueden agregar helpers privados si hace falta.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Album).clear();
  await AppDataSource.getRepository(Artist).clear();
}
export async function createArtists(
  artists: Array<Partial<Artist>>
): Promise<Artist[]> {
  // TODO: crear entidades con create() y persistir con save()
  throw new Error("TODO: Implement createArtists");
}

export async function listArtistsByCountry(country: string): Promise<Artist[]> {
  // TODO: devolver los artistas de un país, ordenados por debutYear ASC
  throw new Error("TODO: Implement listArtistsByCountry");
}

export async function deactivateArtist(name: string): Promise<Artist | null> {
  // TODO: buscar por nombre y setear isActive en false; devolver null si no existe
  throw new Error("TODO: Implement deactivateArtist");
}

export async function createAlbums(
  albums: Array<Partial<Album>>
): Promise<Album[]> {
  // TODO: crear y guardar varios álbumes en una sola operación
  throw new Error("TODO: Implement createAlbums");
}

export async function listAlbumsByGenre(genre: string): Promise<Album[]> {
  // TODO: devolver álbumes de un género, ordenados por releaseYear DESC
  throw new Error("TODO: Implement listAlbumsByGenre");
}

export async function getTotalDurationMinutes(): Promise<number> {
  // TODO: sumar durationMinutes de todos los álbumes
  throw new Error("TODO: Implement getTotalDurationMinutes");
}
