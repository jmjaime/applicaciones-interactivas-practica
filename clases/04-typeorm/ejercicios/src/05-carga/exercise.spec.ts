import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  createPlaylistWithTracks,
  getPlaylistDefault,
  getPlaylistWithTracks,
  createPlaylistEagerWithTracks,
  getPlaylistEager,
} from "./exercise";

describe("Ejercicio 5 - Carga por defecto vs. eager", () => {
  beforeAll(async () => {
    await initializeDatabase("ej05");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("por defecto, find() no trae la relación tracks poblada", async () => {
    await createPlaylistWithTracks("Viaje en auto", ["A", "B"]);

    const playlist = await getPlaylistDefault("Viaje en auto");
    expect(playlist).not.toBeNull();
    expect(playlist!.tracks).toBeUndefined();
  });

  it("pidiendo relations explícitamente, sí trae los tracks", async () => {
    await createPlaylistWithTracks("Viaje en auto", ["A", "B"]);

    const playlist = await getPlaylistWithTracks("Viaje en auto");
    expect(playlist!.tracks?.length).toBe(2);
  });

  it("con eager: true, find() trae los tracks sin pedirlos", async () => {
    await createPlaylistEagerWithTracks("Fiesta", ["C", "D", "E"]);

    const playlist = await getPlaylistEager("Fiesta");
    expect(playlist!.tracks?.length).toBe(3);
  });
});
