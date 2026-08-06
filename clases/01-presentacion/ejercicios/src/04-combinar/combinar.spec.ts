import { actualizarEdad } from "./combinar";

describe("actualizarEdad", () => {
  it("devuelve un objeto con la edad actualizada", () => {
    const original = { nombre: "Ada", edad: 30 };

    const resultado = actualizarEdad(original, 31);

    expect(resultado).toEqual({ nombre: "Ada", edad: 31 });
  });

  it("no modifica el objeto original", () => {
    const original = { nombre: "Ada", edad: 30 };

    actualizarEdad(original, 31);

    expect(original.edad).toBe(30);
  });
});
