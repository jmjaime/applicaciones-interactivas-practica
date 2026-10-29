// 3.1 · La URL como estado: los filtros del listado viven en ?operacion=…&tipo=…&q=…
import type { RouteObject } from "react-router";
import Layout from "../comun/Layout";
import NoEncontrada from "../comun/NoEncontrada";
import Detalle from "./Detalle";
import Listado from "./Listado";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Listado /> },
      { path: "propiedades/:id", element: <Detalle /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
