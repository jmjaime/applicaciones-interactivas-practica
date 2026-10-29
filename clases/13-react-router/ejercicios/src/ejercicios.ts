import type { RouteObject } from "react-router";

type Ejercicio = {
  id: string;
  carpeta: string;
  titulo: string;
  // import() perezoso: solo se carga la carpeta elegida (y su CSS).
  cargar: () => Promise<{ rutas: RouteObject[] }>;
};

export const EJERCICIOS: Ejercicio[] = [
  { id: "1", carpeta: "1-rutas", titulo: "1 · Rutas del panel", cargar: () => import("./1-rutas/rutas") },
  { id: "2", carpeta: "2-layout", titulo: "2 · Layout y detalle", cargar: () => import("./2-layout/rutas") },
  { id: "3", carpeta: "3-navegacion", titulo: "3 · Filtros en la URL y alta", cargar: () => import("./3-navegacion/rutas") },
  { id: "4", carpeta: "4-styling", titulo: "4 · Styling del panel", cargar: () => import("./4-styling/rutas") },
  { id: "5", carpeta: "5-integrador", titulo: "Integrador · Panel con sesión y edición", cargar: () => import("./5-integrador/rutas") },
];
