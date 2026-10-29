import { Link } from "react-router";

// Sin layout todavía (eso es el 2.2): cada página dibuja su propio Header.
export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="marca">
        🏠 Inmobi
      </Link>
      <nav>
        <Link to="/">Propiedades</Link>
        <Link to="/inmobiliarias">Inmobiliarias</Link>
        {/* ❌ <a> a propósito: el navegador pide la página de nuevo y la app arranca de cero */}
        <a href="/1.1/como-publicar">Cómo publicar</a>
      </nav>
    </header>
  );
}
