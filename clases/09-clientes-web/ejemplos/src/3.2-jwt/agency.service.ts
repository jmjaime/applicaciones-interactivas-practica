import { agencies } from "../data";
import { HttpError } from "../errors";

// Chequeo de dueño: regla de negocio, por eso vive en el service.
// 404 si no existe; 403 si existe pero es de otro vendedor.
export function assertOwner(agencyId: string, sellerId: string) {
  const agency = agencies.find((a) => a.id === agencyId);
  if (!agency) throw new HttpError(404, "Inmobiliaria inexistente");
  if (agency.sellerId !== sellerId) {
    throw new HttpError(403, "La inmobiliaria es de otro vendedor");
  }
  return agency;
}

export function update(agencyId: string, sellerId: string, data: { name?: string; contactPhone?: string }) {
  const agency = assertOwner(agencyId, sellerId);
  if (data.name !== undefined) agency.name = data.name;
  if (data.contactPhone !== undefined) agency.contactPhone = data.contactPhone;
  return agency;
}
