import type { SolicitudVisita } from "../types";

// Las solicitudes que recibió la inmobiliaria, como las devolvería
// GET /agencies/:id/visit-requests de la API.
export const solicitudes: SolicitudVisita[] = [
  { id: 1, propiedad: "Departamento luminoso con balcón", nombre: "María Gómez", telefono: "11 4444-4444", fecha: "2026-10-31T15:00", mensaje: "Puedo cualquier día después de las 14.", estado: "Pendiente" },
  { id: 2, propiedad: "Casa con jardín y pileta", nombre: "Pedro Ruiz", telefono: "11 3333-3333", fecha: "2026-10-25T11:00", mensaje: null, estado: "Confirmada" },
  { id: 3, propiedad: "Departamento 2 ambientes con cochera", nombre: "Lucía Fernández", telefono: "11 5555-1234", fecha: "2026-11-03T18:30", mensaje: "¿La cochera es fija?", estado: "Pendiente" },
  { id: 4, propiedad: "Monoambiente a estrenar", nombre: "Jorge Paz", telefono: "11 6666-0000", fecha: "2026-10-28T10:00", mensaje: null, estado: "Rechazada" },
  { id: 5, propiedad: "Departamento luminoso con balcón", nombre: "Sofía Medina", telefono: "11 7777-2222", fecha: "2026-10-27T17:00", mensaje: "Vamos con mi pareja.", estado: "Pendiente" },
  { id: 6, propiedad: "Casa con jardín y pileta", nombre: "Tomás Acosta", telefono: "11 2222-9999", fecha: "2026-11-08T12:00", mensaje: null, estado: "Pendiente" },
];
