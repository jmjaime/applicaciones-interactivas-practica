import { Link } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { propiedades } from "../datos";
import Header from "./Header";

export default function Listado() {
  return (
    <>
      <Header />
      <main className="contenido">
        <h1>Propiedades</h1>
        <div className="listado">
          {propiedades.map((p) => (
            // La URL se arma con el id: cada card lleva a su propio detalle.
            <Link key={p.id} to={`/propiedades/${p.id}`}>
              <CardPropiedad propiedad={p} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
