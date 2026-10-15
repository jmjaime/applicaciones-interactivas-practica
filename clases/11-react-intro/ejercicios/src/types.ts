export type Inmobiliaria = {
  nombre: string;
  telefono: string;
  email: string;
  calificacion: number; // promedio de reseñas, de 1 a 5
  cantidadResenas: number;
};

export type Consulta = {
  id: number;
  autor: string;
  fecha: string; // ISO: "2026-10-02"
  texto: string;
  respuesta: string | null; // null: todavía sin responder
};

export type PropiedadDetalle = {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  operacion: string; // "Venta" | "Alquiler"
  precio: number;
  moneda: string;
  barrio: string;
  ambientes: number | null; // null en locales y terrenos
  superficieCubierta: number | null; // null en terrenos
  superficieTotal: number;
  tags: string[];
  fotos: string[]; // la primera es la portada
  interesados: number;
  inmobiliaria: Inmobiliaria;
  consultas: Consulta[];
};

// Integrador
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

export type MiPropiedad = {
  id: number;
  titulo: string;
  operacion: "Venta" | "Alquiler";
  precio: number;
  moneda: string;
  estado: EstadoPropiedad;
  consultasSinResponder: number;
  foto: string;
};
