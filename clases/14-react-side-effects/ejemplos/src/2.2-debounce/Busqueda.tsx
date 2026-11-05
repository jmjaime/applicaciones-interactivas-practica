import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { API_URL } from "../comun/api";
import type { Propiedad } from "../types";

const DEBOUNCE_MS = 400;

export default function Busqueda() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setCargando(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/properties?q=${encodeURIComponent(q)}`, { signal: controller.signal });
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
  }, [q]);

  return (
    <main className="contenido">
      <h1>Buscar propiedades</h1>
      <div className="filtros">
        <input
          type="search"
          placeholder="Barrio o título…"
          value={q}
          onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        />
        {cargando && <span>Buscando…</span>}
      </div>
      {error && <p className="mensaje error">{error}</p>}
      {!cargando && !error && propiedades.length === 0 && <p className="mensaje">Sin resultados para “{q}”.</p>}
      <div className="listado">
        {propiedades.map((p) => (
          <CardPropiedad key={p.id} propiedad={p} />
        ))}
      </div>
    </main>
  );
}
