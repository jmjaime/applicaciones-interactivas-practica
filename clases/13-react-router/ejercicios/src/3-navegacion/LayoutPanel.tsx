import { NavLink, Outlet } from "react-router";

export default function LayoutPanel() {
  return (
    <>
      <nav className="nav-panel">
        <strong>🏠 Mi inmobiliaria</strong>
        <NavLink to="/" end>
          Mis propiedades
        </NavLink>
        <NavLink to="/visitas">Visitas</NavLink>
        <NavLink to="/consultas">Consultas</NavLink>
        <NavLink to="/reportes">Reportes</NavLink>
      </nav>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
