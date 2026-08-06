import { paresDuplicados } from "./pares-duplicados";

describe("paresDuplicados", () => {
  it("filtra los pares y los duplica", () => {
    expect(paresDuplicados([1, 2, 3, 4])).toEqual([4, 8]);
  });

  it("devuelve un array vacío si no hay pares", () => {
    expect(paresDuplicados([1, 3, 5])).toEqual([]);
  });

  it("devuelve un array vacío si la entrada está vacía", () => {
    expect(paresDuplicados([])).toEqual([]);
  });
});
