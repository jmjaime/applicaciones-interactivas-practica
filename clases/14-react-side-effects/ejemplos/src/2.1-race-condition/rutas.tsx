// 2.1 · El effect depende de :id. La propiedad 1 tarda 3 s y las demás medio segundo:
// sin cancelar, la respuesta vieja pisa a la nueva.
import type { RouteObject } from "react-router";
import NoEncontrada from "../comun/NoEncontrada";
import DetalleConAbort from "./DetalleConAbort";
import DetalleConRace from "./DetalleConRace";
import Layout from "./Layout";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <p className="nota">Elegir una propiedad: primero la 1 y enseguida la 2.</p> },
      { path: "con-race/:id", element: <DetalleConRace /> },
      { path: "con-abort/:id", element: <DetalleConAbort /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
];

// 🔧 Probar:
//   1. "Con race": 1 y enseguida 2. A los 3 s la URL dice 2 y la pantalla muestra la 1.
//   2. "Con abort": lo mismo. En Network, el primer request queda (canceled).
//   3. Quitar `id` de las dependencias: al navegar entre propiedades, la pantalla no cambia.
//   4. Entrar a /2.1/con-abort/99: la API responde 404 y la página lo contempla.
