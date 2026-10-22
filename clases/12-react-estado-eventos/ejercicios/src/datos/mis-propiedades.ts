import type { MiPropiedad } from "../types";

// Las propiedades de la inmobiliaria del Vendedor, como las devolvería
// GET /agencies/:id/properties de la API.
export const misPropiedades: MiPropiedad[] = [
  { id: 1, titulo: "Departamento luminoso con balcón", tipo: "Departamento", operacion: "Alquiler", precio: 650000, moneda: "ARS", ambientes: 3, superficieCubierta: 68, superficieTotal: 74, estado: "Publicada", consultasSinResponder: 1, foto: "https://picsum.photos/seed/detalle1/200/130" },
  { id: 2, titulo: "Casa con jardín y pileta", tipo: "Casa", operacion: "Venta", precio: 285000, moneda: "USD", ambientes: 5, superficieCubierta: 210, superficieTotal: 450, estado: "Reservada", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop2/200/130" },
  { id: 3, titulo: "Monoambiente a estrenar", tipo: "Departamento", operacion: "Venta", precio: 79000, moneda: "USD", ambientes: 1, superficieCubierta: 32, superficieTotal: 32, estado: "Pausada", consultasSinResponder: 2, foto: "https://picsum.photos/seed/prop3/200/130" },
  { id: 4, titulo: "Local a la calle sobre avenida", tipo: "Local", operacion: "Alquiler", precio: 1200000, moneda: "ARS", ambientes: null, superficieCubierta: 95, superficieTotal: 110, estado: "Borrador", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop4/200/130" },
  { id: 5, titulo: "PH reciclado con terraza propia", tipo: "Casa", operacion: "Venta", precio: 165000, moneda: "USD", ambientes: 4, superficieCubierta: 120, superficieTotal: 160, estado: "Vendida", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop5/200/130" },
  { id: 6, titulo: "Departamento 2 ambientes con cochera", tipo: "Departamento", operacion: "Alquiler", precio: 540000, moneda: "ARS", ambientes: 2, superficieCubierta: 45, superficieTotal: 48, estado: "Publicada", consultasSinResponder: 3, foto: "https://picsum.photos/seed/prop6/200/130" },
  { id: 7, titulo: "Terreno en esquina", tipo: "Terreno", operacion: "Venta", precio: 120000, moneda: "USD", ambientes: null, superficieCubierta: null, superficieTotal: 300, estado: "Cancelada", consultasSinResponder: 0, foto: "https://picsum.photos/seed/prop7/200/130" },
];
