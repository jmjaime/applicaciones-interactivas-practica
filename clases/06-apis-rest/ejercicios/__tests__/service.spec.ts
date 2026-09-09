import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { initializeDatabase, closeDatabase } from "../src/db/data-source";
import { propiedadesService } from "../src/services/propiedades.service";
import { propiedadesRepository } from "../src/repositories/propiedades.repository";
import { CreatePropiedadDto } from "../src/controllers/propiedades.dto";
import { NotFoundError, ConflictError } from "../src/errors/propiedades.errors";
import { EstadoPropiedad } from "../src/entities/Propiedad";
import { crearInmobiliaria, propiedadValida } from "./helpers";

describe("Service: reglas de negocio", () => {
  let inmobiliariaId: number;

  beforeAll(async () => {
    await initializeDatabase("app");
    const inmobiliaria = await crearInmobiliaria();
    inmobiliariaId = inmobiliaria.id;
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("create ignora el estado recibido: toda propiedad nueva arranca en BORRADOR", async () => {
    const dto = plainToInstance(CreatePropiedadDto, {
      ...propiedadValida(inmobiliariaId),
      estado: EstadoPropiedad.VENDIDA,
    } as any);
    const creada = await propiedadesService.create(dto);
    expect(creada.estado).toBe(EstadoPropiedad.BORRADOR);
  });

  it("update rechaza cambios sobre una propiedad VENDIDA/ALQUILADA/CANCELADA", async () => {
    const dto = plainToInstance(CreatePropiedadDto, propiedadValida(inmobiliariaId));
    const creada = await propiedadesService.create(dto);
    await propiedadesRepository.update(creada.id, {
      estado: EstadoPropiedad.VENDIDA,
    });

    await expect(
      propiedadesService.update(creada.id, { precio: 1 })
    ).rejects.toThrow(ConflictError);
  });

  it("update sobre un id inexistente lanza NotFoundError", async () => {
    await expect(
      propiedadesService.update(999999, { precio: 1 })
    ).rejects.toThrow(NotFoundError);
  });

  it("get sobre un id inexistente lanza NotFoundError", async () => {
    await expect(propiedadesService.get(999999)).rejects.toThrow(NotFoundError);
  });
});
