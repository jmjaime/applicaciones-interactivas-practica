import "reflect-metadata";
import { QueryRunner } from "typeorm";
import { AppDataSource } from "../common/data-source";

// Ejercicio 10 – Migraciones (práctica en casa)
// Sin entidades mapeadas: acá se trabaja directo con QueryRunner y SQL,
// como en una migración real (`synchronize: false`, cambios de esquema
// explícitos y reversibles).

export async function setupInitialSchema(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS playlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);
}

export async function migrateAddIsPublicColumn(
  queryRunner: QueryRunner
): Promise<void> {
  // TODO: agregar la columna `isPublic` (BOOLEAN NOT NULL DEFAULT 0) a la
  // tabla `playlist` con un ALTER TABLE
  throw new Error("TODO: Implement migrateAddIsPublicColumn");
}

export async function columnExists(
  queryRunner: QueryRunner,
  table: string,
  column: string
): Promise<boolean> {
  const info: Array<{ name: string }> = await queryRunner.query(
    `PRAGMA table_info(${table})`
  );
  return info.some((col) => col.name === column);
}

export function getQueryRunner() {
  return AppDataSource.createQueryRunner();
}
