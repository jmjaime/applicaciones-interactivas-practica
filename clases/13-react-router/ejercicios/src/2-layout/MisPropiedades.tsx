import { listarPropiedades } from "../datos/repositorio";
import { formatearPrecio } from "../formato";
import NavPanel from "./NavPanel";

export default function MisPropiedades() {
  const propiedades = listarPropiedades();

  return (
    <>
      <NavPanel />
      <main className="contenido">
        <h1>Mis propiedades</h1>
        {propiedades.map((p) => (
          <article key={p.id} className="fila">
            <img src={p.foto} alt="" />
            <div>
              {/* TODO (2): el título lleva al detalle de la propiedad */}
              <h2>{p.titulo}</h2>
              <p>
                {p.tipo} en {p.operacion.toLowerCase()} · {formatearPrecio(p.precio, p.moneda)}
              </p>
            </div>
            <span className={`estado estado-${p.estado.toLowerCase()}`}>{p.estado}</span>
          </article>
        ))}
      </main>
    </>
  );
}
