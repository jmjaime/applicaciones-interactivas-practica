import fs from "fs";
import { OneToManyExercise, Customer, Order } from "./exercise";
import { preloadSqlJs } from "../../utils/sqlite";

const DB_PATH = "test-one-to-many.sqlite";

function removeDbFile(): void {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
}

describe("One-to-Many (customer/order)", () => {
  let ex: OneToManyExercise;

  beforeEach(async () => {
    await preloadSqlJs();
    removeDbFile();
    ex = new OneToManyExercise(DB_PATH);
    await ex.createSchema();
  });

  afterEach(() => {
    ex.close();
  });

  it("guarda un cliente con sus órdenes y las recupera con los mismos datos", async () => {
    const customer: Customer = {
      code: "CUST001",
      companyName: "TechCorp Solutions",
      contactName: "Ana García",
      email: "ana.garcia@techcorp.com",
      isActive: true,
    };
    const savedCustomer = await ex.insertCustomer(customer);

    const order: Order = {
      orderNumber: "ORD-001",
      customerId: savedCustomer.id!,
      totalAmount: 18400,
      status: "Delivered",
    };
    await ex.insertOrder(order);

    const allOrders = await ex.getAllOrders();

    expect(allOrders).toContainEqual(expect.objectContaining(order));
  });

  it("filtra órdenes por status", async () => {
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
    await ex.insertOrder({
      orderNumber: "ORD-002",
      customerId: customer.id!,
      totalAmount: 10435,
      status: "Pending",
    });

    const pending = await ex.getOrdersByStatus("Pending");

    expect(pending).toHaveLength(1);
    expect(pending[0]).toMatchObject({ orderNumber: "ORD-002" });
  });

  it("filtra clientes activos", async () => {
    await ex.insertCustomer({
      code: "CUST001",
      companyName: "TechCorp Solutions",
      contactName: "Ana García",
      email: "ana.garcia@techcorp.com",
      isActive: true,
    });
    await ex.insertCustomer({
      code: "CUST002",
      companyName: "Ex-cliente SA",
      contactName: "Carlos Ruiz",
      email: "carlos.ruiz@exclient.com",
      isActive: false,
    });

    const activeCustomers = await ex.filterCustomersByActive(true);

    expect(activeCustomers).toHaveLength(1);
    expect(activeCustomers[0]).toMatchObject({ code: "CUST001" });
  });
});
