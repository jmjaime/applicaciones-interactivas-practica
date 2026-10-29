// 2.1 · Parámetros: una sola ruta para todos los detalles. ":id" es un segmento variable
// que la página lee con useParams().
import type { RouteObject } from "react-router";
import NoEncontrada from "../comun/NoEncontrada";
import DetallePropiedad from "./DetallePropiedad";
import Listado from "./Listado";
import SitioVendedor from "./SitioVendedor";

export const rutas: RouteObject[] = [
  { path: "/", element: <Listado /> },
  { path: "/propiedades/:id", element: <DetallePropiedad /> },
  { path: "/inmobiliarias/:id", element: <SitioVendedor /> },
  { path: "*", element: <NoEncontrada /> },
];

// 🔧 Probar:
//   1. Escribir a mano /2.1/propiedades/99 y /2.1/propiedades/abc: ¿qué devuelve useParams() en cada caso?
//   2. Desde el detalle, ir al sitio de la inmobiliaria y de ahí a otra propiedad: el mismo
//      componente DetallePropiedad con otro :id.
//   3. Agregar una ruta /barrios/:barrio que liste las propiedades de ese barrio, con un link
//      desde el detalle. useParams() devuelve el valor ya decodificado ("Villa%20Devoto" → "Villa Devoto").
