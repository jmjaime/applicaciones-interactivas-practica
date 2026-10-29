// Hace de backend: los datos viven en memoria mientras la pestaña esté abierta
// (un F5 los reinicia). Más adelante cada función pasa a ser un request a la API.
import type { ConsultaRecibida, DatosPropiedad, MiPropiedad, SolicitudVisita } from "../types";

// GET /agencies/:id/properties
const propiedades: MiPropiedad[] = [
  { id: 1, titulo: "Departamento luminoso con balcón", tipo: "Departamento", operacion: "Alquiler", precio: 650000, moneda: "ARS", ambientes: 3, superficieCubierta: 68, superficieTotal: 74, estado: "Publicada", foto: "https://picsum.photos/seed/prop1/400/260" },
  { id: 2, titulo: "Casa con jardín y pileta", tipo: "Casa", operacion: "Venta", precio: 285000, moneda: "USD", ambientes: 5, superficieCubierta: 210, superficieTotal: 450, estado: "Reservada", foto: "https://picsum.photos/seed/prop2/400/260" },
  { id: 3, titulo: "Monoambiente a estrenar", tipo: "Departamento", operacion: "Venta", precio: 79000, moneda: "USD", ambientes: 1, superficieCubierta: 32, superficieTotal: 32, estado: "Pausada", foto: "https://picsum.photos/seed/prop3/400/260" },
  { id: 4, titulo: "Local a la calle sobre avenida", tipo: "Local", operacion: "Alquiler", precio: 1200000, moneda: "ARS", ambientes: null, superficieCubierta: 95, superficieTotal: 110, estado: "Borrador", foto: "https://picsum.photos/seed/prop4/400/260" },
  { id: 5, titulo: "PH reciclado con terraza propia", tipo: "Casa", operacion: "Venta", precio: 165000, moneda: "USD", ambientes: 4, superficieCubierta: 120, superficieTotal: 160, estado: "Vendida", foto: "https://picsum.photos/seed/prop5/400/260" },
  { id: 6, titulo: "Departamento 2 ambientes con cochera", tipo: "Departamento", operacion: "Alquiler", precio: 540000, moneda: "ARS", ambientes: 2, superficieCubierta: 45, superficieTotal: 48, estado: "Publicada", foto: "https://picsum.photos/seed/prop6/400/260" },
  { id: 7, titulo: "Terreno en esquina", tipo: "Terreno", operacion: "Venta", precio: 120000, moneda: "USD", ambientes: null, superficieCubierta: null, superficieTotal: 300, estado: "Cancelada", foto: "https://picsum.photos/seed/prop7/400/260" },
];

// GET /agencies/:id/visit-requests
const solicitudes: SolicitudVisita[] = [
  { id: 1, propiedadId: 1, nombre: "María Gómez", telefono: "11 4444-4444", fecha: "2026-10-31T15:00", estado: "Pendiente" },
  { id: 2, propiedadId: 2, nombre: "Pedro Ruiz", telefono: "11 3333-3333", fecha: "2026-10-25T11:00", estado: "Confirmada" },
  { id: 3, propiedadId: 6, nombre: "Lucía Fernández", telefono: "11 5555-1234", fecha: "2026-11-03T18:30", estado: "Pendiente" },
  { id: 4, propiedadId: 3, nombre: "Jorge Paz", telefono: "11 6666-0000", fecha: "2026-10-28T10:00", estado: "Rechazada" },
  { id: 5, propiedadId: 1, nombre: "Sofía Medina", telefono: "11 7777-2222", fecha: "2026-10-27T17:00", estado: "Pendiente" },
];

// GET /agencies/:id/comments
const consultas: ConsultaRecibida[] = [
  { id: 1, propiedadId: 6, autor: "Ana", fecha: "2026-10-21T10:22", texto: "¿Admite mascotas?", respuesta: null },
  { id: 2, propiedadId: 2, autor: "Luis", fecha: "2026-10-20T18:05", texto: "¿Tiene garage?", respuesta: "Sí, cochera para dos autos." },
  { id: 3, propiedadId: 1, autor: "Carla", fecha: "2026-10-20T09:40", texto: "¿Las expensas están incluidas en el precio?", respuesta: null },
  { id: 4, propiedadId: 3, autor: "Martín", fecha: "2026-10-19T21:15", texto: "¿Se puede usar como consultorio?", respuesta: null },
  { id: 5, propiedadId: 1, autor: "Julieta", fecha: "2026-10-18T13:00", texto: "¿El balcón da a la calle?", respuesta: "Sí, al frente, con vista abierta." },
];

export function listarPropiedades(): MiPropiedad[] {
  return propiedades;
}

export function buscarPropiedad(id: number): MiPropiedad | undefined {
  return propiedades.find((p) => p.id === id);
}

// POST /properties: la propiedad nueva arranca como Borrador.
export function crearPropiedad(datos: DatosPropiedad): MiPropiedad {
  const nueva: MiPropiedad = {
    ...datos,
    id: Math.max(...propiedades.map((p) => p.id)) + 1,
    estado: "Borrador",
    foto: "https://picsum.photos/seed/nueva/400/260",
  };
  propiedades.push(nueva);
  return nueva;
}

// PUT /properties/:id
export function editarPropiedad(id: number, datos: DatosPropiedad): MiPropiedad {
  const i = propiedades.findIndex((p) => p.id === id);
  propiedades[i] = { ...propiedades[i], ...datos };
  return propiedades[i];
}

export function listarSolicitudes(propiedadId?: number): SolicitudVisita[] {
  return propiedadId === undefined ? solicitudes : solicitudes.filter((s) => s.propiedadId === propiedadId);
}

export function listarConsultas(propiedadId?: number): ConsultaRecibida[] {
  return propiedadId === undefined ? consultas : consultas.filter((c) => c.propiedadId === propiedadId);
}
