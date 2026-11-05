import { Link, useSearchParams } from "react-router";
import BadgeEstado from "../comun/BadgeEstado";
import { formatearPrecio } from "../formato";
import { ESTADOS, type MiPropiedad } from "../types";

export default function MisPropiedades() {
  const [searchParams, setSearchParams] = useSearchParams();
  const estado = searchParams.get("estado") ?? "";
  const texto = searchParams.get("q") ?? "";

  // TODO (1): las propiedades de la API, con sus estados de carga y de error.
  const propiedades: MiPropiedad[] = [];

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

  // TODO (1): mientras carga, un <p className="cargando">; si falló, un <p className="mensaje error">.

  return (
    <>
      <h1>Mis propiedades</h1>
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
