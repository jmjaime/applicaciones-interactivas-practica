import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearOptimizationData,
  seedMinimalEcommerce,
  demonstrateNPlusOne,
  selectOnlyNeededFields,
  topSellingProducts,
  batchIncreasePrices,
  paginateActiveProducts,
} from "./exercise";

describe("Ejercicio 09 - Optimización", () => {
  beforeAll(async () => {
    await initializeDatabase("ej09");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearOptimizationData();
  });

  it("seed minimal ecommerce", async () => {
    await expect(seedMinimalEcommerce()).resolves.toBeUndefined();
  });

  it("demonstrate N+1 vs JOIN", async () => {
    await expect(demonstrateNPlusOne()).resolves.toHaveProperty("slowCount");
  });

  it("select only needed fields", async () => {
    const rows = await selectOnlyNeededFields();
    expect(Array.isArray(rows)).toBe(true);
  });

  it("top selling products", async () => {
    const rows = await topSellingProducts(5);
    expect(Array.isArray(rows)).toBe(true);
  });

  it("batch increase prices", async () => {
    await expect(batchIncreasePrices(1, 10)).resolves.toBeGreaterThanOrEqual(0);
  });

  it("paginate active products", async () => {
    const res = await paginateActiveProducts(1, 10);
    expect(res).toHaveProperty("data");
    expect(res).toHaveProperty("total");
  });
});
