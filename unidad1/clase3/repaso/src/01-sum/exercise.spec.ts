import { sum } from "./exercise";

describe("sumar", () => {
  it("suma dos numeros", () => {
    expect(sum(2, 3)).toBe(5);
    // Escribir assert para -1 + 1 = 0
  });
});
