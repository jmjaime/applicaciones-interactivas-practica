import Database from "better-sqlite3";

// Ejercicio: One-to-Many (1:N)
// Objetivo: 'customer' (One) → 'purchase_order' (Many)
// Instrucciones: completar los TODO con SQL para crear tablas e insertar datos.

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

// Instancias para persistir
export const customers: Customer[] = [
  {
    id: 1,
    code: "CUST001",
    companyName: "TechCorp Solutions",
    contactName: "Ana García",
    email: "ana.garcia@techcorp.com",
    isActive: true,
  },
  {
    id: 2,
    code: "CUST002",
    companyName: "InnovaBusiness S.L.",
    contactName: "Carlos Ruiz",
    email: "carlos.ruiz@innovabusiness.es",
    isActive: true,
  },
];

export const orders: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-001",
    customerId: 1,
    totalAmount: 18400,
    status: "Delivered",
  },
  {
    id: 2,
    orderNumber: "ORD-002",
    customerId: 1,
    totalAmount: 10435,
    status: "Pending",
  },
  {
    id: 3,
    orderNumber: "ORD-003",
    customerId: 2,
    totalAmount: 6755,
    status: "Delivered",
  },
];

export class OneToManyExercise {
  private db: Database.Database;

  constructor() {
    this.db = new Database("ejercicio-one-to-many.sqlite");
  }

  async run(): Promise<void> {
    try {
      await this.createSchema();
      await this.insertData();
      console.log("✅ 1:N: datos listos. Agregá consultas si querés.");
    } finally {
      this.db.close();
    }
  }

  async createSchema(): Promise<void> {
    console.log(
      "🔧 TODO: Crear tablas 'customer' y 'purchase_order' (FK customer_id)"
    );
    // TODO: Crear 'customer' y 'purchase_order' con FK a customer(id)
  }

  async insertData(): Promise<void> {
    console.log(
      "📝 TODO: Insertar arrays 'customers' y 'orders' (respetando FK)"
    );
    // TODO: Insertar primero customers, luego orders
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAllOrders(): Promise<Array<Order>> {
    // TODO: SELECT JOIN customer ↔ purchase_order devolviendo campos mapeados
    return [];
  }

  async getOrdersByStatus(
    status: Order["status"]
  ): Promise<Array<Order>> {
    // TODO: SELECT filtrando por status
    return [];
  }

  async filterCustomersByActive(
    isActive: boolean
  ): Promise<Array<Customer>> {
    // TODO: SELECT filtrando por is_active
    return [];
  }
}

if (require.main === module) {
  new OneToManyExercise().run().catch(console.error);
}
