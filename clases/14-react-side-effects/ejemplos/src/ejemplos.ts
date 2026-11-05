import type { RouteObject } from "react-router";

type Ejemplo = {
  id: string;
  bloque: string;
  titulo: string;
  // import() perezoso: solo se carga el código del ejemplo elegido.
  // Así, el bucle del 1.1 no arranca hasta que se entra a /1.1/.
  cargar: () => Promise<{ rutas: RouteObject[] }>;
};

export const EJEMPLOS: Ejemplo[] = [
  { id: "1.1", bloque: "1 · useEffect y el primer fetch", titulo: "Fetch en el render: el bucle", cargar: () => import("./1.1-bucle/rutas") },
  { id: "1.2", bloque: "1 · useEffect y el primer fetch", titulo: "Listado con useEffect", cargar: () => import("./1.2-listado/rutas") },
  { id: "1.3", bloque: "1 · useEffect y el primer fetch", titulo: "Effects sin red: título, foco y dependencias", cargar: () => import("./1.3-sincronizar/rutas") },
  { id: "2.1", bloque: "2 · Dependencias y cleanup", titulo: "Detalle: race condition y AbortController", cargar: () => import("./2.1-race-condition/rutas") },
  { id: "2.2", bloque: "2 · Dependencias y cleanup", titulo: "Búsqueda con debounce", cargar: () => import("./2.2-debounce/rutas") },
  { id: "2.3", bloque: "2 · Dependencias y cleanup", titulo: "Carrusel: intervalo y listener", cargar: () => import("./2.3-carrusel/rutas") },
  { id: "3.1", bloque: "3 · Cuándo no usar un effect y cómo escribir datos", titulo: "Effects que sobran", cargar: () => import("./3.1-effects-que-sobran/rutas") },
  { id: "3.2", bloque: "3 · Cuándo no usar un effect y cómo escribir datos", titulo: "Pedir visita con useActionState", cargar: () => import("./3.2-action-state/rutas") },
];
