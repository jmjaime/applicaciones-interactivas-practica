// Ejercicio 3 · Filtros en la URL y alta — ver README.md de esta carpeta.
// Las rutas del Ejercicio 2, resueltas.
import type { RouteObject } from "react-router";
import Consultas from "./Consultas";
import DetallePropiedad from "./DetallePropiedad";
import LayoutPanel from "./LayoutPanel";
import MisPropiedades from "./MisPropiedades";
import NoEncontrada from "./NoEncontrada";
import Reportes from "./Reportes";
import SolicitudesVisita from "./SolicitudesVisita";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPanel />,
    children: [
      { index: true, element: <MisPropiedades /> },
      { path: "propiedades/:id", element: <DetallePropiedad /> },
      // TODO (3): la ruta del alta, propiedades/nueva
      { path: "visitas", element: <SolicitudesVisita /> },
      { path: "consultas", element: <Consultas /> },
      { path: "reportes", element: <Reportes /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
