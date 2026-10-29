// Ejercicio 1 · Rutas del panel — ver README.md de esta carpeta.
import type { RouteObject } from "react-router";
import MisPropiedades from "./MisPropiedades";

export const rutas: RouteObject[] = [
  { path: "/", element: <MisPropiedades /> },
  // TODO (1): una ruta por sección del panel (visitas, consultas, reportes) y el 404.
];
