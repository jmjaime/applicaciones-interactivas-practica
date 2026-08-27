import "reflect-metadata";
import { initializeDatabase, closeDatabase, AppDataSource } from "../common/data-source";
import { clearAll, createUser, purchaseSubscription } from "./exercise";
import { User } from "./entities/User";
import { Subscription } from "./entities/Subscription";

describe("Ejercicio 11 - Transacciones", () => {
  beforeAll(async () => {
    await initializeDatabase("ej11");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearAll();
  });

  it("debita el saldo y crea la subscription cuando alcanza", async () => {
    await createUser("juanam", 20);

    const sub = await purchaseSubscription("juanam", "premium", 9.99);
    expect(sub.plan).toBe("premium");

    const user = await AppDataSource.getRepository(User).findOneBy({
      username: "juanam",
    });
    expect(Number(user!.walletBalance)).toBeCloseTo(10.01, 2);
  });

  it("rechaza y no deja estado parcial cuando el saldo no alcanza", async () => {
    await createUser("juanam", 5);

    // El matcher busca el mensaje específico de saldo insuficiente, no
    // cualquier throw — así el test no queda en verde con la función sin
    // implementar (que también tira un Error, pero con otro mensaje).
    await expect(
      purchaseSubscription("juanam", "premium", 9.99)
    ).rejects.toThrow(/saldo insuficiente/i);

    const user = await AppDataSource.getRepository(User).findOneBy({
      username: "juanam",
    });
    // El saldo no se tocó...
    expect(Number(user!.walletBalance)).toBe(5);
    // ...y tampoco quedó una Subscription creada.
    const subs = await AppDataSource.getRepository(Subscription).find();
    expect(subs.length).toBe(0);
  });
});
