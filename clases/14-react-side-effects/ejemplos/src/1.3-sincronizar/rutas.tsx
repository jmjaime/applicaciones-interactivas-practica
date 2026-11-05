// 1.3 · Un effect no es solo fetch: sincroniza el componente con algo de afuera de React.
import type { RouteObject } from "react-router";
import Buscador from "./Buscador";

export const rutas: RouteObject[] = [{ path: "*", element: <Buscador /> }];

// 🔧 Probar:
//   1. Con la consola abierta, predecir qué logs salen al escribir y qué logs al tocar el contador.
//   2. Quitar `texto` de las dependencias del título: el linter avisa y la pestaña deja de actualizarse.
//   3. Recargar: el foco ya está en el input. Es lo que en la Clase 12 no se podía resolver en un handler.
