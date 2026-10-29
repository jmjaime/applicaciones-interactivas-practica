// Hace de backend: más adelante esto pasa a ser un POST a la API del TPO.
export type NuevaSolicitud = { propiedadId: number; nombre: string; telefono: string; fecha: string };

const solicitudes: NuevaSolicitud[] = [];

export function registrarSolicitud(solicitud: NuevaSolicitud) {
  solicitudes.push(solicitud);
  console.log("📨 Solicitudes registradas:", solicitudes);
}
