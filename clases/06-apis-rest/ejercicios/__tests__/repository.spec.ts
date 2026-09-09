import "reflect-metadata";
import { initializeDatabase, closeDatabase, AppDataSource } from "../src/db/data-source";
import { propiedadesRepository } from "../src/repositories/propiedades.repository";
import { Propiedad, TipoPropiedad, EstadoPropiedad } from "../src/entities/Propiedad";
import { crearInmobiliaria, propiedadValida } from "./helpers";

describe("Repository: paginación y update", () => {
  const TOTAL = 15;
  let inmobiliariaId: number;

  beforeAll(async () => {
    await initializeDatabase("app");
    const inmobiliaria = await crearInmobiliaria();
    inmobiliariaId = inmobiliaria.id;

    const repo = AppDataSource.getRepository(Propiedad);
    for (let i = 0; i < TOTAL; i++) {
      await repo.save(
        repo.create({
          ...propiedadValida(inmobiliariaId),
          titulo: `Casa ${i}`,
          tipo: TipoPropiedad.CASA,
          estado: EstadoPropiedad.PUBLICADA,
        })
      );
    }
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("pagina resultados con page/limit y devuelve el total sin paginar", async () => {
    const primera = await propiedadesRepository.findAllPaginated(1, 10);
    expect(primera.items).toHaveLength(10);
    expect(primera.total).toBe(TOTAL);

    const segunda = await propiedadesRepository.findAllPaginated(2, 10);
    expect(segunda.items).toHaveLength(TOTAL - 10);
    expect(segunda.total).toBe(TOTAL);
  });

  it("update aplica un merge parcial sin pisar el resto de los campos", async () => {
    const [existente] = (await propiedadesRepository.findAllPaginated(1, 1))
      .items;
    const actualizada = await propiedadesRepository.update(existente.id, {
      precio: 999999,
    });
    expect(actualizada?.precio).toBe(999999);
    expect(actualizada?.titulo).toBe(existente.titulo);
  });

  it("update sobre un id inexistente devuelve undefined", async () => {
    const actualizada = await propiedadesRepository.update(999999, {
      precio: 1,
    });
    expect(actualizada).toBeUndefined();
  });
});
