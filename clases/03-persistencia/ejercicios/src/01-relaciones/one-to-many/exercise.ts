import Database from "better-sqlite3";

// Ejercicio 1.2: One-to-Many / Many-to-One — ver README.md de esta carpeta.

export type Customer = {
  id?: number;
  code: string;
  companyName: string;
  contactName: string;
  email: string;
  isActive: boolean;
};

export type Order = {
  id?: number;
  orderNumber: string;
  customerId: number; // FK a customer.id
  totalAmount: number;
  status: "Pending" | "Approved" | "Shipped" | "Delivered";
};

export class OneToManyExercise {
  private db: Database.Database;

  constructor(dbPath: string = "ejercicio-one-to-many.sqlite") {
    this.db = new Database(dbPath);
  }

  close(): void {
    this.db.close();
  }

  async createSchema(): Promise<void> {
    // TODO: crear 'customer' y 'purchase_order' con FK a customer(id)
  }

  async insertCustomer(customer: Customer): Promise<Customer> {
    // TODO: insertar en 'customer' y devolver el objeto con el id generado
    throw new Error("TODO: Implement insertCustomer");
  }

  async insertOrder(order: Order): Promise<Order> {
    // TODO: insertar en 'purchase_order' y devolver el objeto con el id
    // generado
    throw new Error("TODO: Implement insertOrder");
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAllOrders(): Promise<Array<Order>> {
    // TODO: SELECT JOIN customer ↔ purchase_order devolviendo campos mapeados
    throw new Error("TODO: Implement getAllOrders");
  }

  async getOrdersByStatus(status: Order["status"]): Promise<Array<Order>> {
    // TODO: SELECT filtrando por status
    throw new Error("TODO: Implement getOrdersByStatus");
  }

  async filterCustomersByActive(isActive: boolean): Promise<Array<Customer>> {
    // TODO: SELECT filtrando por is_active
    throw new Error("TODO: Implement filterCustomersByActive");
  }
}

if (require.main === module) {
  (async () => {
    const ex = new OneToManyExercise();
    await ex.createSchema();
    const customer = await ex.insertCustomer({
      code: "CUST001",
      companyName: "TechCorp Solutions",
      contactName: "Ana García",
      email: "ana.garcia@techcorp.com",
      isActive: true,
    });
    await ex.insertOrder({
      orderNumber: "ORD-001",
      customerId: customer.id!,
      totalAmount: 18400,
      status: "Delivered",
    });
    console.log("Órdenes:", await ex.getAllOrders());
    ex.close();
  })().catch(console.error);
}
