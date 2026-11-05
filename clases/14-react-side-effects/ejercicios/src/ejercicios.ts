import type { RouteObject } from "react-router";

type Ejercicio = {
  id: string;
  carpeta: string;
  titulo: string;
  // import() perezoso: solo se carga la carpeta elegida.
  cargar: () => Promise<{ rutas: RouteObject[] }>;
};

export const EJERCICIOS: Ejercicio[] = [
  { id: "1", carpeta: "1-fetch", titulo: "1 · El panel desde la API", cargar: () => import("./1-fetch/rutas") },
  { id: "2", carpeta: "2-dependencias", titulo: "2 · Filtros y detalle", cargar: () => import("./2-dependencias/rutas") },
  { id: "3", carpeta: "3-acciones", titulo: "3 · Effects que sobran y alta", cargar: () => import("./3-acciones/rutas") },
  { id: "4", carpeta: "4-integrador", titulo: "Integrador · Panel conectado", cargar: () => import("./4-integrador/rutas") },
];
