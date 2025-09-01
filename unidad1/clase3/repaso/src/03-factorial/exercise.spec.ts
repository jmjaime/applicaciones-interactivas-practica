import { factorial } from "./exercise";

describe("factorial", () => {
  it("calcula el factorial", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
  });

  it("valida la entrada", () => {
    expect(() => factorial(-1)).toThrow();
    expect(() => factorial(1.2)).toThrow();
  });
});
