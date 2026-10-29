import { Link } from "react-router";
import { listarPropiedades } from "../datos/repositorio";
import { formatearPrecio } from "../formato";

// Ejercicio 3 · ver README.md de esta carpeta.
export default function MisPropiedades() {
  const propiedades = listarPropiedades();
  // TODO (3): filtrar por estado (chips) y por texto (buscador) con ?estado=…&q=… en la URL.

  return (
    <>
      {/* TODO (3): un link "+ Nueva propiedad" a la página del alta */}
      <h1>Mis propiedades</h1>
      {propiedades.map((p) => (
        <article key={p.id} className="fila">
          <img src={p.foto} alt="" />
          <div>
            <h2>
              <Link to={`/propiedades/${p.id}`}>{p.titulo}</Link>
            </h2>
            <p>
              {p.tipo} en {p.operacion.toLowerCase()} · {formatearPrecio(p.precio, p.moneda)}
            </p>
          </div>
          <span className={`estado estado-${p.estado.toLowerCase()}`}>{p.estado}</span>
        </article>
      ))}
    </>
  );
}
