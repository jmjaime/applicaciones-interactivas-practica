import { NavLink, Outlet } from "react-router";
import estilos from "../comun/LayoutPanel.module.css";

function claseLink({ isActive }: { isActive: boolean }) {
  return isActive ? `${estilos.seccion} ${estilos.actual}` : estilos.seccion;
}

export default function LayoutPanel() {
  // TODO (integrador): la cantidad de consultas sin responder, actualizada cada 5 segundos.

  return (
    <>
      <nav className={estilos.nav}>
        <strong className={estilos.marca}>🏠 Mi inmobiliaria</strong>
        <NavLink to="/" end className={claseLink}>
          Mis propiedades
        </NavLink>
        <NavLink to="/visitas" className={claseLink}>
          Visitas
        </NavLink>
        <NavLink to="/consultas" className={claseLink}>
          Consultas
          {/* TODO (integrador): el contador (estilos.contador); si es 0, no se muestra nada */}
        </NavLink>
        <NavLink to="/reportes" className={claseLink}>
          Reportes
        </NavLink>
      </nav>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
