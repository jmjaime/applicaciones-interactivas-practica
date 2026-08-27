import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import { clearAll, validateUser, createValidUser, countInvalid } from "./exercise";
import { AppDataSource } from "../common/data-source";
import { User } from "./entities/User";

describe("Ejercicio 03 - Validación de aplicación", () => {
  beforeAll(async () => {
    await initializeDatabase("ej03");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("no encuentra errores en un usuario válido", async () => {
    const errors = await validateUser({
      firstName: "Juana",
      lastName: "Molina",
      username: "juanam",
      email: "juana@test.com",
      age: 25,
    });
    expect(errors).toEqual([]);
  });

  it("encuentra errores en un email inválido, sin tocar la base", async () => {
    const errors = await validateUser({
      firstName: "Juana",
      lastName: "Molina",
      username: "juanam",
      email: "no-es-un-email",
      age: 25,
    });
    expect(errors.length).toBeGreaterThan(0);

    const count = await AppDataSource.getRepository(User).count();
    expect(count).toBe(0);
  });

  it("createValidUser rechaza sin guardar cuando hay errores", async () => {
    // El matcher busca uno de los mensajes reales de class-validator, no
    // cualquier throw — así el test no queda en verde con la función sin
    // implementar (que también tira un Error, pero con otro mensaje).
    await expect(
      createValidUser({
        firstName: "J",
        lastName: "Molina",
        username: "jm",
        email: "no-es-un-email",
        age: 5,
      })
    ).rejects.toThrow(/email/i);

    const count = await AppDataSource.getRepository(User).count();
    expect(count).toBe(0);
  });

  it("createValidUser guarda cuando los datos son válidos", async () => {
    const user = await createValidUser({
      firstName: "Juana",
      lastName: "Molina",
      username: "juanam",
      email: "juana@test.com",
      age: 25,
    });
    expect(user.id).toBeDefined();
  });

  it("countInvalid cuenta sin guardar ninguno", async () => {
    const count = await countInvalid([
      {
        firstName: "Juana",
        lastName: "Molina",
        username: "juanam",
        email: "juana@test.com",
        age: 25,
      },
      {
        firstName: "J",
        lastName: "M",
        username: "jm",
        email: "invalido",
        age: 5,
      },
    ]);
    expect(count).toBe(1);
    expect(await AppDataSource.getRepository(User).count()).toBe(0);
  });
});
