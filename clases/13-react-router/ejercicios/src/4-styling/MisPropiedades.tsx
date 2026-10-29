import { Link, useSearchParams } from "react-router";
import { listarPropiedades } from "../datos/repositorio";
import { formatearPrecio } from "../formato";
import { ESTADOS } from "../types";
import BadgeEstado from "./BadgeEstado";

export default function MisPropiedades() {
  const [searchParams, setSearchParams] = useSearchParams();
  const estado = searchParams.get("estado") ?? "";
  const texto = searchParams.get("q") ?? "";
  const propiedades = listarPropiedades();

  // El destino de cada chip: los parámetros actuales (incluida la búsqueda), con otro estado.
  function conEstado(nuevo: string) {
    const params = new URLSearchParams(searchParams);
    if (nuevo) params.set("estado", nuevo);
    else params.delete("estado");
    return `?${params}`;
  }

  function buscar(valor: string) {
    const params = new URLSearchParams(searchParams);
    if (valor) params.set("q", valor);
    else params.delete("q");
    setSearchParams(params, { replace: true });
  }

  const visibles = propiedades.filter(
    (p) => (!estado || p.estado === estado) && p.titulo.toLowerCase().includes(texto.toLowerCase()),
  );

  return (
    <>
      <div className="titulo-con-accion">
        <h1>Mis propiedades</h1>
        <Link to="/propiedades/nueva" className="boton primario">
          + Nueva propiedad
        </Link>
      </div>
      <nav className="chips">
        <Link to={conEstado("")} className={estado === "" ? "chip activo" : "chip"}>
          Todas ({propiedades.length})
        </Link>
        {ESTADOS.map((e) => (
          <Link key={e} to={conEstado(e)} className={estado === e ? "chip activo" : "chip"}>
            {e} ({propiedades.filter((p) => p.estado === e).length})
          </Link>
        ))}
      </nav>
      <div className="filtros">
        <input type="search" placeholder="Buscar por título…" value={texto} onChange={(e) => buscar(e.target.value)} />
      </div>
      {visibles.length === 0 && <p className="mensaje">No hay propiedades con esos filtros.</p>}
      {visibles.map((p) => (
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
          <BadgeEstado estado={p.estado} />
        </article>
      ))}
    </>
  );
}
