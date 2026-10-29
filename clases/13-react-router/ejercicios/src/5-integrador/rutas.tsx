// Integrador · Panel con sesión y edición — ver README.md de esta carpeta.
// Las rutas de los Ejercicios 3 y 4, resueltas.
import type { RouteObject } from "react-router";
import Consultas from "./Consultas";
import DetallePropiedad from "./DetallePropiedad";
import LayoutPanel from "./LayoutPanel";
import MisPropiedades from "./MisPropiedades";
import NoEncontrada from "./NoEncontrada";
import NuevaPropiedad from "./NuevaPropiedad";
import Reportes from "./Reportes";
import SolicitudesVisita from "./SolicitudesVisita";

// TODO (5): /login afuera del panel, el panel detrás de RequiereSesion, y la ruta de edición.
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
