// Ejercicio 1 · El panel desde la API — ver README.md de esta carpeta.
import type { RouteObject } from "react-router";
import LayoutPanel from "../comun/LayoutPanel";
import NoEncontrada from "../comun/NoEncontrada";
import Consultas from "./Consultas";
import DetallePendiente from "./DetallePendiente";
import MisPropiedades from "./MisPropiedades";
import SolicitudesVisita from "./SolicitudesVisita";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPanel />,
    children: [
      { index: true, element: <MisPropiedades /> },
      { path: "propiedades/:id", element: <DetallePendiente /> },
      { path: "visitas", element: <SolicitudesVisita /> },
      { path: "consultas", element: <Consultas /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
