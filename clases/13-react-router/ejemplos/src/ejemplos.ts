import type { RouteObject } from "react-router";

type Ejemplo = {
  id: string;
  bloque: string;
  titulo: string;
  // import() perezoso: solo se carga el código (y el CSS) del ejemplo elegido,
  // así los estilos globales de uno no se cuelan en los demás.
  cargar: () => Promise<{ rutas: RouteObject[] }>;
};

export const EJEMPLOS: Ejemplo[] = [
  { id: "1.1", bloque: "1 · Rutas y navegación", titulo: "Primeras rutas", cargar: () => import("./1.1-rutas/rutas") },
  { id: "2.1", bloque: "2 · Parámetros y layouts", titulo: "Detalle con :id", cargar: () => import("./2.1-parametros/rutas") },
  { id: "2.2", bloque: "2 · Parámetros y layouts", titulo: "Layouts y rutas anidadas", cargar: () => import("./2.2-layouts/rutas") },
  { id: "3.1", bloque: "3 · La URL como estado", titulo: "Filtros en la URL", cargar: () => import("./3.1-search-params/rutas") },
  { id: "3.2", bloque: "3 · La URL como estado", titulo: "Pedir visita y redirigir", cargar: () => import("./3.2-navegar/rutas") },
  { id: "3.3", bloque: "3 · La URL como estado", titulo: "Panel protegido", cargar: () => import("./3.3-protegidas/rutas") },
  { id: "4.1", bloque: "4 · Styling", titulo: "CSS global vs. CSS Modules", cargar: () => import("./4.1-css-modules/rutas") },
  { id: "4.2", bloque: "4 · Styling", titulo: "Estilos dinámicos", cargar: () => import("./4.2-dinamicos/rutas") },
];
