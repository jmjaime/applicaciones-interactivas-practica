import { TablePerTypeExercise, employees as tptEmployees } from "./exercise";

describe("TPT (employees)", () => {
  it("should run schema and inserts without error", async () => {
    const ex = new TablePerTypeExercise();
    await ex.createSchema();
    await ex.insertData();
  });

  it("getAll returns the same count as sample employees", async () => {
    const ex = new TablePerTypeExercise();
    const all = await ex.getAll();
    expect(all.length).toBe(tptEmployees.length);
  });

  it("getByType('Developer') returns the expected count", async () => {
    const ex = new TablePerTypeExercise();
    const devCount = tptEmployees.filter((e) => e.type === "Developer").length;
    const type = await ex.getByType("Developer");
    expect(type.length).toBe(devCount);
  });

  it("filterByDepartment returns the expected count", async () => {
    const ex = new TablePerTypeExercise();
    const department = tptEmployees[0].department;
    const depCount = tptEmployees.filter(
      (e) => e.department === department
    ).length;
    const dep = await ex.filterByDepartment(department);
    expect(dep.length).toBe(depCount);
  });
});
