import type { ReactNode } from "react";
import { Link, NavLink, Outlet } from "react-router";

// El layout público del 2.2, compartido por los ejemplos 3.x y 4.x.
export default function Layout({ extra }: { extra?: ReactNode }) {
  return (
    <>
      <header className="header">
        <Link to="/" className="marca">
          🏠 Inmobi
        </Link>
        <nav>
          <NavLink to="/" end>
            Propiedades
          </NavLink>
          {extra}
        </nav>
      </header>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
