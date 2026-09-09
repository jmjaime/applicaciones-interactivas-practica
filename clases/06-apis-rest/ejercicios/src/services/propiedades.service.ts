import { propiedadesRepository, PaginatedResult } from "../repositories/propiedades.repository";
import { Propiedad, EstadoPropiedad } from "../entities/Propiedad";
import { CreatePropiedadDto, UpdatePropiedadDto } from "../controllers/propiedades.dto";
import { NotFoundError, ConflictError } from "../errors/propiedades.errors";

// Estados desde los que ya no se editan los datos principales de la
// propiedad (ver TPO/tpo.md § Propiedad, ciclo de vida).
const ESTADOS_NO_EDITABLES = [
  EstadoPropiedad.VENDIDA,
  EstadoPropiedad.ALQUILADA,
  EstadoPropiedad.CANCELADA,
];

export const propiedadesService = {
  async list(page: number, limit: number): Promise<PaginatedResult<Propiedad>> {
    return propiedadesRepository.findAllPaginated(page, limit);
  },

  async get(id: number): Promise<Propiedad> {
    const propiedad = await propiedadesRepository.findById(id);
    if (!propiedad) throw new NotFoundError(`Propiedad ${id} no encontrada`);
    return propiedad;
  },

  // TODO: crear la propiedad a partir del DTO, pero ignorando cualquier
  // `estado` que venga en el input — toda propiedad nueva arranca en
  // EstadoPropiedad.BORRADOR (no se puede publicar directo al crear).
  create(_dto: CreatePropiedadDto): Promise<Propiedad> {
    throw new Error("TODO: Implement create");
  },

  // TODO: buscar la propiedad con propiedadesRepository.findById(id); si
  // no existe, lanzar `new NotFoundError(...)`. Si existe pero su
  // `estado` está en ESTADOS_NO_EDITABLES, lanzar
  // `new ConflictError(...)` sin llegar a tocar el repositorio. Caso
  // contrario, aplicar los cambios con propiedadesRepository.update() y
  // devolver el resultado — no hace falta try/catch acá ni en el
  // controller, el error handler centralizado (middlewares/errorHandler.ts)
  // los traduce a 404/409.
  update(_id: number, _changes: UpdatePropiedadDto): Promise<Propiedad> {
    throw new Error("TODO: Implement update");
  },

  async remove(id: number): Promise<void> {
    const deleted = await propiedadesRepository.delete(id);
    if (!deleted) throw new NotFoundError(`Propiedad ${id} no encontrada`);
  },
};
