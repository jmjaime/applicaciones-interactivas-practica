import { OneToManyExercise } from "./exercise";

describe("One-to-Many (customer → orders)", () => {
  it("should run schema and inserts without error", async () => {
    const ex = new OneToManyExercise();
    await ex.createSchema();
    await ex.insertData();
  });

  it("getAllOrders returns some orders with customer info", async () => {
    const ex = new OneToManyExercise();
    const all = await ex.getAllOrders();
    expect(all.length).toBeGreaterThan(0);
  });

  it("getOrdersByStatus('Delivered') returns zero or more orders", async () => {
    const ex = new OneToManyExercise();
    const byStatus = await ex.getOrdersByStatus("Delivered");
    expect(byStatus.length).toBeGreaterThanOrEqual(0);
  });

  it("filterCustomersByActive(true) returns zero or more customers", async () => {
    const ex = new OneToManyExercise();
    const activeCustomers = await ex.filterCustomersByActive(true);
    expect(activeCustomers.length).toBeGreaterThanOrEqual(0);
  });
});
