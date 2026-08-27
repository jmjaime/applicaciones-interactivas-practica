import "reflect-metadata";
import { DataSource } from "typeorm";
import { Track, Song, Podcast, Audiobook } from "./entities";

class TablePerHierarchyORM {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqljs",
      autoSave: true,
      location: "table-per-hierarchy-orm.sqlite",
      entities: [Track, Song, Podcast, Audiobook],
      synchronize: true,
      logging: false,
    });
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Table Per Hierarchy con TypeORM...");
    await this.dataSource.initialize();
    console.log("✅ Conexión establecida y esquema sincronizado");
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");

    const songRepository = this.dataSource.getRepository(Song);
    const podcastRepository = this.dataSource.getRepository(Podcast);
    const audiobookRepository = this.dataSource.getRepository(Audiobook);

    await songRepository.save([
      songRepository.create({
        title: "Bohemian Rhapsody",
        durationSeconds: 355,
        albumTitle: "A Night at the Opera",
        trackNumber: 11,
      }),
      songRepository.create({
        title: "Get Lucky",
        durationSeconds: 369,
        albumTitle: "Random Access Memories",
        trackNumber: 8,
      }),
    ]);

    await podcastRepository.save(
      podcastRepository.create({
        title: "Cómo se hace un framework",
        durationSeconds: 2700,
        hostName: "Julia Méndez",
        episodeNumber: 12,
      })
    );

    await audiobookRepository.save(
      audiobookRepository.create({
        title: "Cien Años de Soledad",
        durationSeconds: 61200,
        narrator: "Jorge Rivera",
        chapterCount: 20,
      })
    );

    console.log("✅ 4 tracks insertados correctamente");
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(70));
    console.log("🔍 DEMOSTRANDO CONSULTAS CON TABLE PER HIERARCHY - TYPEORM");
    console.log("=".repeat(70));

    const trackRepository = this.dataSource.getRepository(Track);
    const songRepository = this.dataSource.getRepository(Song);

    // 1. Todos los tracks (polimórfico)
    console.log("\n📋 1. TODOS LOS TRACKS:");
    const allTracks = await trackRepository.find({
      order: { durationSeconds: "DESC" },
    });
    allTracks.forEach((track, index) => {
      console.log(`   ${index + 1}. [${track.constructor.name}] ${track.getDisplayInfo()}`);
    });

    // 2. Solo canciones
    console.log("\n🎵 2. SOLO CANCIONES:");
    const songs = await songRepository.find();
    songs.forEach((song, index) => {
      console.log(`   ${index + 1}. ${song.getDisplayInfo()}`);
    });

    // 3. Estadísticas por tipo
    console.log("\n📊 3. ESTADÍSTICAS POR TIPO:");
    const stats = await trackRepository
      .createQueryBuilder("track")
      .select("track.type", "type")
      .addSelect("COUNT(*)", "count")
      .addSelect("AVG(track.durationSeconds)", "avgDuration")
      .groupBy("track.type")
      .orderBy("avgDuration", "DESC")
      .getRawMany();

    stats.forEach((stat) => {
      console.log(`   ${stat.type}: ${stat.count} tracks (Promedio: ${Math.round(stat.avgDuration)}s)`);
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(70));
    console.log("🏗️ ESTRUCTURA TPH - TYPEORM");
    console.log("=".repeat(70));
    console.log("📋 Decoradores utilizados:");
    console.log("   • @Entity() en clase base");
    console.log("   • @TableInheritance() - Discriminador automático");
    console.log("   • @ChildEntity() - Clases derivadas");
    console.log("");
    console.log("✅ VENTAJAS TYPEORM:");
    console.log("   • Mapeo automático de herencia");
    console.log("   • Polimorfismo transparente");
    console.log("   • Generación automática de esquema");
  }

  async close(): Promise<void> {
    await this.dataSource.destroy();
    console.log("🔌 Conexión cerrada");
  }
}

async function main() {
  const example = new TablePerHierarchyORM();

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

export { TablePerHierarchyORM };
