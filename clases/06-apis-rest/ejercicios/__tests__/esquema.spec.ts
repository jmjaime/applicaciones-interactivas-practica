import "reflect-metadata";
import { initializeDatabase, closeDatabase, AppDataSource } from "../src/db/data-source";
import { CreateInmobiliarias1788993712355 } from "../src/migrations/1788993712355-CreateInmobiliarias";
import { CreatePropiedades1788993739004 } from "../src/migrations/1788993739004-CreatePropiedades";
import { seedDatabase } from "../src/db/seed";

// Capa más baja del ejercicio: esquema (migraciones) + seed. Ver
// src/migrations/ (una migración por tabla, generadas con
// `npm run migration:generate`) y src/db/seed.ts (ya resuelto).

describe("Migraciones: esquema", () => {
  beforeAll(async () => {
    await initializeDatabase("migrations");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("crea las tablas inmobiliarias y propiedades, una migración por tabla", async () => {
    const qr = AppDataSource.createQueryRunner();
    await qr.connect();
    try {
      await qr.query(`DROP TABLE IF EXISTS propiedades`);
      await qr.query(`DROP TABLE IF EXISTS inmobiliarias`);

      await new CreateInmobiliarias1788993712355().up(qr);
      const inmobiliariasCols: Array<{ name: string }> = await qr.query(
        `PRAGMA table_info(inmobiliarias)`
      );
      expect(inmobiliariasCols.map((c) => c.name)).toEqual(
        expect.arrayContaining(["id", "nombre_fantasia", "telefono", "email"])
      );

      await new CreatePropiedades1788993739004().up(qr);
      const propiedadesCols: Array<{ name: string }> = await qr.query(
        `PRAGMA table_info(propiedades)`
      );
      expect(propiedadesCols.map((c) => c.name)).toEqual(
        expect.arrayContaining(["id", "titulo", "precio", "inmobiliaria_id", "superficie_total"])
      );
    } finally {
      await qr.release();
    }
  });
});

describe("Seed: datos de prueba (npm run seed)", () => {
  beforeAll(async () => {
    await initializeDatabase("migrations");
    const qr = AppDataSource.createQueryRunner();
    await qr.connect();
    try {
      await new CreateInmobiliarias1788993712355().up(qr);
      await new CreatePropiedades1788993739004().up(qr);
    } finally {
      await qr.release();
    }
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("puebla las tablas con datos de prueba consistentes", async () => {
    const qr = AppDataSource.createQueryRunner();
    await qr.connect();
    try {
      await seedDatabase(qr);

      const inmobiliarias: Array<{ id: number }> = await qr.query(
        `SELECT id FROM inmobiliarias`
      );
      expect(inmobiliarias.length).toBeGreaterThanOrEqual(2);

      const propiedades: Array<{
        precio: number;
        inmobiliariaId: number;
      }> = await qr.query(
        `SELECT precio, inmobiliaria_id AS inmobiliariaId FROM propiedades`
      );
      expect(propiedades.length).toBeGreaterThanOrEqual(4);

      const idsValidos = new Set(inmobiliarias.map((i) => i.id));
      for (const p of propiedades) {
        expect(p.precio).toBeGreaterThan(0);
        expect(idsValidos.has(p.inmobiliariaId)).toBe(true);
      }

      const inmobiliariasConPropiedad = new Set(
        propiedades.map((p) => p.inmobiliariaId)
      );
      expect(inmobiliariasConPropiedad.size).toBeGreaterThanOrEqual(2);
    } finally {
      await qr.release();
    }
  });
});
