import { calcular } from "./operaciones";

describe("calculadora", () => {
  it("suma dos números", () => {
    expect(calcular("sumar", 2, 3)).toBe(5);
  });

  it.todo("multiplica dos números");
});
