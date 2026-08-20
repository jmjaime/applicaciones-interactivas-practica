import { Database, preloadSqlJs } from "../../utils/sqlite";

// Ejercicio 2.2: Table Per Class (TPC) — ver README.md de esta carpeta.

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

export class TablePerClassExercise {
  private db: Database;

  constructor(dbPath: string = "ejercicio-tpc.sqlite") {
    this.db = new Database(dbPath);
  }

  close(): void {
    this.db.close();
  }

  async createSchema(): Promise<void> {
    // TODO: crear 'credit_card_payments', 'bank_transfer_payments' y
    // 'cash_payments', cada una con sus columnas propias (sin tabla base)
  }

  async insertPayment(payment: Payment): Promise<Payment> {
    // TODO: insertar en la tabla que corresponda según payment.method
    throw new Error("TODO: Implement insertPayment");
  }

  async getAll(): Promise<Payment[]> {
    // TODO: UNION de las 3 tablas devolviendo Payment con 'method'
    throw new Error("TODO: Implement getAll");
  }

  async getByMethod(method: Payment["method"]): Promise<Payment[]> {
    // TODO: SELECT de la tabla correspondiente al método
    throw new Error("TODO: Implement getByMethod");
  }

  async getTotalAmount(): Promise<number> {
    // TODO: suma amount de las 3 tablas
    throw new Error("TODO: Implement getTotalAmount");
  }
}

async function main(): Promise<void> {
  await preloadSqlJs();
  const ex = new TablePerClassExercise();
  await ex.createSchema();
  await ex.insertPayment({
    method: "bank_transfer",
    amount: 20000,
    paidAt: "2026-08-01",
    bankName: "Santander",
    accountNumber: "0987654321",
  });
  console.log("Pagos:", await ex.getAll());
  ex.close();
}

main();
