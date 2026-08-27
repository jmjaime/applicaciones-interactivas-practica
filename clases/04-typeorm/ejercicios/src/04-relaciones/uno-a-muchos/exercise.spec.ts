import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../../common/data-source";
import {
  clearAll,
  createArtistWithTracks,
  listArtistTracks,
  getTotalDurationByArtist,
} from "./exercise";

describe("Ejercicio 4.2 - Relación 1:N (Artist → Track)", () => {
  beforeAll(async () => {
    await initializeDatabase("ej04b");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("crea un artista con sus tracks", async () => {
    const artist = await createArtistWithTracks(
      { name: "Soda Stereo", country: "Argentina" },
      [
        { title: "Persiana Americana", durationSeconds: 210 },
        { title: "En la Ciudad de la Furia", durationSeconds: 300 },
      ]
    );
    expect(artist.tracks?.length).toBe(2);
  });

  it("lista los tracks de un artista por nombre", async () => {
    await createArtistWithTracks({ name: "Soda Stereo", country: "Argentina" }, [
      { title: "Persiana Americana", durationSeconds: 210 },
    ]);

    const tracks = await listArtistTracks("Soda Stereo");
    expect(tracks.length).toBe(1);
    expect(tracks[0].title).toBe("Persiana Americana");
  });

  it("suma la duración total de los tracks de un artista", async () => {
    await createArtistWithTracks({ name: "Soda Stereo", country: "Argentina" }, [
      { title: "A", durationSeconds: 200 },
      { title: "B", durationSeconds: 300 },
    ]);

    expect(await getTotalDurationByArtist("Soda Stereo")).toBe(500);
    expect(await getTotalDurationByArtist("No Existe")).toBe(0);
  });
});
