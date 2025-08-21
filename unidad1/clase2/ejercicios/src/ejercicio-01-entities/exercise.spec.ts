import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  createLibraries,
  listLibraries,
  updateLibraryBudget,
  createGenres,
  listFeaturedGenres,
  getTotalLibrariesBudget,
} from "./exercise";

describe("Ejercicio 01 - Entidades básicas", () => {
  beforeAll(async () => {
    await initializeDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("debe crear y listar bibliotecas", async () => {
    await createLibraries([
      {
        name: "Biblioteca Central",
        address: "Av. Principal 123",
        email: "central@biblioteca.test",
        maxCapacity: 1000,
        foundationDate: new Date("2000-01-01"),
        budget: 1000,
      },
      {
        name: "Biblioteca de Barrio",
        address: "Calle 1",
        email: "barrio@biblioteca.test",
        maxCapacity: 200,
        foundationDate: new Date("2010-01-01"),
        budget: 200,
      },
    ]);

    const all = await listLibraries();
    expect(all.length).toBeGreaterThanOrEqual(2);
    expect(all[0].name <= all[1].name).toBe(true);
  });

  it("debe actualizar el presupuesto de una biblioteca por nombre", async () => {
    await createLibraries([
      {
        name: "Biblioteca Central",
        address: "Av. Principal 123",
        email: "central@biblioteca.test",
        maxCapacity: 1000,
        foundationDate: new Date("2000-01-01"),
        budget: 1000,
      },
    ]);

    const updated = await updateLibraryBudget("Biblioteca Central", 2500);
    expect(updated).not.toBeNull();
    expect(Number(updated!.budget)).toBe(2500);
  });

  it("debe crear géneros y listar solo destacados por rating DESC", async () => {
    await createGenres([
      {
        name: "Ficción",
        code: "FIC",
        popularity: 5,
        category: "fiction",
        isFeatured: true,
        averageRating: 4.7,
      },
      {
        name: "Historia",
        code: "HIS",
        popularity: 4,
        category: "non-fiction",
        isFeatured: true,
        averageRating: 4.0,
      },
      {
        name: "Diccionarios",
        code: "REF",
        popularity: 2,
        category: "reference",
        isFeatured: false,
        averageRating: 3.2,
      },
    ]);

    const featured = await listFeaturedGenres();
    expect(featured.length).toBe(2);
    expect(featured[0].averageRating >= featured[1].averageRating).toBe(true);
  });

  it("debe calcular el presupuesto total de bibliotecas", async () => {
    await createLibraries([
      {
        name: "A",
        address: "1",
        email: "a@a.test",
        maxCapacity: 10,
        foundationDate: new Date(),
        budget: 100,
      },
      {
        name: "B",
        address: "2",
        email: "b@b.test",
        maxCapacity: 20,
        foundationDate: new Date(),
        budget: 200,
      },
    ]);
    const total = await getTotalLibrariesBudget();
    expect(total).toBe(300);
  });
});
