import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../../common/data-source";
import {
  clearAll,
  createPlaylist,
  addTrackToPlaylist,
  getPlaylistWithTracks,
  getPlaylistsContainingTrack,
  getPlaylistDurationSeconds,
} from "./exercise";

describe("Ejercicio 4.3 - Relación N:M (Playlist ↔ Track, integrador)", () => {
  beforeAll(async () => {
    await initializeDatabase("ej04c");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("crea una playlist vacía para un usuario", async () => {
    const playlist = await createPlaylist("juanam", "Viaje en auto");
    expect(playlist.name).toBe("Viaje en auto");
  });

  it("agrega tracks a una playlist y los lista", async () => {
    await createPlaylist("juanam", "Viaje en auto");
    await addTrackToPlaylist("Viaje en auto", {
      title: "Persiana Americana",
      durationSeconds: 210,
    });
    await addTrackToPlaylist("Viaje en auto", {
      title: "De Música Ligera",
      durationSeconds: 240,
    });

    const playlist = await getPlaylistWithTracks("Viaje en auto");
    expect(playlist?.tracks?.length).toBe(2);
  });

  it("encuentra las playlists que contienen un track dado", async () => {
    await createPlaylist("juanam", "Viaje en auto");
    await createPlaylist("pedror", "Fiesta");
    await addTrackToPlaylist("Viaje en auto", {
      title: "De Música Ligera",
      durationSeconds: 240,
    });
    await addTrackToPlaylist("Fiesta", {
      title: "De Música Ligera",
      durationSeconds: 240,
    });

    const playlists = await getPlaylistsContainingTrack("De Música Ligera");
    expect(playlists.length).toBe(2);
  });

  it("suma la duración total de una playlist", async () => {
    await createPlaylist("juanam", "Viaje en auto");
    await addTrackToPlaylist("Viaje en auto", {
      title: "A",
      durationSeconds: 200,
    });
    await addTrackToPlaylist("Viaje en auto", {
      title: "B",
      durationSeconds: 300,
    });

    expect(await getPlaylistDurationSeconds("Viaje en auto")).toBe(500);
    expect(await getPlaylistDurationSeconds("No Existe")).toBe(0);
  });
});
