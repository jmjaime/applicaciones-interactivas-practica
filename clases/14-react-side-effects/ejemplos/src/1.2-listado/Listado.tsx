import { useEffect, useState } from "react";
import CardPropiedad from "../comun/CardPropiedad";
import { API_URL } from "../comun/api";
import type { Propiedad } from "../types";

export default function Listado() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // La función del effect no puede ser async (solo puede devolver un cleanup): va una adentro.
    async function cargar() {
      try {
        const res = await fetch(`${API_URL}/properties`);
        // fetch solo rechaza si no hubo respuesta: un 404 o un 500 hay que chequearlos a mano.
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

  if (cargando) return <p className="cargando">Cargando propiedades…</p>;
  if (error) return <p className="mensaje error">No se pudieron cargar las propiedades: {error}</p>;

  return (
    <main className="contenido">
      <h1>Propiedades</h1>
      {propiedades.length === 0 && <p className="mensaje">Todavía no hay propiedades publicadas.</p>}
      <div className="listado">
        {propiedades.map((p) => (
          <CardPropiedad key={p.id} propiedad={p} />
        ))}
      </div>
    </main>
  );
}
