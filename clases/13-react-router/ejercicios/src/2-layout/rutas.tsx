// Ejercicio 2 · Layout y detalle — ver README.md de esta carpeta.
// Las rutas del Ejercicio 1, resueltas.
import type { RouteObject } from "react-router";
import Consultas from "./Consultas";
import MisPropiedades from "./MisPropiedades";
import NoEncontrada from "./NoEncontrada";
import Reportes from "./Reportes";
import SolicitudesVisita from "./SolicitudesVisita";

// TODO (2): reorganizar como un layout (LayoutPanel) con rutas hijas, y sumar el detalle.
export const rutas: RouteObject[] = [
  { path: "/", element: <MisPropiedades /> },
  { path: "/visitas", element: <SolicitudesVisita /> },
  { path: "/consultas", element: <Consultas /> },
  { path: "/reportes", element: <Reportes /> },
  { path: "*", element: <NoEncontrada /> },
];
