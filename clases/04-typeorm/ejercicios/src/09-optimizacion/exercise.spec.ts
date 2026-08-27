import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  seedUserWithPlaylists,
  getUsersWithPlaylistsNaive,
  getUsersWithPlaylistsOptimized,
} from "./exercise";

describe("Ejercicio 9 - Optimización (evitar N+1)", () => {
  beforeAll(async () => {
    await initializeDatabase("ej09");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("la versión naive ya funciona (referencia)", async () => {
    await seedUserWithPlaylists("juanam", ["Viaje", "Fiesta"]);
    await seedUserWithPlaylists("pedror", ["Gym"]);

    const result = await getUsersWithPlaylistsNaive();
    expect(result).toEqual(
      expect.arrayContaining([
        { username: "juanam", playlistCount: 2 },
        { username: "pedror", playlistCount: 1 },
      ])
    );
  });

  it("la versión optimizada da el mismo resultado en una sola consulta", async () => {
    await seedUserWithPlaylists("juanam", ["Viaje", "Fiesta"]);
    await seedUserWithPlaylists("pedror", ["Gym"]);

    const result = await getUsersWithPlaylistsOptimized();
    expect(result).toEqual(
      expect.arrayContaining([
        { username: "juanam", playlistCount: 2 },
        { username: "pedror", playlistCount: 1 },
      ])
    );
  });
});
