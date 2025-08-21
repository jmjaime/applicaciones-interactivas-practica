import "reflect-metadata";
import { DataSource, MigrationInterface, QueryRunner } from "typeorm";

// DataSource específico para el ejemplo (sin synchronize)
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "migrations-fk-example.sqlite",
  synchronize: false,
  logging: true,
  entities: [],
});

// Migración simple: crear 2 tablas y relacionarlas con FK (ON DELETE CASCADE)
class CreateDepartmentsAndEmployeesFk1640000004000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      )
    `);

    await queryRunner.query(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        department_id INTEGER NOT NULL,
        hired_at DATETIME DEFAULT (datetime('now')),
        CONSTRAINT fk_employees_department
          FOREIGN KEY (department_id)
          REFERENCES departments(id)
          ON DELETE CASCADE
          ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS employees`);
    await queryRunner.query(`DROP TABLE IF EXISTS departments`);
  }
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

async function show(label: string, qr: QueryRunner) {
  const departments = await qr.query(`SELECT * FROM departments ORDER BY id`);
  const employees = await qr.query(`SELECT * FROM employees ORDER BY id`);
  console.log(`\n📄 ${label}`);
  console.log("departments:");
  departments.forEach((row: any) => console.log("   ", row));
  console.log("employees:");
  employees.forEach((row: any) => console.log("   ", row));
}

async function main() {
  console.log("\n🚀 Ejemplo simple: 2 tablas con Foreign Key (SQLite)");
  await AppDataSource.initialize();

  const migration = new CreateDepartmentsAndEmployeesFk1640000004000();

  console.log("\n⬆️  Ejecutando migración UP (crear tablas y FK)...");
  await runMigration(migration, "up");

  const qr = AppDataSource.createQueryRunner();
  await qr.connect();

  try {
    await qr.startTransaction();

    // Insertar datos de prueba
    await qr.query(
      `INSERT INTO departments (name) VALUES ('Engineering'), ('HR')`
    );

    const deptRows = await qr.query(
      `SELECT id FROM departments WHERE name = 'Engineering'`
    );
    const engineeringId = deptRows[0].id;

    await qr.query(
      `INSERT INTO employees (full_name, department_id) VALUES
       ('Alice Johnson', ${engineeringId}),
       ('Bob Smith', ${engineeringId})`
    );

    await qr.commitTransaction();
  } catch (e) {
    await qr.rollbackTransaction();
    throw e;
  }

  await show("Después de insertar", qr);

  // Probar ON DELETE CASCADE: borrar el departamento elimina sus empleados
  console.log(
    "\n🗑️  Eliminando departamento 'Engineering' (debe eliminar empleados asociados)..."
  );
  await qr.query(`DELETE FROM departments WHERE name = 'Engineering'`);

  await show("Después de borrar el departamento (CASCADE)", qr);

  await qr.release();

  console.log("\n⬇️  Ejecutando migración DOWN (drop tablas)...");
  await runMigration(migration, "down");

  await AppDataSource.destroy();
  console.log("\n🎉 Ejemplo FK finalizado");
}

main().catch((e) => {
  console.error("❌ Error en ejemplo FK:", e);
});
