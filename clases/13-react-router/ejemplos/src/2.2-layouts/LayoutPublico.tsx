import { Link, NavLink, Outlet } from "react-router";

// El "marco" del sitio público. Las páginas hijas se dibujan donde está <Outlet />.
export default function LayoutPublico() {
  return (
    <>
      <header className="header">
        <Link to="/" className="marca">
          🏠 Inmobi
        </Link>
        <nav>
          {/* NavLink = Link que sabe si está activo: agrega class="active" */}
          <NavLink to="/" end>
            Propiedades
          </NavLink>
          <NavLink to="/inmobiliarias">Inmobiliarias</NavLink>
        </nav>
      </header>
      <main className="contenido">
        <Outlet />
      </main>
      <footer className="contenido">
        <small>Inmobi · Clase 13</small>
      </footer>
    </>
  );
}
