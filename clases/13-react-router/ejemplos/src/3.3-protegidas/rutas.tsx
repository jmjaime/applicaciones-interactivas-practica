// 3.3 · Rutas protegidas: /panel y todo lo que cuelga de ahí exige sesión.
//
//   /                 Layout público  (Propiedades, Login)
//   /panel            RequiereSesion → sin token: <Navigate to="/login">
//   └─ LayoutPanel                      con token: <Outlet> = LayoutPanel → sus hijas
import { NavLink, type RouteObject } from "react-router";
import Layout from "../comun/Layout";
import NoEncontrada from "../comun/NoEncontrada";
import { ConsultasPanel, MisPropiedadesPanel } from "./PaginasPanel";
import LayoutPanel from "./LayoutPanel";
import Listado from "./Listado";
import Login from "./Login";
import RequiereSesion from "./RequiereSesion";

export const rutas: RouteObject[] = [
  {
    path: "/",
    element: <Layout extra={<NavLink to="/panel">Soy vendedor</NavLink>} />,
    children: [
      { index: true, element: <Listado /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NoEncontrada /> },
    ],
  },
  {
    // Ruta "de layout" sin path: no agrega nada a la URL, solo envuelve a sus hijas con el control.
    element: <RequiereSesion />,
    children: [
      {
        path: "/panel",
        element: <LayoutPanel />,
        children: [
          { index: true, element: <MisPropiedadesPanel /> },
          { path: "consultas", element: <ConsultasPanel /> },
        ],
      },
    ],
  },
];

// 🔧 Probar:
//   1. Sin sesión, escribir /3.3/panel/consultas: redirige a /login y, después de ingresar, vuelve a /panel/consultas.
//   2. Ya logueado, "Salir" y apretar Atrás: el panel no se vuelve a mostrar (vuelve a pedir login).
//   3. DevTools → Application → Local Storage: borrar "token" a mano y navegar dentro del panel.
//   4. Sacar `replace` del <Navigate>: después del login, Atrás vuelve a /panel… que redirige a /login otra vez.
