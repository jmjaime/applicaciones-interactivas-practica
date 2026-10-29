import { Link, useParams } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { propiedades } from "../datos";

export default function PropiedadesDeInmobiliaria() {
  // Una ruta hija también ve los parámetros de sus padres.
  const { id } = useParams();
  const suyas = propiedades.filter((p) => p.inmobiliariaId === Number(id));

  if (suyas.length === 0) return <p className="mensaje">Todavía no tiene propiedades publicadas.</p>;

  return (
    <div className="listado">
      {suyas.map((p) => (
        <Link key={p.id} to={`/propiedades/${p.id}`}>
          <CardPropiedad propiedad={p} />
        </Link>
      ))}
    </div>
  );
}
