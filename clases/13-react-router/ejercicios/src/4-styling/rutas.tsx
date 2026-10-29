// Ejercicio 4 · Styling del panel — ver README.md de esta carpeta.
// Las rutas del Ejercicio 3, resueltas: este ejercicio no toca rutas.
import type { RouteObject } from "react-router";
import Consultas from "./Consultas";
import DetallePropiedad from "./DetallePropiedad";
import LayoutPanel from "./LayoutPanel";
import MisPropiedades from "./MisPropiedades";
import NoEncontrada from "./NoEncontrada";
import NuevaPropiedad from "./NuevaPropiedad";
import Reportes from "./Reportes";
import SolicitudesVisita from "./SolicitudesVisita";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPanel />,
    children: [
      { index: true, element: <MisPropiedades /> },
      { path: "propiedades/nueva", element: <NuevaPropiedad /> },
      { path: "propiedades/:id", element: <DetallePropiedad /> },
      { path: "visitas", element: <SolicitudesVisita /> },
      { path: "consultas", element: <Consultas /> },
      { path: "reportes", element: <Reportes /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
