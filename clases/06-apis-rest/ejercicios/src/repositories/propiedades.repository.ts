import { AppDataSource } from "../db/data-source";
import { Propiedad } from "../entities/Propiedad";

export type PaginatedResult<T> = {
  items: T[];
  total: number;
};

export class PropiedadesRepository {
  private get repo() {
    return AppDataSource.getRepository(Propiedad);
  }

  findById(id: number): Promise<Propiedad | null> {
    return this.repo.findOneBy({ id });
  }

  create(
    data: Omit<Propiedad, "id" | "createdAt" | "updatedAt" | "inmobiliaria">
  ): Promise<Propiedad> {
    const propiedad = this.repo.create(data);
    return this.repo.save(propiedad);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete({ id });
    return (result.affected ?? 0) > 0;
  }

  // TODO: usar `findAndCount` con `skip`/`take` para traer la página
  // pedida (1-indexed) ordenada por `createdAt` descendente, y devolver
  // `{ items, total }` con el total SIN paginar.
  async findAllPaginated(
    _page: number,
    _limit: number
  ): Promise<PaginatedResult<Propiedad>> {
    throw new Error("TODO: Implement findAllPaginated");
  }

  // TODO: buscar la propiedad por id; si no existe, devolver undefined.
  // Si existe, aplicar `partial` sobre la entidad encontrada (merge, sin
  // pisar `id`/`createdAt`), refrescar `updatedAt` a la fecha actual,
  // guardar y devolver la entidad actualizada.
  async update(
    _id: number,
    _partial: Partial<Propiedad>
  ): Promise<Propiedad | undefined> {
    throw new Error("TODO: Implement update");
  }
}

export const propiedadesRepository = new PropiedadesRepository();
