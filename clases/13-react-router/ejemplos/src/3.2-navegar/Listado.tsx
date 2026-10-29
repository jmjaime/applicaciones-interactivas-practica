import { Link } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { propiedades } from "../datos";

export default function Listado() {
  return (
    <div className="listado">
      {propiedades.map((p) => (
        <Link key={p.id} to={`/propiedades/${p.id}`}>
          <CardPropiedad propiedad={p} />
        </Link>
      ))}
    </div>
  );
}
