import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearInheritanceData,
  seedTPHMinimal,
  listTPHVehicles,
  seedTPCMinimal,
  listTPCCars,
  seedJTMinimal,
  listJTJoinedCars,
} from "./exercise";

describe("Ejercicio 08 - Herencia", () => {
  beforeAll(async () => {
    await initializeDatabase("ej08");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearInheritanceData();
  });

  it("seed TPH minimal", async () => {
    await expect(seedTPHMinimal()).resolves.toBeUndefined();
  });

  it("list TPH vehicles", async () => {
    const list = await listTPHVehicles();
    expect(Array.isArray(list)).toBe(true);
  });

  it("seed TPC minimal", async () => {
    await expect(seedTPCMinimal()).resolves.toBeUndefined();
  });

  it("list TPC cars", async () => {
    const list = await listTPCCars();
    expect(Array.isArray(list)).toBe(true);
  });

  it("seed JT minimal", async () => {
    await expect(seedJTMinimal()).resolves.toBeUndefined();
  });

  it("list JT joined cars", async () => {
    const list = await listJTJoinedCars();
    expect(Array.isArray(list)).toBe(true);
  });
});
