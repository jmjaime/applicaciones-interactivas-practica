import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  createArtists,
  listArtistsByCountry,
  deactivateArtist,
  createAlbums,
  listAlbumsByGenre,
  getTotalDurationMinutes,
} from "./exercise";

describe("Ejercicio 01 - Entidades básicas", () => {
  beforeAll(async () => {
    await initializeDatabase("ej01");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("crea artistas y los lista por país ordenados por debutYear", async () => {
    await createArtists([
      { name: "Soda Stereo", country: "Argentina", debutYear: 1982 },
      { name: "Illya Kuryaki", country: "Argentina", debutYear: 1989 },
      { name: "Café Tacvba", country: "México", debutYear: 1989 },
    ]);

    const argentinos = await listArtistsByCountry("Argentina");
    expect(argentinos.length).toBe(2);
    expect(argentinos[0].name).toBe("Soda Stereo");
    expect(argentinos[1].name).toBe("Illya Kuryaki");
  });

  it("desactiva un artista existente y devuelve null si no existe", async () => {
    await createArtists([
      { name: "Soda Stereo", country: "Argentina", debutYear: 1982 },
    ]);

    const updated = await deactivateArtist("Soda Stereo");
    expect(updated).not.toBeNull();
    expect(updated!.isActive).toBe(false);

    const missing = await deactivateArtist("No Existe");
    expect(missing).toBeNull();
  });

  it("crea álbumes y los lista por género ordenados por releaseYear DESC", async () => {
    await createAlbums([
      { title: "Signos", releaseYear: 1986, genre: "rock", durationMinutes: 40 },
      { title: "Dynamo", releaseYear: 1992, genre: "rock", durationMinutes: 45 },
      { title: "Revés/Yo Soy", releaseYear: 1987, genre: "pop", durationMinutes: 38 },
    ]);

    const rock = await listAlbumsByGenre("rock");
    expect(rock.length).toBe(2);
    expect(rock[0].title).toBe("Dynamo");
    expect(rock[1].title).toBe("Signos");
  });

  it("calcula la duración total de todos los álbumes", async () => {
    await createAlbums([
      { title: "A", releaseYear: 2000, genre: "pop", durationMinutes: 30 },
      { title: "B", releaseYear: 2001, genre: "pop", durationMinutes: 50 },
    ]);

    expect(await getTotalDurationMinutes()).toBe(80);
  });
});
