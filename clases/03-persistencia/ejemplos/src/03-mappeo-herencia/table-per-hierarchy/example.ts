import Database from "better-sqlite3";
import { paso } from "../../utils/demo";

// Table Per Hierarchy - Una sola tabla con discriminador
// Mismo dominio que la slide "Herencia · TPH" de la clase: Vehicle con
// discriminador 'type' (auto/moto), columnas específicas NULL según el tipo.
class TablePerHierarchySQL {
  private db: Database.Database;

  constructor() {
    this.db = new Database("table-per-hierarchy.sqlite");
  }

  createSchema(): void {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(20) NOT NULL,  -- Discriminador: 'auto', 'moto'

        -- Campos comunes
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,

        -- Campos específicos (pueden ser NULL según el tipo)
        puertas INTEGER,       -- Solo auto
        cilindrada INTEGER,    -- Solo moto

        CHECK (type IN ('auto', 'moto'))
      )
    `;

    this.db.exec(createTableSQL);
    this.db.exec(`CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(type)`);
  }

  insertSampleData(): void {
    const vehicles = [
      // Auto
      ["auto", "Ford", "Fiesta", 4, null],
      // Moto
      ["moto", "Yamaha", "MT-07", null, 689],
      // Auto
      ["auto", "VW", "Golf", 5, null],
    ];

    const insertSQL = `
      INSERT INTO vehicles (type, marca, modelo, puertas, cilindrada)
      VALUES (?, ?, ?, ?, ?)
    `;

    const stmt = this.db.prepare(insertSQL);
    const transaction = this.db.transaction(() => {
      vehicles.forEach((v) => stmt.run(...v));
    });

    transaction();
    console.log(`${vehicles.length} vehículos insertados`);
  }

  queryAllVehicles(): void {
    const allVehicles = this.db
      .prepare(`SELECT id, type, marca, modelo, puertas, cilindrada FROM vehicles ORDER BY id`)
      .all();
    console.table(allVehicles);
  }

  queryCars(): void {
    const cars = this.db
      .prepare(`SELECT marca, modelo, puertas FROM vehicles WHERE type = 'auto'`)
      .all();
    console.table(cars);
  }

  queryStats(): void {
    const stats = this.db
      .prepare(`SELECT type, COUNT(*) as count FROM vehicles GROUP BY type`)
      .all();
    console.table(stats);
  }

  showStructure(): void {
    console.log("Una sola tabla 'vehicles':");
    console.log("   • Columna 'type' como discriminador");
    console.log("   • Campos comunes: id, marca, modelo");
    console.log("   • Campos específicos: puertas (auto) / cilindrada (moto), NULL según el tipo");
    console.log("");
    console.log("✅ VENTAJAS:");
    console.log("   • Consultas rápidas (sin JOINs)");
    console.log("   • Polimorfismo simple");
    console.log("   • Una sola tabla para mantener");
    console.log("");
    console.log("⚠️ DESVENTAJAS:");
    console.log("   • Muchos campos NULL");
    console.log("   • Tabla puede volverse muy ancha");
    console.log("   • Pérdida de integridad específica por tipo");
  }

  close(): void {
    this.db.close();
  }
}

async function main() {
  console.log("=== TABLE PER HIERARCHY (TPH) - SQL PLANO ===");
  const example = new TablePerHierarchySQL();

  try {
    await paso("Esquema: una sola tabla 'vehicles' con discriminador", () => {
      example.createSchema();
    });

    await paso("Insertar autos y motos", () => {
      example.insertSampleData();
    });

    await paso("Todos los vehículos (sin JOINs)", () => {
      example.queryAllVehicles();
    });

    await paso("Solo autos, con sus campos específicos", () => {
      example.queryCars();
    });

    await paso("Estadísticas por tipo", () => {
      example.queryStats();
    });

    await paso("Estructura y trade-offs de TPH", () => {
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

export { TablePerHierarchySQL };
