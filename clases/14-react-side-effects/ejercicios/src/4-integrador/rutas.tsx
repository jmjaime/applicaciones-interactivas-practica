// Integrador · Panel conectado — ver README.md de esta carpeta.
import type { RouteObject } from "react-router";
import NavegacionDetalle from "../comun/NavegacionDetalle";
import NoEncontrada from "../comun/NoEncontrada";
import Consultas from "./Consultas";
import DetallePropiedad from "./DetallePropiedad";
import EditarPropiedad from "./EditarPropiedad";
import LayoutPanel from "./LayoutPanel";
import MisPropiedades from "./MisPropiedades";
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
      { path: "propiedades/:id", element: <><NavegacionDetalle /><DetallePropiedad /></> },
      { path: "propiedades/:id/editar", element: <EditarPropiedad /> },
      { path: "visitas", element: <SolicitudesVisita /> },
      { path: "consultas", element: <Consultas /> },
      { path: "reportes", element: <Reportes /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
