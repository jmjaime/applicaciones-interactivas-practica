import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearAll,
  createUser,
  findUsersByPlan,
  countUsersByPlan,
  upgradeToPremium,
} from "./exercise";
import { PlanType } from "./entities/User";

describe("Ejercicio 02 - Restricciones de base de datos", () => {
  beforeAll(async () => {
    await initializeDatabase("ej02");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("crea un usuario válido", async () => {
    const user = await createUser({
      firstName: "Juana",
      lastName: "Molina",
      username: "juanam",
      email: "juana@test.com",
      age: 25,
    });
    expect(user.id).toBeDefined();
    expect(user.plan).toBe(PlanType.FREE);
  });

  it("rechaza un email duplicado", async () => {
    await createUser({
      firstName: "Juana",
      lastName: "Molina",
      username: "juanam",
      email: "juana@test.com",
      age: 25,
    });

    await expect(
      createUser({
        firstName: "Otra",
        lastName: "Persona",
        username: "otra",
        email: "juana@test.com",
        age: 30,
      })
    ).rejects.toThrow();
  });

  it("rechaza una edad fuera de rango (constraint @Check)", async () => {
    // El matcher busca el error real de SQLite (CHECK constraint), no
    // cualquier throw — así el test no queda en verde con la función sin
    // implementar (que también tira un Error, pero con otro mensaje).
    await expect(
      createUser({
        firstName: "Muy",
        lastName: "Joven",
        username: "muyjoven",
        email: "joven@test.com",
        age: 10,
      })
    ).rejects.toThrow(/CHECK/i);
  });

  it("filtra usuarios por plan ordenados por apellido", async () => {
    await createUser({
      firstName: "A",
      lastName: "Zeta",
      username: "a1",
      email: "a1@test.com",
      age: 20,
      plan: PlanType.PREMIUM,
    });
    await createUser({
      firstName: "B",
      lastName: "Alfa",
      username: "b1",
      email: "b1@test.com",
      age: 21,
      plan: PlanType.PREMIUM,
    });

    const premium = await findUsersByPlan(PlanType.PREMIUM);
    expect(premium.length).toBe(2);
    expect(premium[0].lastName).toBe("Alfa");
  });

  it("cuenta usuarios por plan, incluyendo planes en 0", async () => {
    await createUser({
      firstName: "A",
      lastName: "Zeta",
      username: "a1",
      email: "a1@test.com",
      age: 20,
    });

    const counts = await countUsersByPlan();
    expect(counts[PlanType.FREE]).toBe(1);
    expect(counts[PlanType.PREMIUM]).toBe(0);
    expect(counts[PlanType.FAMILY]).toBe(0);
  });

  it("mejora el plan de un usuario existente a PREMIUM", async () => {
    await createUser({
      firstName: "A",
      lastName: "Zeta",
      username: "a1",
      email: "a1@test.com",
      age: 20,
    });

    const upgraded = await upgradeToPremium("a1");
    expect(upgraded!.plan).toBe(PlanType.PREMIUM);
    expect(await upgradeToPremium("no-existe")).toBeNull();
  });
});
