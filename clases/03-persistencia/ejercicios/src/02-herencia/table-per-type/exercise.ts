import { Database, preloadSqlJs } from "../../utils/sqlite";

// Ejercicio 2.3: Table Per Type / JOINED (TPT) — ver README.md de esta
// carpeta. Autoestudio.

export type PaymentBase = {
  id?: number;
  amount: number;
  paidAt: string; // fecha en formato ISO (YYYY-MM-DD)
};

export type CreditCardPayment = PaymentBase & {
  method: "credit_card";
  cardLast4: string;
  installments: number;
};

export type BankTransferPayment = PaymentBase & {
  method: "bank_transfer";
  bankName: string;
  accountNumber: string;
};

export type CashPayment = PaymentBase & {
  method: "cash";
  receivedBy: string;
};

export type Payment = CreditCardPayment | BankTransferPayment | CashPayment;

export class TablePerTypeExercise {
  private db: Database;

  constructor(dbPath: string = "ejercicio-tpt.sqlite") {
    this.db = new Database(dbPath);
  }

  close(): void {
    this.db.close();
  }

  async createSchema(): Promise<void> {
    // TODO: crear tabla base 'payments' (amount, paid_at, method) + tablas
    // específicas con FK a payments(id) como PK compartida
  }

  async insertPayment(payment: Payment): Promise<Payment> {
    // TODO: insertar en 'payments' y luego en la tabla específica según
    // payment.method
    throw new Error("TODO: Implement insertPayment");
  }

  async getAll(): Promise<Payment[]> {
    // TODO: JOIN 'payments' con la tabla específica de cada fila
    throw new Error("TODO: Implement getAll");
  }

  async getByMethod(method: Payment["method"]): Promise<Payment[]> {
    // TODO: filtra por 'method' en la tabla base
    throw new Error("TODO: Implement getByMethod");
  }

  async getTotalAmount(): Promise<number> {
    // TODO: suma amount de 'payments'
    throw new Error("TODO: Implement getTotalAmount");
  }
}

if (require.main === module) {
  (async () => {
    await preloadSqlJs();
    const ex = new TablePerTypeExercise();
    await ex.createSchema();
    await ex.insertPayment({
      method: "cash",
      amount: 3000,
      paidAt: "2026-08-01",
      receivedBy: "Ana",
    });
    console.log("Pagos:", await ex.getAll());
    ex.close();
  })().catch(console.error);
}
