// 4.2 · Estilos dinámicos: la clase o el estilo dependen de props, estado o la ruta activa.
import type { RouteObject } from "react-router";
import NoEncontrada from "../comun/NoEncontrada";
import Inmobiliarias from "./Inmobiliarias";
import LayoutTienda from "./LayoutTienda";
import Propiedades from "./Propiedades";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <LayoutTienda />,
    children: [
      { index: true, element: <Propiedades /> },
      { path: "inmobiliarias", element: <Inmobiliarias /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
