import { distanciaAlOrigen } from "./coordenada";

describe("distanciaAlOrigen", () => {
  it("calcula la distancia de un punto simple", () => {
    expect(distanciaAlOrigen({ x: 3, y: 4 })).toBe(5);
  });

  it("la distancia del origen a sí mismo es 0", () => {
    expect(distanciaAlOrigen({ x: 0, y: 0 })).toBe(0);
  });

  it("funciona con coordenadas negativas", () => {
    expect(distanciaAlOrigen({ x: -3, y: -4 })).toBe(5);
  });
});
