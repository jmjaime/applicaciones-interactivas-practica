import { TablePerClassExercise, sampleBooks } from "./exercise";

describe("TPC (products)", () => {
  it("should run schema and inserts without error", async () => {
    const ex = new TablePerClassExercise();
    await ex.createSchema();
    await ex.insertData();
  });

  it("getAll returns at least the books count present in sample data", async () => {
    const ex = new TablePerClassExercise();
    const all = await ex.getAll();
    const totalBooks = sampleBooks.length;
    expect(all.length).toBeGreaterThanOrEqual(totalBooks);
  });

  it("getByType('Book') returns the same count as sampleBooks", async () => {
    const ex = new TablePerClassExercise();
    const totalBooks = sampleBooks.length;
    const books = await ex.getByType("Book");
    expect(books.length).toBe(totalBooks);
  });

  it("filterByCategory returns the expected number for that category", async () => {
    const ex = new TablePerClassExercise();
    const category = sampleBooks[0].category;
    const expectedByCategory = sampleBooks.filter(
      (b) => b.category === category
    ).length;
    const cat = await ex.filterByCategory(category);
    expect(cat.length).toBe(expectedByCategory);
  });
});
