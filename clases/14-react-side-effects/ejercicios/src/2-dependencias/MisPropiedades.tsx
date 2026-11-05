import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import BadgeEstado from "../comun/BadgeEstado";
import { AGENCIA_ID, API_URL } from "../comun/api";
import { formatearPrecio } from "../formato";
import { ESTADOS, type MiPropiedad } from "../types";

export default function MisPropiedades() {
  const [searchParams, setSearchParams] = useSearchParams();
  const estado = searchParams.get("estado") ?? "";
  const texto = searchParams.get("q") ?? "";
  const [propiedades, setPropiedades] = useState<MiPropiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO (2): que los filtros los resuelva la API (?estado=…&q=…), con debounce en la búsqueda
  // y cancelando lo que quedó en curso. Hoy se trae todo una sola vez y se filtra acá abajo.
  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_URL}/agencies/${AGENCIA_ID}/properties`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setPropiedades(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

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

  if (cargando) return <p className="cargando">Cargando propiedades…</p>;
  if (error) return <p className="mensaje error">No se pudieron cargar las propiedades: {error}</p>;

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
