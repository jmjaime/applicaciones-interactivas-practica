import "reflect-metadata";
import { DataSource } from "typeorm";

export let AppDataSource: DataSource;

// Cada scope registra solo las entidades del ejercicio correspondiente —
// evita colisiones entre entidades con el mismo nombre en distintas
// carpetas (p.ej. hay un `User` en 02-restricciones, otro en
// 03-validacion, otro en 04-relaciones/uno-a-uno, etc., cada uno con sus
// propios decoradores).
function resolveEntities(scope?: string): any[] {
  const s = (scope || process.env.EJ_SCOPE || "ej01")
    .split(",")
    .map((x) => x.trim());

  const entities: any[] = [];

  if (s.includes("ej01")) {
    const { Artist } = require("../01-entidades/entities/Artist");
    const { Album } = require("../01-entidades/entities/Album");
    entities.push(Artist, Album);
  }

  if (s.includes("ej02")) {
    const { User } = require("../02-restricciones/entities/User");
    entities.push(User);
  }

  if (s.includes("ej03")) {
    const { User } = require("../03-validacion/entities/User");
    entities.push(User);
  }

  if (s.includes("ej04a")) {
    const { User } = require("../04-relaciones/uno-a-uno/entities/User");
    const {
      Subscription,
    } = require("../04-relaciones/uno-a-uno/entities/Subscription");
    entities.push(User, Subscription);
  }

  if (s.includes("ej04b")) {
    const { Artist } = require("../04-relaciones/uno-a-muchos/entities/Artist");
    const { Track } = require("../04-relaciones/uno-a-muchos/entities/Track");
    entities.push(Artist, Track);
  }

  if (s.includes("ej04c")) {
    const { User } = require("../04-relaciones/muchos-a-muchos/entities/User");
    const {
      Track,
    } = require("../04-relaciones/muchos-a-muchos/entities/Track");
    const {
      Playlist,
    } = require("../04-relaciones/muchos-a-muchos/entities/Playlist");
    entities.push(User, Track, Playlist);
  }

  if (s.includes("ej05")) {
    const { Playlist } = require("../05-carga/entities/Playlist");
    const { Track } = require("../05-carga/entities/Track");
    const { PlaylistEager } = require("../05-carga/entities/PlaylistEager");
    const { TrackEager } = require("../05-carga/entities/TrackEager");
    entities.push(Playlist, Track, PlaylistEager, TrackEager);
  }

  if (s.includes("ej07")) {
    const { Track, Song, Podcast, Audiobook } = require("../07-herencia/entities");
    entities.push(Track, Song, Podcast, Audiobook);
  }

  if (s.includes("ej08")) {
    const { Artist } = require("../08-query-builder/entities/Artist");
    const { Track } = require("../08-query-builder/entities/Track");
    entities.push(Artist, Track);
  }

  if (s.includes("ej09")) {
    const { User } = require("../09-optimizacion/entities/User");
    const { Playlist } = require("../09-optimizacion/entities/Playlist");
    const { Track } = require("../09-optimizacion/entities/Track");
    entities.push(User, Playlist, Track);
  }

  // ej10 (migraciones) no registra entidades — trabaja con SQL crudo vía
  // QueryRunner, sin mapeo de entidades.

  if (s.includes("ej07b")) {
    // Track no lleva @Entity en Table Per Class — es una clase base
    // abstracta sin tabla propia, no se registra.
    const {
      Song,
      Podcast,
      Audiobook,
    } = require("../07-herencia/table-per-class/entities");
    entities.push(Song, Podcast, Audiobook);
  }

  if (s.includes("ej11")) {
    const { User } = require("../11-transacciones/entities/User");
    const {
      Subscription,
    } = require("../11-transacciones/entities/Subscription");
    entities.push(User, Subscription);
  }

  return entities;
}

export const initializeDatabase = async (scope?: string) => {
  try {
    AppDataSource = new DataSource({
      type: "sqljs",
      autoSave: true,
      location: `ejercicios-${scope || process.env.EJ_SCOPE || "ej01"}.sqlite`,
      synchronize: true,
      logging: false,
      entities: resolveEntities(scope),
    });
    await AppDataSource.initialize();
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    throw error;
  }
};

export const closeDatabase = async () => {
  try {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  } catch (error) {
    console.error("❌ Error al cerrar la conexión:", error);
  }
};
