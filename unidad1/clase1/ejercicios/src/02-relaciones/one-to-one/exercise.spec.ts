import { OneToOneExercise } from "./exercise";

describe("One-to-One (user/profile)", () => {
  it("should run schema and inserts without error", async () => {
    const ex = new OneToOneExercise();
    await ex.createSchema();
    await ex.insertData();
  });

  it("getAll returns some users with profiles", async () => {
    const ex = new OneToOneExercise();
    const all = await ex.getAll();
    expect(all.length).toBeGreaterThan(0);
  });

  it("getByActive(true) returns some active users", async () => {
    const ex = new OneToOneExercise();
    const active = await ex.getByActive(true);
    expect(active.length).toBeGreaterThan(0);
  });

  it("filterByCountry('Argentina') returns zero or more users", async () => {
    const ex = new OneToOneExercise();
    const country = await ex.filterByCountry("Argentina");
    expect(country.length).toBeGreaterThanOrEqual(0);
  });
});
