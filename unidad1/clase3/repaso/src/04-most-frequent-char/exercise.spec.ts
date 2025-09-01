import { mostFrequentChar } from "./exercise";

describe("caracterMasFrecuente", () => {
  it("retorna el caracter mas frecuente en un string simple", () => {
    expect(mostFrequentChar("hello")).toBe("l");
    expect(mostFrequentChar("banana")).toBe("a");
  });

  it("ante empate retorna el primero segun orden de lectura", () => {
    // 'a' y 'b' aparecen dos veces; se espera el primero al escanear izq->der
    expect(mostFrequentChar("abba")).toBe("a");
  });

  it("retorna cadena vacia cuando el input es vacio", () => {
    expect(mostFrequentChar("")).toBe("");
  });

  it("es sensible a mayusculas/minusculas ('A' distinto de 'a')", () => {
    expect(mostFrequentChar("AaAaBb")).toBe("A");
  });
});
