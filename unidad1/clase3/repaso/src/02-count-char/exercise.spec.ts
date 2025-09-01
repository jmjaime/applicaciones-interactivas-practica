import { countChar } from "./exercise";

describe("contarCaracter", () => {
  it("cuenta ocurrencias", () => {
    expect(countChar("hello", "l")).toBe(2);
    expect(countChar("banana", "a")).toBe(3);
    expect(countChar("", "x")).toBe(0);
  });

  it("valida longitud del caracter objetivo", () => {
    expect(() => countChar("abc", "")).toThrow();
    expect(() => countChar("abc", "ab")).toThrow();
  });
});
