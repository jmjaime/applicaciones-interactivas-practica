import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreatePropiedadDto } from "../src/controllers/propiedades.dto";
import { propiedadValida } from "./helpers";

describe("Validación de datos de entrada", () => {
  it("rechaza título vacío, precio negativo y tipo fuera del enum", async () => {
    const dto = plainToInstance(CreatePropiedadDto, {
      ...propiedadValida(1),
      titulo: "",
      precio: -100,
      tipo: "CASTILLO",
    });
    const errors = await validate(dto);
    const fields = errors.map((e) => e.property);
    expect(fields).toEqual(expect.arrayContaining(["titulo", "precio", "tipo"]));
  });

  it("acepta un payload válido sin errores", async () => {
    const dto = plainToInstance(CreatePropiedadDto, propiedadValida(1));
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
