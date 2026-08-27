import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  createSong,
  createPodcast,
  createAudiobook,
  listAllTracks,
  getTotalDurationBySong,
} from "./exercise";

describe("Ejercicio 7 - Herencia (Table Per Hierarchy)", () => {
  beforeAll(async () => {
    await initializeDatabase("ej07");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("crea cada subtipo con sus campos propios", async () => {
    const song = await createSong({
      title: "Persiana Americana",
      durationSeconds: 210,
      albumTitle: "Signos",
      trackNumber: 1,
    });
    expect(song.albumTitle).toBe("Signos");

    const podcast = await createPodcast({
      title: "Episodio 1",
      durationSeconds: 1800,
      hostName: "Ana",
      episodeNumber: 1,
    });
    expect(podcast.hostName).toBe("Ana");

    const audiobook = await createAudiobook({
      title: "Cien Años de Soledad",
      durationSeconds: 36000,
      narrator: "Jorge",
      chapterCount: 20,
    });
    expect(audiobook.chapterCount).toBe(20);
  });

  it("lista todos los tracks de cualquier subtipo (consulta polimórfica)", async () => {
    await createSong({
      title: "A",
      durationSeconds: 200,
      albumTitle: "X",
      trackNumber: 1,
    });
    await createPodcast({
      title: "B",
      durationSeconds: 1800,
      hostName: "Ana",
      episodeNumber: 1,
    });
    await createAudiobook({
      title: "C",
      durationSeconds: 36000,
      narrator: "Jorge",
      chapterCount: 5,
    });

    const all = await listAllTracks();
    expect(all.length).toBe(3);
  });

  it("suma la duración solo de los Song", async () => {
    await createSong({
      title: "A",
      durationSeconds: 200,
      albumTitle: "X",
      trackNumber: 1,
    });
    await createSong({
      title: "B",
      durationSeconds: 300,
      albumTitle: "X",
      trackNumber: 2,
    });
    await createPodcast({
      title: "C",
      durationSeconds: 1800,
      hostName: "Ana",
      episodeNumber: 1,
    });

    expect(await getTotalDurationBySong()).toBe(500);
  });
});
