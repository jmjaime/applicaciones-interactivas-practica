import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../../common/data-source";
import {
  clearAll,
  createUserWithSubscription,
  getUserSubscription,
  upgradePlan,
} from "./exercise";
import { PlanType } from "./entities/Subscription";

describe("Ejercicio 4.1 - Relación 1:1 (User ↔ Subscription)", () => {
  beforeAll(async () => {
    await initializeDatabase("ej04a");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("crea un usuario con su subscription", async () => {
    const user = await createUserWithSubscription(
      { username: "juanam", email: "juana@test.com" },
      { plan: PlanType.FREE, monthlyPrice: 0, startDate: "2026-01-01" }
    );
    expect(user.subscription?.plan).toBe(PlanType.FREE);
  });

  it("obtiene la subscription de un usuario por username", async () => {
    await createUserWithSubscription(
      { username: "juanam", email: "juana@test.com" },
      { plan: PlanType.PREMIUM, monthlyPrice: 9.99, startDate: "2026-01-01" }
    );

    const sub = await getUserSubscription("juanam");
    expect(sub?.plan).toBe(PlanType.PREMIUM);
    expect(await getUserSubscription("no-existe")).toBeNull();
  });

  it("actualiza el plan y precio de una subscription existente", async () => {
    await createUserWithSubscription(
      { username: "juanam", email: "juana@test.com" },
      { plan: PlanType.FREE, monthlyPrice: 0, startDate: "2026-01-01" }
    );

    const upgraded = await upgradePlan("juanam", PlanType.FAMILY, 14.99);
    expect(upgraded?.plan).toBe(PlanType.FAMILY);
    expect(Number(upgraded?.monthlyPrice)).toBe(14.99);
  });
});
