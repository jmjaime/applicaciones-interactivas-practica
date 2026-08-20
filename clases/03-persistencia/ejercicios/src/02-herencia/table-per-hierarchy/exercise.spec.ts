import fs from "fs";
import { TablePerHierarchyExercise, Payment } from "./exercise";
import { preloadSqlJs } from "../../utils/sqlite";

const DB_PATH = "test-tph-payments.sqlite";

function removeDbFile(): void {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
}

describe("Table Per Hierarchy (payments)", () => {
  let ex: TablePerHierarchyExercise;

  beforeEach(async () => {
    await preloadSqlJs();
    removeDbFile();
    ex = new TablePerHierarchyExercise(DB_PATH);
    await ex.createSchema();
  });

  afterEach(() => {
    ex.close();
  });

  it("guarda un pago con tarjeta y lo recupera con los mismos datos", async () => {
    const payment: Payment = {
      method: "credit_card",
      amount: 15000,
      paidAt: "2026-08-01",
      cardLast4: "4242",
      installments: 3,
    };
    const saved = await ex.insertPayment(payment);

    const all = await ex.getAll();

    expect(all).toContainEqual(expect.objectContaining(payment));
    expect(saved.id).toBeDefined();
  });

  it("guarda pagos de los 3 subtipos y filtra por method", async () => {
    await ex.insertPayment({
      method: "credit_card",
      amount: 15000,
      paidAt: "2026-08-01",
      cardLast4: "4242",
      installments: 3,
    });
    await ex.insertPayment({
      method: "bank_transfer",
      amount: 8000,
      paidAt: "2026-08-02",
      bankName: "Galicia",
      accountNumber: "1234567890",
    });
    await ex.insertPayment({
      method: "cash",
      amount: 3000,
      paidAt: "2026-08-03",
      receivedBy: "Ana",
    });

    const cashPayments = await ex.getByMethod("cash");

    expect(cashPayments).toHaveLength(1);
    expect(cashPayments[0]).toMatchObject({ method: "cash", amount: 3000 });
  });

  it("suma el monto total de los pagos", async () => {
    await ex.insertPayment({
      method: "cash",
      amount: 100,
      paidAt: "2026-08-01",
      receivedBy: "Ana",
    });
    await ex.insertPayment({
      method: "cash",
      amount: 200,
      paidAt: "2026-08-02",
      receivedBy: "Ana",
    });

    const total = await ex.getTotalAmount();

    expect(total).toBe(300);
  });
});
