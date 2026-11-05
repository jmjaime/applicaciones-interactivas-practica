// 1.2 · El mismo listado con useEffect: un solo request y los tres estados de una carga.
import type { RouteObject } from "react-router";
import Listado from "./Listado";

export const rutas: RouteObject[] = [{ path: "*", element: <Listado /> }];

// 🔧 Probar:
//   1. DevTools → Network: dos GET /properties. Es StrictMode, que en desarrollo monta dos veces;
//      sacarlo de main.tsx deja uno solo. En producción (npm run build) siempre es uno.
//   2. DevTools → Network → Offline y recargar: se ve el mensaje de error.
//   3. Cambiar la URL por /propiedades: fetch NO falla con un 404. Comentar el if (!res.ok) y ver qué pasa.
//   4. Sacar el [] del useEffect: vuelve el bucle del 1.1, ahora sin tope. Cerrar la pestaña rápido.
