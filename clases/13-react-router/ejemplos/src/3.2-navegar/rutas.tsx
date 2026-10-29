// 3.2 · Navegación programática: después de pedir la visita, el código decide a dónde ir.
import type { RouteObject } from "react-router";
import Layout from "../comun/Layout";
import NoEncontrada from "../comun/NoEncontrada";
import Detalle from "./Detalle";
import Listado from "./Listado";
import PedirVisita from "./PedirVisita";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Listado /> },
      { path: "propiedades/:id", element: <Detalle /> },
      { path: "propiedades/:id/visita", element: <PedirVisita /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];
