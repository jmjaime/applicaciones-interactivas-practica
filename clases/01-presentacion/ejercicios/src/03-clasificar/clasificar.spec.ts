import { clasificarNumero } from "./clasificar";

describe("clasificarNumero", () => {
  it("clasifica un negativo", () => {
    expect(clasificarNumero(-5)).toBe("negativo");
  });

  it("clasifica el cero", () => {
    expect(clasificarNumero(0)).toBe("cero");
  });

  it("clasifica un positivo", () => {
    expect(clasificarNumero(7)).toBe("positivo");
  });
});
