import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <div className="mensaje">
      <h1>404</h1>
      <p>Esta sección del panel no existe.</p>
      <Link to="/">Volver a Mis propiedades</Link>
    </div>
  );
}
