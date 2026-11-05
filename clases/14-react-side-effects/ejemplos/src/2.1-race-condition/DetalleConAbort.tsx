import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../comun/api";
import { formatearPrecio } from "../comun/formato";
import type { Propiedad } from "../types";

export default function DetalleConAbort() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/properties/${id}`, { signal: controller.signal });
        if (res.status === 404) {
          setPropiedad(null);
        } else if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        } else {
          setPropiedad(await res.json());
        }
        setCargando(false);
      } catch (e) {
        // Cancelado a propósito: ya hay otro effect a cargo, este no toca el estado.
        if (controller.signal.aborted) return;
        setError(e instanceof Error ? e.message : "Error desconocido");
        setCargando(false);
      }
    }
    cargar();

    // Corre antes del próximo effect (cambió el id) y al desmontar.
    return () => controller.abort();
  }, [id]);

  if (cargando) return <p className="cargando">Cargando…</p>;
  if (error) return <p className="mensaje error">{error}</p>;
  if (!propiedad) return <p className="mensaje">No existe la propiedad {id}.</p>;

  return (
    <article>
      <p className="nota">
        URL: propiedad <strong>{id}</strong> · En pantalla: propiedad <strong>{propiedad.id}</strong>
      </p>
      <h2>{propiedad.titulo}</h2>
      <p>{formatearPrecio(propiedad.precio, propiedad.moneda)}</p>
    </article>
  );
}
