import { procesarDato } from "./esperar-dato";

describe("procesarDato", () => {
  it("espera el dato asíncrono y lo devuelve en mayúsculas", async () => {
    const resultado = await procesarDato();

    expect(resultado).toBe("DATO");
  });
});
