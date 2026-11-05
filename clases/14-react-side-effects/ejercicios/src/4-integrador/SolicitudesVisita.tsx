import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AGENCIA_ID, API_URL } from "../comun/api";
import { formatearFecha } from "../formato";
import type { SolicitudVisita } from "../types";

export default function SolicitudesVisita() {
  // TODO (integrador): confirmar y rechazar las pendientes con PATCH /visit-requests/:id.
  const [solicitudes, setSolicitudes] = useState<SolicitudVisita[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(`${API_URL}/agencies/${AGENCIA_ID}/visit-requests`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setSolicitudes(await res.json());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) return <p className="cargando">Cargando solicitudes…</p>;
  if (error) return <p className="mensaje error">No se pudieron cargar las solicitudes: {error}</p>;

  return (
    <>
      <h1>Solicitudes de visita</h1>
      {solicitudes.length === 0 && <p className="mensaje">Todavía no hay solicitudes.</p>}
      {solicitudes.map((s) => (
        <div key={s.id} className="item">
          <p>
            <strong>{s.nombre}</strong> · {s.telefono} · {formatearFecha(s.fecha)}{" "}
            <span className={`estado estado-${s.estado.toLowerCase()}`}>{s.estado}</span>
          </p>
          <small>
            <Link to={`/propiedades/${s.propiedadId}`}>{s.propiedadTitulo}</Link>
          </small>
        </div>
      ))}
    </>
  );
}
