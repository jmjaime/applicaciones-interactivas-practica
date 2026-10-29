import { Link } from "react-router";

// La NavPanel del Ejercicio 1, resuelta. TODO (2): reemplazarla por LayoutPanel.
export default function NavPanel() {
  return (
    <nav className="nav-panel">
      <strong>🏠 Mi inmobiliaria</strong>
      <Link to="/">Mis propiedades</Link>
      <Link to="/visitas">Visitas</Link>
      <Link to="/consultas">Consultas</Link>
      <Link to="/reportes">Reportes</Link>
    </nav>
  );
}
