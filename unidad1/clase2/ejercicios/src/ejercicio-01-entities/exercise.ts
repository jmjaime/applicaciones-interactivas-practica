import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Library } from "./entities/Library";
import { BookGenre } from "./entities/BookGenre";

// Ejercicio 01 – Entidades básicas con TypeORM
// Instrucciones: Implementá las funciones marcadas con TODO usando repositorios de TypeORM.
// No modifiques las entidades. Podés agregar helpers privados si lo necesitás.

export async function clearAll(): Promise<void> {
  const libraryRepo = AppDataSource.getRepository(Library);
  const genreRepo = AppDataSource.getRepository(BookGenre);
  await genreRepo.clear();
  await libraryRepo.clear();
}

export async function createLibraries(
  libraries: Array<Partial<Library>>
): Promise<Library[]> {
  const libraryRepo = AppDataSource.getRepository(Library);
  const librariesCreated: Library[] = [];

  libraries.forEach(async (li) => {
    const library = libraryRepo.create(li);
    librariesCreated.push(library);
  });

  return await libraryRepo.save(librariesCreated);
}

export async function listLibraries(): Promise<Library[]> {
  const libraryRepo = AppDataSource.getRepository(Library);
  return await libraryRepo.find();
}

export async function updateLibraryBudget(
  name: string,
  newBudget: number
): Promise<Library | null> {
  // TODO: buscar por nombre y actualizar budget y updatedAt
  throw new Error("TODO: Implement updateLibraryBudget");
}

export async function createGenres(
  genres: Array<Partial<BookGenre>>
): Promise<BookGenre[]> {
  // TODO: crear y guardar múltiples géneros en una sola operación
  throw new Error("TODO: Implement createGenres");
}

export async function listFeaturedGenres(): Promise<BookGenre[]> {
  // TODO: devolver géneros con isFeatured = true ordenados por averageRating DESC
  throw new Error("TODO: Implement listFeaturedGenres");
}

export async function getTotalLibrariesBudget(): Promise<number> {
  // TODO: calcular el presupuesto total sumando el campo budget de todas las bibliotecas
  throw new Error("TODO: Implement getTotalLibrariesBudget");
}
