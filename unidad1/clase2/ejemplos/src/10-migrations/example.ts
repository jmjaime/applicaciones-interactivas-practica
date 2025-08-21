import "reflect-metadata";
import { DataSource, MigrationInterface, QueryRunner } from "typeorm";

// DataSource específico para el ejemplo de migraciones (sin synchronize)
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "migrations-example.sqlite",
  synchronize: false,
  logging: true,
  entities: [],
});

// Migración simple: renombrar tabla y crear una VIEW de sólo lectura
class RenameUsersKeepReadonlyView1640000003000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Renombrar tabla real a "app_users" (si existe "users")
    await queryRunner.query(`
      PRAGMA foreign_keys = OFF;
    `);

    const tableExists = await queryRunner.query(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='users'`
    );
    if (tableExists.length > 0) {
      await queryRunner.query(`ALTER TABLE users RENAME TO app_users`);
    }

    // Crear vista con el nombre original
    const viewExists = await queryRunner.query(
      `SELECT name FROM sqlite_master WHERE type='view' AND name='users'`
    );
    if (viewExists.length === 0) {
      await queryRunner.query(`
        CREATE VIEW users AS
        SELECT id, name, email, createdAt FROM app_users
      `);
    }

    await queryRunner.query(`
      PRAGMA foreign_keys = ON;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar vista y restaurar nombre original
    await queryRunner.query(`DROP VIEW IF EXISTS users`);

    const appUsersExists = await queryRunner.query(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='app_users'`
    );
    if (appUsersExists.length > 0) {
      await queryRunner.query(`ALTER TABLE app_users RENAME TO users`);
    }
  }
}

async function ensureBaseSchema(queryRunner: QueryRunner) {
  console.log("\n🧱 Creando esquema base si no existe...");
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      createdAt DATETIME DEFAULT (datetime('now'))
    )
  `);

  const rows = await queryRunner.query(`SELECT COUNT(1) as c FROM users`);
  if (rows[0]?.c === 0) {
    console.log("📝 Insertando datos de ejemplo...");
    await queryRunner.query(
      `INSERT INTO users (name, email) VALUES
       ('Alice', 'alice@example.com'),
       ('Bob', 'bob@example.com')`
    );
  }
}

async function showSelect(
  label: string,
  queryRunner: QueryRunner,
  from: string
) {
  const data = await queryRunner.query(`SELECT * FROM ${from} ORDER BY id ASC`);
  console.log(`\n📄 ${label} (${from})`);
  data.forEach((row: any) => console.log("   ", row));
}

async function runMigration(
  migration: MigrationInterface,
  direction: "up" | "down"
) {
  const qr = AppDataSource.createQueryRunner();
  await qr.connect();
  try {
    await qr.startTransaction();
    if (direction === "up") {
      await migration.up(qr);
    } else {
      await migration.down!(qr);
    }
    await qr.commitTransaction();
  } catch (e) {
    await qr.rollbackTransaction();
    throw e;
  } finally {
    await qr.release();
  }
}

async function main() {
  console.log("\n🚀 Ejemplo: Migraciones SQL con TypeORM (SQLite)");
  await AppDataSource.initialize();

  const qr = AppDataSource.createQueryRunner();
  await qr.connect();

  try {
    await qr.startTransaction();
    await ensureBaseSchema(qr);
    await qr.commitTransaction();
  } catch (e) {
    await qr.rollbackTransaction();
    throw e;
  } finally {
    await qr.release();
  }

  // Mostrar datos desde la tabla base
  const qr1 = AppDataSource.createQueryRunner();
  await qr1.connect();
  await showSelect("Antes de migrar", qr1, "users");
  await qr1.release();

  // Ejecutar migración simple (up)
  const migration = new RenameUsersKeepReadonlyView1640000003000();
  console.log("\n⬆️  Ejecutando migración UP (renombrar y crear VIEW)...");
  await runMigration(migration, "up");

  // Ver consultas legacy (VIEW users) siguen funcionando
  const qr2 = AppDataSource.createQueryRunner();
  await qr2.connect();
  await showSelect("Después de migrar (leyendo desde VIEW)", qr2, "users");
  await qr2.release();

  // Revertir migración (down)
  console.log(
    "\n⬇️  Ejecutando migración DOWN (eliminar VIEW y restaurar nombre)..."
  );
  await runMigration(migration, "down");

  const qr3 = AppDataSource.createQueryRunner();
  await qr3.connect();
  await showSelect("Después de revertir (tabla original)", qr3, "users");
  await qr3.release();

  await AppDataSource.destroy();
  console.log("\n🎉 Ejemplo de migración finalizado");
}

main().catch((e) => {
  console.error("❌ Error en ejemplo de migración:", e);
});
