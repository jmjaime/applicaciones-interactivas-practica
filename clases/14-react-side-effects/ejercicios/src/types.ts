// Los tipos del panel del Vendedor: los de la Clase 13, tal como los devuelve la API.

export type TipoPropiedad = "Casa" | "Departamento" | "Terreno" | "Local";
export type Operacion = "Venta" | "Alquiler";
export type Moneda = "ARS" | "USD";

export type EstadoPropiedad =
  | "Borrador"
  | "Publicada"
  | "Pausada"
  | "Reservada"
  | "Vendida"
  | "Alquilada"
  | "Cancelada";

// Los mismos estados, como array para recorrerlos (el type no existe en runtime).
export const ESTADOS: EstadoPropiedad[] = [
  "Borrador",
  "Publicada",
  "Pausada",
  "Reservada",
  "Vendida",
  "Alquilada",
  "Cancelada",
];

// Lo que recibe la API al crear o editar una propiedad.
export type DatosPropiedad = {
  titulo: string;
  tipo: TipoPropiedad;
  operacion: Operacion;
  precio: number;
  moneda: Moneda;
  ambientes: number | null; // opcional; null en terrenos
  superficieCubierta: number | null; // null en terrenos
  superficieTotal: number;
};

export type MiPropiedad = DatosPropiedad & {
  id: number;
  estado: EstadoPropiedad;
  foto: string;
};

export type EstadoSolicitud = "Pendiente" | "Confirmada" | "Rechazada";

export type SolicitudVisita = {
  id: number;
  propiedadId: number;
  propiedadTitulo: string;
  nombre: string;
  telefono: string;
  fecha: string; // ISO con hora: "2026-10-31T15:00"
  estado: EstadoSolicitud;
};

export type ConsultaRecibida = {
  id: number;
  propiedadId: number;
  propiedadTitulo: string;
  autor: string;
  fecha: string; // ISO con hora
  texto: string;
  respuesta: string | null; // null: todavía sin responder
};
