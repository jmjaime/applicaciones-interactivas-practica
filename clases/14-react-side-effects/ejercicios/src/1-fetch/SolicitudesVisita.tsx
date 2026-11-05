import { Link } from "react-router";
import { formatearFecha } from "../formato";
import type { SolicitudVisita } from "../types";

export default function SolicitudesVisita() {
  // TODO (1): las solicitudes de la API, con sus estados de carga y de error.
  const solicitudes: SolicitudVisita[] = [];

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
