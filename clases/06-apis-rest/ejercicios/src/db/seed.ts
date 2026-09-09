import "reflect-metadata";
import { QueryRunner } from "typeorm";
import seedFixture from "./seed.json";
import cliDataSource from "./cli-data-source";

// Herramienta de prueba manual, NO una migración: no versiona el
// esquema, solo carga datos de ejemplo para probar la API a mano (ver
// requests.http) o iterar en desarrollo. Por eso vive en un script propio
// (`npm run seed`) en vez de en migrations/ — un seed no debería
// ejecutarse como parte del versionado de la base.
//
// Ya resuelta: SQL crudo contra columnas reales, que son snake_case
// (`nombre_fantasia`, `inmobiliaria_id`, `superficie_total`), no los
// nombres de propiedad del fixture — hay que resolver el id real de cada
// inmobiliaria antes de insertar las propiedades que la referencian.
export async function seedDatabase(queryRunner: QueryRunner): Promise<void> {
  const inmobiliariaIds: number[] = [];
  for (const inmobiliaria of seedFixture.inmobiliarias) {
    await queryRunner.query(
      `INSERT INTO "inmobiliarias" ("nombre_fantasia", "telefono", "email") VALUES (?, ?, ?)`,
      [inmobiliaria.nombreFantasia, inmobiliaria.telefono, inmobiliaria.email]
    );
    const [{ id }] = await queryRunner.query(`SELECT last_insert_rowid() as id`);
    inmobiliariaIds.push(id);
  }

  for (const propiedad of seedFixture.propiedades) {
    await queryRunner.query(
      `INSERT INTO "propiedades" ("titulo", "tipo", "operacion", "precio", "moneda", "direccion", "zona", "superficie_total", "inmobiliaria_id") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        propiedad.titulo,
        propiedad.tipo,
        propiedad.operacion,
        propiedad.precio,
        propiedad.moneda,
        propiedad.direccion,
        propiedad.zona,
        propiedad.superficieTotal,
        inmobiliariaIds[propiedad.inmobiliariaIndex],
      ]
    );
  }
}

async function main() {
  await cliDataSource.initialize();
  const queryRunner = cliDataSource.createQueryRunner();
  try {
    await seedDatabase(queryRunner);
    console.log("Seed OK");
  } finally {
    await queryRunner.release();
    await cliDataSource.destroy();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
}
