import { NavLink, Outlet } from "react-router";
import estilos from "./LayoutPanel.module.css";

function claseLink({ isActive }: { isActive: boolean }) {
  return isActive ? `${estilos.seccion} ${estilos.actual}` : estilos.seccion;
}

export default function LayoutPanel() {
  // TODO (5): la cantidad de consultas sin responder (listarConsultas) y la función para salir (cerrarSesion).

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
        <NavLink to="/reportes" className={claseLink}>
          Reportes
        </NavLink>
        {/* TODO (5): el contador de sin responder en "Consultas" (la clase .contador ya está) y un botón "Salir" */}
      </nav>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
