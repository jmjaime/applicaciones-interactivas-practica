import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  setupInitialSchema,
  migrateAddIsPublicColumn,
  columnExists,
  getQueryRunner,
} from "./exercise";

describe("Ejercicio 10 - Migraciones", () => {
  beforeAll(async () => {
    await initializeDatabase("ej10");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("agrega la columna isPublic con default false", async () => {
    const qr = getQueryRunner();
    await qr.connect();
    try {
      await qr.query(`DROP TABLE IF EXISTS playlist`);
      await setupInitialSchema(qr);
      expect(await columnExists(qr, "playlist", "isPublic")).toBe(false);

      await migrateAddIsPublicColumn(qr);
      expect(await columnExists(qr, "playlist", "isPublic")).toBe(true);

      await qr.query(`INSERT INTO playlist (name) VALUES ('Viaje en auto')`);
      const rows = await qr.query(`SELECT isPublic FROM playlist LIMIT 1`);
      expect(Number(rows[0].isPublic)).toBe(0);
    } finally {
      await qr.release();
    }
  });
});
