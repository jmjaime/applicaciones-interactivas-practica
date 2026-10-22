// Ejercicio 1 · Solicitudes de visita
export type EstadoSolicitud = "Pendiente" | "Confirmada" | "Rechazada";

export type SolicitudVisita = {
  id: number;
  propiedad: string; // título de la propiedad
  nombre: string;
  telefono: string;
  fecha: string; // ISO con hora: "2026-10-25T15:00"
  mensaje: string | null;
  estado: EstadoSolicitud;
};

// Ejercicio 2 · Bandeja de consultas
export type ConsultaRecibida = {
  id: number;
  propiedad: string; // título de la propiedad
  autor: string;
  fecha: string; // ISO con hora
  texto: string;
  respuesta: string | null; // null: todavía sin responder
};

// Ejercicios 3, 4 y 5 · Propiedades
export type TipoPropiedad = "Casa" | "Departamento" | "Terreno" | "Local";
export const TIPOS: TipoPropiedad[] = ["Casa", "Departamento", "Terreno", "Local"];

export type Operacion = "Venta" | "Alquiler";
export type Moneda = "ARS" | "USD";

// Lo que carga el formulario de "Publicar propiedad", ya convertido a números.
export type NuevaPropiedad = {
  titulo: string;
  tipo: TipoPropiedad;
  operacion: Operacion;
  precio: number;
  moneda: Moneda;
  ambientes: number | null; // opcional; null en terrenos
  superficieCubierta: number | null; // null en terrenos
  superficieTotal: number;
};

// Ejercicio 5 · Integrador
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

export type MiPropiedad = NuevaPropiedad & {
  id: number;
  estado: EstadoPropiedad;
  consultasSinResponder: number;
  foto: string;
};
