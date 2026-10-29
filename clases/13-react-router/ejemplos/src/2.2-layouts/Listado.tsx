import { Link } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { propiedades } from "../datos";

// Ya no dibuja el Header: lo pone el layout.
export default function Listado() {
  return (
    <>
      <h1>Propiedades</h1>
      <div className="listado">
        {propiedades.map((p) => (
          <Link key={p.id} to={`/propiedades/${p.id}`}>
            <CardPropiedad propiedad={p} />
          </Link>
        ))}
      </div>
    </>
  );
}
