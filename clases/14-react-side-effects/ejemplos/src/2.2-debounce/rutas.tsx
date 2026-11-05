// 2.2 · Búsqueda contra la API: la query vive en la URL (Clase 13) y es la dependencia del effect.
// El cleanup hace dos cosas: cancela el timer si se siguió tipeando y aborta el request en vuelo.
import type { RouteObject } from "react-router";
import Busqueda from "./Busqueda";

export const rutas: RouteObject[] = [{ path: "*", element: <Busqueda /> }];

// 🔧 Probar:
//   1. Escribir "palermo" y mirar Network: un solo request.
//   2. Poner DEBOUNCE_MS en 0: un request por tecla, con los anteriores (canceled).
//   3. Recargar con ?q=palermo: la búsqueda sobrevive porque vive en la URL.
