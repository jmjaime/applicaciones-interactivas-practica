import { NavLink, Outlet, useNavigate } from "react-router";
import { cerrarSesion } from "./sesion";

export default function LayoutPanel() {
  const navigate = useNavigate();

  function salir() {
    cerrarSesion();
    navigate("/", { replace: true });
  }

  return (
    <>
      <header className="header panel-vendedor">
        <strong>🔑 Panel del vendedor</strong>
        <nav>
          <NavLink to="/panel" end>
            Mis propiedades
          </NavLink>
          <NavLink to="/panel/consultas">Consultas</NavLink>
          <button type="button" className="boton" onClick={salir}>
            Salir
          </button>
        </nav>
      </header>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
