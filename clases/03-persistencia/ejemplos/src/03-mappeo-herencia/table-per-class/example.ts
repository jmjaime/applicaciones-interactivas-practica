import { Database, preloadSqlJs } from "../../utils/sqlite";
import { paso } from "../../utils/demo";

// ============================================================================
// TABLE PER CLASS (TPC) - SQL PLANO
// Cada clase concreta tiene su propia tabla con TODOS los campos.
// Mismo dominio que la slide "Herencia · TPC" de la clase: AUTO y MOTO.
// ============================================================================

class TablePerClassSQL {
  private db: Database;

  constructor() {
    this.db = new Database("table-per-class.sqlite");
  }

  createSchema(): void {
    // Cada tabla tiene TODOS los campos (comunes + específicos), sin tabla base

    const createAutoSQL = `
      CREATE TABLE IF NOT EXISTS auto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        puertas INTEGER NOT NULL
      )
    `;

    const createMotoSQL = `
      CREATE TABLE IF NOT EXISTS moto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        cilindrada INTEGER NOT NULL
      )
    `;

    this.db.exec(createAutoSQL);
    this.db.exec(createMotoSQL);
  }

  insertSampleData(): void {
    const transaction = this.db.transaction(() => {
      const insertAuto = this.db.prepare(
        `INSERT INTO auto (marca, modelo, puertas) VALUES (?, ?, ?)`
      );
      const insertMoto = this.db.prepare(
        `INSERT INTO moto (marca, modelo, cilindrada) VALUES (?, ?, ?)`
      );

      insertAuto.run("Ford", "Fiesta", 4);
      insertAuto.run("VW", "Golf", 5);
      insertMoto.run("Yamaha", "MT-07", 689);
    });

    transaction();
    console.log("3 vehículos insertados");
  }

  queryAllVehicles(): void {
    const allVehiclesSQL = `
      SELECT id, marca, modelo, 'auto' as type FROM auto
      UNION ALL
      SELECT id, marca, modelo, 'moto' as type FROM moto
      ORDER BY marca
    `;
    console.table(this.db.prepare(allVehiclesSQL).all());
  }

  queryCars(): void {
    const autos = this.db
      .prepare(`SELECT marca, modelo, puertas FROM auto ORDER BY marca`)
      .all();
    console.table(autos);
  }

  queryStats(): void {
    const statsSQL = `
      SELECT 'auto' as type, COUNT(*) as count FROM auto
      UNION ALL
      SELECT 'moto' as type, COUNT(*) as count FROM moto
    `;
    console.table(this.db.prepare(statsSQL).all());
  }

  showStructure(): void {
    console.log("Cada tabla contiene TODOS sus campos, sin tabla base:");
    console.log("");
    console.log("📋 auto: id, marca, modelo, puertas");
    console.log("📋 moto: id, marca, modelo, cilindrada");
    console.log("");
    console.log("✅ VENTAJAS:");
    console.log("   • Acceso directo a cada tipo sin JOINs");
    console.log("   • Consultas específicas muy eficientes");
    console.log("   • Estructura clara por tipo");
    console.log("");
    console.log("⚠️ DESVENTAJAS:");
    console.log("   • Consultas polimórficas requieren UNION");
    console.log("   • Duplicación de estructura de campos comunes");
    console.log("   • Mantenimiento de esquema más complejo");
  }

  close(): void {
    this.db.close();
  }
}

async function main() {
  console.log("=== TABLE PER CLASS (TPC) - SQL PLANO ===");
  await preloadSqlJs();
  const example = new TablePerClassSQL();

  try {
    await paso("Esquema: una tabla por clase concreta, sin tabla base", () => {
      example.createSchema();
    });

    await paso("Insertar autos y motos", () => {
      example.insertSampleData();
    });

    await paso("Todos los vehículos (polimórfico con UNION)", () => {
      example.queryAllVehicles();
    });

    await paso("Solo autos (acceso directo, sin UNION)", () => {
      example.queryCars();
    });

    await paso("Estadísticas por tipo (con UNION)", () => {
      example.queryStats();
    });

    await paso("Estructura y trade-offs de TPC", () => {
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

export { TablePerClassSQL };
