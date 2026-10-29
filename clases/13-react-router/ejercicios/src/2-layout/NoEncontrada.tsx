import { Link } from "react-router";
import NavPanel from "./NavPanel";

export default function NoEncontrada() {
  return (
    <>
      <NavPanel />
      <main className="contenido">
        <div className="mensaje">
          <h1>404</h1>
          <p>Esta sección del panel no existe.</p>
          <Link to="/">Volver a Mis propiedades</Link>
        </div>
      </main>
    </>
  );
}
