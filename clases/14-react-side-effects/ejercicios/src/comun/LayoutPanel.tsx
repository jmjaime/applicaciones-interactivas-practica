import { NavLink, Outlet } from "react-router";
import estilos from "./LayoutPanel.module.css";

function claseLink({ isActive }: { isActive: boolean }) {
  return isActive ? `${estilos.seccion} ${estilos.actual}` : estilos.seccion;
}

// El layout de la Clase 13. Reportes aparece recién en el Ejercicio 3.
export default function LayoutPanel({ conReportes = false }: { conReportes?: boolean }) {
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
        </NavLink>
        {conReportes && (
          <NavLink to="/reportes" className={claseLink}>
            Reportes
          </NavLink>
        )}
      </nav>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
