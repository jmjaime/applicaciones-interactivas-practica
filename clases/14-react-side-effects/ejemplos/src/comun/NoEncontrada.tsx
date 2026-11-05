import { Link } from "react-router";

// La página del path "*": cualquier URL que no matchee otra ruta.
export default function NoEncontrada() {
  return (
    <main className="contenido mensaje">
      <h1>404</h1>
      <p>Esta página no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}
