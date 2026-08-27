import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  createArtist,
  createTrack,
  topArtistsByPlays,
  getPaginatedTracks,
  getAverageDurationByArtist,
} from "./exercise";

describe("Ejercicio 8 - QueryBuilder", () => {
  beforeAll(async () => {
    await initializeDatabase("ej08");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("devuelve los artistas con más reproducciones totales", async () => {
    const soda = await createArtist("Soda Stereo");
    const cafe = await createArtist("Café Tacvba");
    await createTrack(soda, { title: "A", durationSeconds: 200, plays: 100 });
    await createTrack(soda, { title: "B", durationSeconds: 200, plays: 50 });
    await createTrack(cafe, { title: "C", durationSeconds: 200, plays: 30 });

    const top = await topArtistsByPlays(2);
    expect(top[0].name).toBe("Soda Stereo");
    expect(Number(top[0].totalPlays)).toBe(150);
  });

  it("pagina los tracks ordenados por título", async () => {
    const artist = await createArtist("Soda Stereo");
    await createTrack(artist, { title: "C", durationSeconds: 200, plays: 0 });
    await createTrack(artist, { title: "A", durationSeconds: 200, plays: 0 });
    await createTrack(artist, { title: "B", durationSeconds: 200, plays: 0 });

    const page1 = await getPaginatedTracks(1, 2);
    expect(page1.map((t) => t.title)).toEqual(["A", "B"]);

    const page2 = await getPaginatedTracks(2, 2);
    expect(page2.map((t) => t.title)).toEqual(["C"]);
  });

  it("calcula la duración promedio de los tracks de un artista", async () => {
    const artist = await createArtist("Soda Stereo");
    await createTrack(artist, { title: "A", durationSeconds: 100, plays: 0 });
    await createTrack(artist, { title: "B", durationSeconds: 300, plays: 0 });

    expect(await getAverageDurationByArtist("Soda Stereo")).toBe(200);
    expect(await getAverageDurationByArtist("No Existe")).toBe(0);
  });
});
