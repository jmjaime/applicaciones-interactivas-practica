import { NavLink, Outlet } from "react-router";
// TODO (4): pasar la nav a LayoutPanel.module.css (sin usar .nav-panel de estilos.css).

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
