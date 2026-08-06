import { dividirSeguro, describirResultado } from "./resultado-division";

describe("dividirSeguro", () => {
  it("devuelve ok:true con el valor si se puede dividir", () => {
    expect(dividirSeguro(10, 2)).toEqual({ ok: true, valor: 5 });
  });

  it("devuelve ok:false con un error si b es 0", () => {
    expect(dividirSeguro(5, 0)).toEqual({
      ok: false,
      error: "no se puede dividir por cero",
    });
  });
});

describe("describirResultado", () => {
  it("describe un resultado exitoso", () => {
    expect(describirResultado({ ok: true, valor: 5 })).toBe("El resultado es 5");
  });

  it("describe un error", () => {
    expect(describirResultado({ ok: false, error: "no se puede dividir por cero" })).toBe(
      "Error: no se puede dividir por cero"
    );
  });
});
