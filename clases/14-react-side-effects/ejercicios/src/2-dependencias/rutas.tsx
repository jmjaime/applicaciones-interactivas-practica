// Ejercicio 2 · Filtros y detalle — ver README.md de esta carpeta.
import type { RouteObject } from "react-router";
import LayoutPanel from "../comun/LayoutPanel";
import NavegacionDetalle from "../comun/NavegacionDetalle";
import NoEncontrada from "../comun/NoEncontrada";
import Consultas from "./Consultas";
import DetallePropiedad from "./DetallePropiedad";
import MisPropiedades from "./MisPropiedades";
import SolicitudesVisita from "./SolicitudesVisita";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPanel />,
    children: [
      { index: true, element: <MisPropiedades /> },
      { path: "propiedades/:id", element: <><NavegacionDetalle /><DetallePropiedad /></> },
      { path: "visitas", element: <SolicitudesVisita /> },
      { path: "consultas", element: <Consultas /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
