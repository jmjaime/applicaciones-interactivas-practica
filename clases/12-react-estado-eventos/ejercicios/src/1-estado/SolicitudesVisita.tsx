// Ejercicio 1: Solicitudes de visita — ver README.md de esta carpeta.
import { useState } from "react";
import { solicitudes as solicitudesIniciales } from "../datos/solicitudes";
import { formatearFecha } from "../formato";
import type { SolicitudVisita } from "../types";

export default function SolicitudesVisita() {
  const [solicitudes] = useState<SolicitudVisita[]>(solicitudesIniciales);

  // TODO: confirmar y rechazar una solicitud Pendiente
  // TODO: descartar una solicitud Rechazada
  // TODO: ordenar por fecha (ascendente / descendente)
  // TODO: resumen con la cantidad por estado

  return (
    <main className="panel-vendedor">
      <h1>Solicitudes de visita</h1>

      {solicitudes.map((s) => (
        <article key={s.id} className="solicitud">
          <div>
            <h2>{s.propiedad}</h2>
            <p>
              {s.nombre} — {s.telefono} — {formatearFecha(s.fecha)}
            </p>
            {s.mensaje && <p className="nota">“{s.mensaje}”</p>}
          </div>
          <span className={`estado estado-${s.estado.toLowerCase()}`}>{s.estado}</span>
        </article>
      ))}
    </main>
  );
}
