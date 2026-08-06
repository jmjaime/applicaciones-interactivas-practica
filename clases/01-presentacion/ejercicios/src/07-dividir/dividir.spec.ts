import { dividir } from "./dividir";

describe("dividir", () => {
  it("divide dos números", () => {
    expect(dividir(10, 2)).toBe(5);
  });

  it("devuelve undefined si se intenta dividir por cero", () => {
    expect(dividir(5, 0)).toBeUndefined();
  });
});
