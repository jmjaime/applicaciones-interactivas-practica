import Database from "better-sqlite3";

// Ejercicio 2.1: Table Per Hierarchy (TPH) — ver README.md de esta carpeta.

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

export class TablePerHierarchyExercise {
  private db: Database.Database;

  constructor(dbPath: string = "ejercicio-tph.sqlite") {
    this.db = new Database(dbPath);
  }

  close(): void {
    this.db.close();
  }

  async createSchema(): Promise<void> {
    // TODO: crear tabla única 'payments' con columnas comunes (amount,
    // paid_at) + columnas específicas de cada subtipo + 'method' como
    // discriminador
  }

  async insertPayment(payment: Payment): Promise<Payment> {
    // TODO: insertar según payment.method y devolver el objeto con el id
    // generado
    throw new Error("TODO: Implement insertPayment");
  }

  async getAll(): Promise<Payment[]> {
    // TODO: SELECT * mapeado de vuelta a Payment (según 'method')
    throw new Error("TODO: Implement getAll");
  }

  async getByMethod(method: Payment["method"]): Promise<Payment[]> {
    // TODO: filtra por 'method'
    throw new Error("TODO: Implement getByMethod");
  }

  async getTotalAmount(): Promise<number> {
    // TODO: suma el campo amount de todos los pagos
    throw new Error("TODO: Implement getTotalAmount");
  }
}

if (require.main === module) {
  (async () => {
    const ex = new TablePerHierarchyExercise();
    await ex.createSchema();
    await ex.insertPayment({
      method: "credit_card",
      amount: 15000,
      paidAt: "2026-08-01",
      cardLast4: "4242",
      installments: 3,
    });
    console.log("Pagos:", await ex.getAll());
    ex.close();
  })().catch(console.error);
}
