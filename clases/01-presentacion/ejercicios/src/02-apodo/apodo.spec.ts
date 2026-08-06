import { obtenerApodo } from "./apodo";

describe("obtenerApodo", () => {
  it("devuelve el apodo si existe", () => {
    expect(obtenerApodo({ nombre: "Ada", apodo: "Ada L." })).toBe("Ada L.");
  });

  it("devuelve el nombre si el apodo es null", () => {
    expect(obtenerApodo({ nombre: "Grace", apodo: null })).toBe("Grace");
  });

  it("devuelve el nombre si no hay apodo", () => {
    expect(obtenerApodo({ nombre: "Linus" })).toBe("Linus");
  });
});
