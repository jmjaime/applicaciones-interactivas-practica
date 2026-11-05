// 1.1 · Lo que NO hay que hacer: fetch en el cuerpo del componente.
import type { RouteObject } from "react-router";
import Listado from "./Listado";

export const rutas: RouteObject[] = [{ path: "*", element: <Listado /> }];

// 🔧 Probar:
//   1. Antes de abrir la página, predecir cuántos requests aparecen en DevTools → Network.
//   2. Mirar la terminal: la API registra cada GET /properties.
//   3. Subir TOPE a 100 y recargar: el bucle sigue hasta llegar al tope.
