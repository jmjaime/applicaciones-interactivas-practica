import type { ConsultaRecibida } from "../types";

// Las consultas recibidas en las propiedades de la inmobiliaria, como las
// devolvería GET /agencies/:id/comments de la API.
export const consultas: ConsultaRecibida[] = [
  { id: 1, propiedad: "Departamento 2 ambientes con cochera", autor: "Ana", fecha: "2026-10-21T10:22", texto: "¿Admite mascotas?", respuesta: null },
  { id: 2, propiedad: "Casa con jardín y pileta", autor: "Luis", fecha: "2026-10-20T18:05", texto: "¿Tiene garage?", respuesta: "Sí, cochera para dos autos." },
  { id: 3, propiedad: "Departamento luminoso con balcón", autor: "Carla", fecha: "2026-10-20T09:40", texto: "¿Las expensas están incluidas en el precio?", respuesta: null },
  { id: 4, propiedad: "Monoambiente a estrenar", autor: "Martín", fecha: "2026-10-19T21:15", texto: "¿Se puede usar como consultorio?", respuesta: null },
  { id: 5, propiedad: "Departamento luminoso con balcón", autor: "Julieta", fecha: "2026-10-18T13:00", texto: "¿El balcón da a la calle?", respuesta: "Sí, al frente, con vista abierta." },
];
