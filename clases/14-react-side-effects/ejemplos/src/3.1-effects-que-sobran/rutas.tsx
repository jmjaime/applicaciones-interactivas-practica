// 3.1 · La misma pantalla dos veces: con tres effects que sobran y sin ninguno de ellos.
import type { RouteObject } from "react-router";
import Comparacion from "./Comparacion";

export const rutas: RouteObject[] = [{ path: "*", element: <Comparacion /> }];

// 🔧 Probar:
//   1. Abrir la consola y cambiar el filtro: "Con effects" renderiza de más.
//   2. Escribir una nota y elegir otra propiedad en cada columna: las dos la limpian.
//      En "Con effects" se llega a ver un render con la nota vieja; en "Sin effects", la key evita ese paso.
//   3. En "Sin effects", sacar la key de <Nota>: la nota queda escrita al cambiar de propiedad.
