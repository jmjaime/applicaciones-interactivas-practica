// 2.3 · Cleanup sin red: un intervalo y un listener que hay que soltar al desmontar.
import type { RouteObject } from "react-router";
import Pagina from "./Pagina";

export const rutas: RouteObject[] = [{ path: "*", element: <Pagina /> }];

// 🔧 Probar:
//   1. Con la consola abierta, ocultar el carrusel: los "tick" se cortan.
//   2. Comentar el clearInterval y ocultar el carrusel: los "tick" siguen, aunque el componente ya no exista.
//   3. Comentar el removeEventListener: una flecha avanza dos fotos, porque StrictMode montó dos veces y quedó un listener de más.
//   4. Agregar un botón "Pausar": un estado `pausado` como dependencia del effect del intervalo.
