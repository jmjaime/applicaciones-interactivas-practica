import "reflect-metadata";
import { DataSource } from "typeorm";
import { Track, Song, Podcast, Audiobook } from "./entities";

// ============================================================================
// TABLE PER CLASS (TPC) - TYPEORM EXAMPLE
// Herencia verdadera con cada clase concreta extendiendo Track
// ============================================================================

class TablePerClassORM {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqljs",
      autoSave: true,
      location: "table-per-class-orm.sqlite",
      entities: [Song, Podcast, Audiobook],
      synchronize: true,
      logging: false,
    });
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Table Per Class con TypeORM...");
    await this.dataSource.initialize();
    console.log("✅ Conexión establecida y esquema sincronizado");
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");

    // Song 1
    const song = new Song();
    song.title = "Bohemian Rhapsody";
    song.durationSeconds = 355;
    song.albumTitle = "A Night at the Opera";
    song.trackNumber = 11;

    // Song 2
    const song2 = new Song();
    song2.title = "Get Lucky";
    song2.durationSeconds = 369;
    song2.albumTitle = "Random Access Memories";
    song2.trackNumber = 8;

    // Podcast
    const podcast = new Podcast();
    podcast.title = "Cómo se hace un framework";
    podcast.durationSeconds = 2700;
    podcast.hostName = "Julia Méndez";
    podcast.episodeNumber = 12;

    // Audiobook
    const audiobook = new Audiobook();
    audiobook.title = "Cien Años de Soledad";
    audiobook.durationSeconds = 61200;
    audiobook.narrator = "Jorge Rivera";
    audiobook.chapterCount = 20;

    // Guardar directamente en cada repositorio
    await this.dataSource.getRepository(Song).save([song, song2]);
    await this.dataSource.getRepository(Podcast).save(podcast);
    await this.dataSource.getRepository(Audiobook).save(audiobook);

    console.log(`✅ 4 tracks insertados correctamente`);
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(70));
    console.log("🔍 CONSULTAS TABLE PER CLASS VERDADERO - TYPEORM");
    console.log("=".repeat(70));

    // 1. Consulta polimórfica manual (TPC verdadero requiere esto)
    console.log(
      "\n📋 1. TODOS LOS TRACKS (consulta polimórfica manual en TPC):"
    );
    const songs = await this.dataSource.getRepository(Song).find();
    const podcasts = await this.dataSource.getRepository(Podcast).find();
    const audiobooks = await this.dataSource.getRepository(Audiobook).find();

    const allTracks: Track[] = [...songs, ...podcasts, ...audiobooks];
    allTracks.sort((a, b) => b.durationSeconds - a.durationSeconds);

    allTracks.forEach((track, index) => {
      console.log(`   ${index + 1}. ${track.getDisplayInfo()} (${track.durationSeconds}s)`);
    });

    // 2. Solo canciones (acceso directo a tabla específica)
    console.log("\n🎵 2. CANCIONES (acceso directo a tabla específica):");
    const orderedSongs = await this.dataSource.getRepository(Song).find({
      order: { trackNumber: "ASC" },
    });
    orderedSongs.forEach((s, index) => {
      console.log(`   ${index + 1}. ${s.getDisplayInfo()}`);
      console.log(`      ⏱️ Duración: ${s.durationSeconds}s`);
    });

    // 3. Solo podcasts (acceso directo a tabla específica)
    console.log("\n🎙️ 3. PODCASTS (acceso directo a tabla específica):");
    const orderedPodcasts = await this.dataSource.getRepository(Podcast).find({
      order: { episodeNumber: "DESC" },
    });
    orderedPodcasts.forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.getDisplayInfo()}`);
      console.log(`      ⏱️ Duración: ${p.durationSeconds}s`);
    });

    // 4. Búsqueda polimórfica con criterios
    console.log("\n⏱️ 4. TRACKS DE MÁS DE 1 HORA (búsqueda manual):");
    const longTracks = allTracks.filter((t) => t.durationSeconds > 3600);
    longTracks.forEach((track, index) => {
      console.log(`   ${index + 1}. ${track.getDisplayInfo()} (${track.durationSeconds}s)`);
    });

    // 5. Estadísticas calculadas manualmente
    console.log("\n📊 5. ESTADÍSTICAS (calculadas manualmente):");
    const stats = [
      {
        type: "Song",
        count: songs.length,
        avgDuration:
          songs.reduce((sum, t) => sum + t.durationSeconds, 0) / songs.length,
      },
      {
        type: "Podcast",
        count: podcasts.length,
        avgDuration:
          podcasts.reduce((sum, t) => sum + t.durationSeconds, 0) /
          podcasts.length,
      },
      {
        type: "Audiobook",
        count: audiobooks.length,
        avgDuration:
          audiobooks.reduce((sum, t) => sum + t.durationSeconds, 0) /
          audiobooks.length,
      },
    ].sort((a, b) => b.avgDuration - a.avgDuration);

    stats.forEach((stat) => {
      console.log(
        `   ${stat.type}: ${stat.count} tracks (Promedio: ${Math.round(stat.avgDuration)}s)`
      );
    });

    // 6. Demostración de herencia (polimorfismo en código)
    console.log("\n🧬 6. DEMOSTRACIÓN DE HERENCIA (polimorfismo):");
    const trackReferences: Track[] = [songs[0], podcasts[0], audiobooks[0]];
    trackReferences.forEach((track, index) => {
      console.log(`   ${index + 1}. ${track.getDisplayInfo()}`);
      console.log(`      Tipo: ${track.constructor.name}`);
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(70));
    console.log("🏗️ ESTRUCTURA TABLE PER CLASS VERDADERO - TYPEORM");
    console.log("=".repeat(70));
    console.log("📋 Estrategia utilizada:");
    console.log("   • abstract class Track - NO se mapea a tabla");
    console.log("   • class Song extends Track - herencia verdadera");
    console.log(
      "   • @Entity('table_name') - cada clase concreta tiene su tabla"
    );
    console.log(
      "   • Cada tabla tiene TODOS los campos (heredados + específicos)"
    );
    console.log("");
    console.log("📋 Tablas generadas:");
    console.log(
      "   ├── songs (id, title, durationSeconds + albumTitle, trackNumber)"
    );
    console.log(
      "   ├── podcasts (id, title, durationSeconds + hostName, episodeNumber)"
    );
    console.log(
      "   └── audiobooks (id, title, durationSeconds + narrator, chapterCount)"
    );
    console.log("");
    console.log("✅ CARACTERÍSTICAS TPC VERDADERO:");
    console.log("   • ✅ Herencia real en código: extends Track");
    console.log("   • ✅ Sin tabla base: Track es abstract");
    console.log("   • ✅ Cada tabla independiente y completa");
    console.log("   • ✅ Sin relaciones entre tablas");
    console.log("   • ✅ Polimorfismo a nivel de código");
    console.log("");
    console.log("⚠️ LIMITACIONES TPC:");
    console.log("   • ❌ No hay consultas polimórficas automáticas");
    console.log("   • ❌ Necesita consultas manuales a cada repositorio");
    console.log("   • ❌ Duplicación de estructura en cada tabla");
    console.log("   • ❌ Estadísticas requieren lógica manual");
    console.log("");
    console.log("🎯 ESTO ES TABLE PER CLASS PURO:");
    console.log("   • Una tabla por cada clase concreta");
    console.log("   • Herencia solo en el código, no en BD");
    console.log("   • Máximo rendimiento para consultas específicas");
  }

  async close(): Promise<void> {
    await this.dataSource.destroy();
    console.log("🔌 Conexión cerrada");
  }
}

async function main() {
  const example = new TablePerClassORM();

  try {
    await example.initialize();
    await example.insertSampleData();
    await example.demonstrateQueries();
    example.showStructure();
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await example.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { TablePerClassORM };
