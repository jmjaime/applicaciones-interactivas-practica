import { saludar } from "./saludar";

describe("saludar", () => {
  it("usa el saludo por defecto si no se pasa uno", () => {
    expect(saludar("Ada")).toBe("Hola, Ada!");
  });

  it("usa el saludo que se le pase", () => {
    expect(saludar("Ada", "Buenas")).toBe("Buenas, Ada!");
  });
});
