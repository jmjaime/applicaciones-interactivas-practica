// 4.1 · CSS global vs. CSS Modules: dos componentes, dos archivos de CSS, la misma clase .titulo.
import type { RouteObject } from "react-router";
import Comparacion from "./Comparacion";

export const rutas: RouteObject[] = [{ path: "/", element: <Comparacion /> }];
