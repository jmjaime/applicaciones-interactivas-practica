import { Database, preloadSqlJs } from "../../utils/sqlite";
import { paso } from "../../utils/demo";

// ============================================================================
// JOINED TABLE (TABLE PER SUBCLASS) - SQL PLANO
// Tabla base + tablas específicas con JOINs.
// Mismo dominio que la slide "Herencia · JOINED" de la clase: VEHICLE base +
// AUTO/MOTO como especializaciones, unidas por PK/FK compartida.
// ============================================================================

class JoinedTableSQL {
  private db: Database;

  constructor() {
    this.db = new Database("joined-table.sqlite");
  }

  createSchema(): void {
    // Tabla base con campos comunes
    const createVehiclesSQL = `
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        vehicle_type VARCHAR(20) NOT NULL
      )
    `;

    // Tabla para detalles específicos de Auto
    const createAutoDetailsSQL = `
      CREATE TABLE IF NOT EXISTS auto_details (
        vehicle_id INTEGER PRIMARY KEY,
        puertas INTEGER NOT NULL,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
      )
    `;

    // Tabla para detalles específicos de Moto
    const createMotoDetailsSQL = `
      CREATE TABLE IF NOT EXISTS moto_details (
        vehicle_id INTEGER PRIMARY KEY,
        cilindrada INTEGER NOT NULL,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
      )
    `;

    this.db.exec(createVehiclesSQL);
    this.db.exec(createAutoDetailsSQL);
    this.db.exec(createMotoDetailsSQL);

    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(vehicle_type)`
    );
  }

  insertSampleData(): void {
    const transaction = this.db.transaction(() => {
      const insertVehicle = this.db.prepare(
        `INSERT INTO vehicles (marca, modelo, vehicle_type) VALUES (?, ?, ?)`
      );
      const insertAutoDetails = this.db.prepare(
        `INSERT INTO auto_details (vehicle_id, puertas) VALUES (?, ?)`
      );
      const insertMotoDetails = this.db.prepare(
        `INSERT INTO moto_details (vehicle_id, cilindrada) VALUES (?, ?)`
      );

      const auto1 = insertVehicle.run("Ford", "Fiesta", "auto");
      insertAutoDetails.run(auto1.lastInsertRowid, 4);

      const auto2 = insertVehicle.run("VW", "Golf", "auto");
      insertAutoDetails.run(auto2.lastInsertRowid, 5);

      const moto1 = insertVehicle.run("Yamaha", "MT-07", "moto");
      insertMotoDetails.run(moto1.lastInsertRowid, 689);
    });

    transaction();
    console.log("3 vehículos insertados");
  }

  queryAllVehicles(): void {
    const allVehiclesSQL = `
      SELECT id, marca, modelo, vehicle_type
      FROM vehicles
      ORDER BY marca
    `;
    console.table(this.db.prepare(allVehiclesSQL).all());
  }

  queryCars(): void {
    const autosSQL = `
      SELECT v.marca, v.modelo, a.puertas
      FROM vehicles v
      INNER JOIN auto_details a ON v.id = a.vehicle_id
      WHERE v.vehicle_type = 'auto'
      ORDER BY v.marca
    `;
    console.table(this.db.prepare(autosSQL).all());
  }

  queryStats(): void {
    const statsSQL = `
      SELECT vehicle_type, COUNT(*) as count
      FROM vehicles
      GROUP BY vehicle_type
    `;
    console.table(this.db.prepare(statsSQL).all());
  }

  showStructure(): void {
    console.log("Estrategia utilizada:");
    console.log("   • Tabla base 'vehicles' con campos comunes");
    console.log("   • Tablas '*_details' con solo campos específicos");
    console.log("   • FOREIGN KEY (PK compartida) entre tablas");
    console.log("   • JOINs para obtener datos completos");
    console.log("");
    console.log("📋 Tablas generadas:");
    console.log("   ├── vehicles (id, marca, modelo, vehicle_type)");
    console.log("   ├── auto_details (vehicle_id*, puertas)");
    console.log("   └── moto_details (vehicle_id*, cilindrada)");
    console.log("   (* = Primary Key / Foreign Key compartida)");
    console.log("");
    console.log("✅ VENTAJAS:");
    console.log("   • Consultas polimórficas simples: SELECT * FROM vehicles");
    console.log("   • Sin duplicación de campos comunes");
    console.log("   • Integridad referencial automática");
    console.log("");
    console.log("⚠️ CONSIDERACIONES:");
    console.log("   • Necesita JOINs para datos completos");
    console.log("   • Rendimiento depende de índices");
  }

  close(): void {
    this.db.close();
  }
}

async function main() {
  console.log("=== JOINED TABLE (TABLE PER SUBCLASS) - SQL PLANO ===");
  await preloadSqlJs();
  const example = new JoinedTableSQL();

  try {
    await paso("Esquema: tabla base + tablas de detalle", () => {
      example.createSchema();
    });

    await paso("Insertar autos y motos", () => {
      example.insertSampleData();
    });

    await paso("Todos los vehículos (consulta polimórfica desde la tabla base)", () => {
      example.queryAllVehicles();
    });

    await paso("Autos (con JOIN a auto_details)", () => {
      example.queryCars();
    });

    await paso("Estadísticas (usando solo la tabla base)", () => {
      example.queryStats();
    });

    await paso("Estructura y trade-offs de JOINED", () => {
      example.showStructure();
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    example.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { JoinedTableSQL };
