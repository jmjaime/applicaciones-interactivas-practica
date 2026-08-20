import fs from "fs";
import { TablePerClassExercise, Payment } from "./exercise";

const DB_PATH = "test-tpc-payments.sqlite";

function removeDbFile(): void {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
}

describe("Table Per Class (payments)", () => {
  let ex: TablePerClassExercise;

  beforeEach(async () => {
    removeDbFile();
    ex = new TablePerClassExercise(DB_PATH);
    await ex.createSchema();
  });

  afterEach(() => {
    ex.close();
  });

  it("guarda un pago por transferencia y lo recupera con los mismos datos", async () => {
    const payment: Payment = {
      method: "bank_transfer",
      amount: 20000,
      paidAt: "2026-08-01",
      bankName: "Santander",
      accountNumber: "0987654321",
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

    const creditCardPayments = await ex.getByMethod("credit_card");

    expect(creditCardPayments).toHaveLength(1);
    expect(creditCardPayments[0]).toMatchObject({
      method: "credit_card",
      amount: 15000,
    });
  });

  it("suma el monto total de los pagos entre las 3 tablas", async () => {
    await ex.insertPayment({
      method: "cash",
      amount: 100,
      paidAt: "2026-08-01",
      receivedBy: "Ana",
    });
    await ex.insertPayment({
      method: "credit_card",
      amount: 200,
      paidAt: "2026-08-02",
      cardLast4: "1111",
      installments: 1,
    });

    const total = await ex.getTotalAmount();

    expect(total).toBe(300);
  });
});
