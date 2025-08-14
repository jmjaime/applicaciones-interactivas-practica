import { TablePerHierarchyExercise, vehicles as tphVehicles } from "./exercise";

describe("TPH (vehicles)", () => {
  it("should run schema and inserts without error", async () => {
    const ex = new TablePerHierarchyExercise();
    await ex.createSchema();
    await ex.insertData();
  });

  it("getAll returns the same count as sample vehicles", async () => {
    const ex = new TablePerHierarchyExercise();
    const all = await ex.getAll();
    expect(all.length).toBe(tphVehicles.length);
  });

  it("getByType('Car') returns the expected count", async () => {
    const ex = new TablePerHierarchyExercise();
    const carCount = tphVehicles.filter((v) => v.type === "Car").length;
    const byType = await ex.getByType("Car");
    expect(byType.length).toBe(carCount);
  });

  it("filterByBrand returns the expected count for that brand", async () => {
    const ex = new TablePerHierarchyExercise();
    const brand = tphVehicles[0].brand;
    const expectedBrandCount = tphVehicles.filter(
      (v) => v.brand === brand
    ).length;
    const byBrand = await ex.filterByBrand(brand);
    expect(byBrand.length).toBe(expectedBrandCount);
  });
});
