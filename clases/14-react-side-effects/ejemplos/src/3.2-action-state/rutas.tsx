// 3.2 · Escribir datos: es por un evento (el submit), así que NO va en un effect.
// Form Actions + useActionState resuelven el pending y los errores del backend.
import type { RouteObject } from "react-router";
import PedirVisita from "./PedirVisita";

export const rutas: RouteObject[] = [{ path: "*", element: <PedirVisita /> }];

// 🔧 Probar:
//   1. Enviar vacío: los errores los valida la API (400), no el front. Mirarlos en Network → Response.
//   2. Enviar: el botón queda deshabilitado mientras dura el request (la API tarda 1 s).
//   3. Sacar los defaultValue y enviar con un error: React resetea el form al terminar la action y se borra lo cargado.
//   4. DevTools → Network → Offline y enviar: se ve el error general, sin perder lo cargado.
