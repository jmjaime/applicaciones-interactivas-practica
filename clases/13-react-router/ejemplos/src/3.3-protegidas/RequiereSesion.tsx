import { Navigate, Outlet, useLocation } from "react-router";
import { haySesion } from "./sesion";

// El "guardia": si no hay sesión, en vez de las hijas dibuja un <Navigate>,
// que redirige apenas se renderiza.
export default function RequiereSesion() {
  const location = useLocation();

  if (!haySesion()) {
    // replace: /panel no queda en el historial. state.desde: a dónde volver después del login.
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  return <Outlet />;
}
