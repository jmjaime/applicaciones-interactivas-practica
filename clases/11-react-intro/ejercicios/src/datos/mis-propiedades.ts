import type { MiPropiedad } from "../types";

// Las propiedades de la inmobiliaria del Vendedor, como las devolvería
// GET /agencies/:id/properties de la API.
export const misPropiedades: MiPropiedad[] = [
  { id: 1, titulo: "Departamento luminoso con balcón", operacion: "Alquiler", precio: 650000, moneda: "ARS", estado: "Publicada", consultasSinResponder: 1, foto: "https://picsum.photos/seed/detalle1/200/130" },
  { id: 2, titulo: "Casa con jardín y pileta", operacion: "Venta", precio: 285000, moneda: "USD", estado: "Reservada", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop2/200/130" },
  { id: 3, titulo: "Monoambiente a estrenar", operacion: "Venta", precio: 79000, moneda: "USD", estado: "Pausada", consultasSinResponder: 2, foto: "https://picsum.photos/seed/prop3/200/130" },
  { id: 4, titulo: "Local a la calle sobre avenida", operacion: "Alquiler", precio: 1200000, moneda: "ARS", estado: "Borrador", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop4/200/130" },
  { id: 5, titulo: "PH reciclado con terraza propia", operacion: "Venta", precio: 165000, moneda: "USD", estado: "Vendida", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop5/200/130" },
  { id: 6, titulo: "Departamento 2 ambientes con cochera", operacion: "Alquiler", precio: 540000, moneda: "ARS", estado: "Publicada", consultasSinResponder: 3, foto: "https://picsum.photos/seed/prop6/200/130" },
  { id: 7, titulo: "Terreno en esquina", operacion: "Venta", precio: 120000, moneda: "USD", estado: "Cancelada", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop7/200/130" },
];
