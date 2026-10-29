// 2.2 · Layouts y rutas anidadas: el header y el footer se escriben una sola vez.
//
//   /                          LayoutPublico
//   ├─ (index)                 └─ <Outlet> = Listado
//   ├─ propiedades/:id            <Outlet> = DetallePropiedad
//   ├─ inmobiliarias              <Outlet> = Inmobiliarias
//   ├─ inmobiliarias/:id          <Outlet> = SitioVendedor       (otro layout, anidado)
//   │  ├─ (index)                            └─ <Outlet> = PropiedadesDeInmobiliaria
//   │  └─ resenas                               <Outlet> = Resenas
//   └─ *                          <Outlet> = NoEncontrada
import type { RouteObject } from "react-router";
import NoEncontrada from "../comun/NoEncontrada";
import DetallePropiedad from "./DetallePropiedad";
import Inmobiliarias from "./Inmobiliarias";
import LayoutPublico from "./LayoutPublico";
import Listado from "./Listado";
import PropiedadesDeInmobiliaria from "./PropiedadesDeInmobiliaria";
import Resenas from "./Resenas";
import SitioVendedor from "./SitioVendedor";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPublico />,
    children: [
      { index: true, element: <Listado /> }, // lo que se ve en "/" exacto
      { path: "propiedades/:id", element: <DetallePropiedad /> }, // paths relativos al padre: sin "/" adelante
      { path: "inmobiliarias", element: <Inmobiliarias /> },
      {
        path: "inmobiliarias/:id",
        element: <SitioVendedor />,
        children: [
          { index: true, element: <PropiedadesDeInmobiliaria /> },
          { path: "resenas", element: <Resenas /> },
        ],
      },
      { path: "*", element: <NoEncontrada /> }, // el 404 también queda adentro del layout
    ],
  },
];

// 🔧 Probar:
//   1. React DevTools → Components: al navegar, LayoutPublico no se desmonta; solo cambia lo de adentro del Outlet.
//   2. Sacar el <Outlet /> de LayoutPublico: se ve el header en todas las páginas, pero ningún contenido.
//   3. Sacar `end` del NavLink "Propiedades" en LayoutPublico: queda activo en todas las páginas (todas empiezan con "/").
//   4. Agregar una pestaña "Contacto" (inmobiliarias/:id/contacto) con el teléfono y el email.
