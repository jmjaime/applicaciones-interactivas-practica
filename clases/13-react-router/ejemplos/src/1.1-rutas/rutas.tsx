// 1.1 · Primeras rutas: el "mapa" de la app, una URL → un componente.
// main.tsx le pasa este array a createBrowserRouter y monta <RouterProvider>.
import type { RouteObject } from "react-router";
import NoEncontrada from "../comun/NoEncontrada";
import ComoPublicar from "./ComoPublicar";
import Inicio from "./Inicio";
import Inmobiliarias from "./Inmobiliarias";

// Se ejecuta una vez por carga de la página: si vuelve a aparecer en la consola, hubo recarga completa.
console.log("🔄 1.1 · la app arrancó de cero");

export const rutas: RouteObject[] = [
  { path: "/", element: <Inicio /> },
  { path: "/inmobiliarias", element: <Inmobiliarias /> },
  { path: "/como-publicar", element: <ComoPublicar /> },
  { path: "*", element: <NoEncontrada /> }, // cualquier otra URL
];

// 🔧 Probar:
//   1. Navegar con los links del header mirando la consola y la pestaña Network:
//      "Propiedades" e "Inmobiliarias" (<Link>) no recargan; "Cómo publicar" (<a>) sí.
//   2. Escribir a mano /1.1/cualquier-cosa en la barra de direcciones → 404.
//   3. Sacar la ruta "*": la URL inexistente muestra la pantalla de error por defecto del router.
//   4. Agregar una ruta /contacto con su página y su link en el header.
