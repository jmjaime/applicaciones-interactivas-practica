import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import BadgeEstado from "../comun/BadgeEstado";
import { AGENCIA_ID, API_URL } from "../comun/api";
import { formatearPrecio } from "../formato";
import { ESTADOS, type MiPropiedad } from "../types";

const DEBOUNCE_MS = 400;

export default function MisPropiedades() {
  const [searchParams, setSearchParams] = useSearchParams();
  const estado = searchParams.get("estado") ?? "";
  const texto = searchParams.get("q") ?? "";
  const [propiedades, setPropiedades] = useState<MiPropiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setCargando(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (estado) params.set("estado", estado);
        if (texto) params.set("q", texto);
        const res = await fetch(`${API_URL}/agencies/${AGENCIA_ID}/properties?${params}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setPropiedades(await res.json());
        setCargando(false);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(e instanceof Error ? e.message : "Error desconocido");
        setCargando(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [estado, texto]);

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
          Todas
        </Link>
        {ESTADOS.map((e) => (
          <Link key={e} to={conEstado(e)} className={estado === e ? "chip activo" : "chip"}>
            {e}
          </Link>
        ))}
      </nav>
      <div className="filtros">
        <input type="search" placeholder="Buscar por título…" value={texto} onChange={(e) => buscar(e.target.value)} />
        {cargando && <span>Cargando…</span>}
      </div>
      {error && <p className="mensaje error">No se pudieron cargar las propiedades: {error}</p>}
      {!cargando && !error && propiedades.length === 0 && (
        <p className="mensaje">No hay propiedades con esos filtros.</p>
      )}
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
          <BadgeEstado estado={p.estado} />
        </article>
      ))}
    </>
  );
}
