// Ejercicio 4.2 — ver README.md de esta carpeta.
// Punto de partida: el 3.2 resuelto (todas las respuestas visibles).
import type { Consulta } from "../types";

type ConsultasProps = {
  consultas: Consulta[];
  nombreInmobiliaria: string;
};

function formatearFecha(fecha: string) {
  return new Date(fecha + "T00:00").toLocaleDateString("es-AR");
}

export default function Consultas({ consultas, nombreInmobiliaria }: ConsultasProps) {
  if (consultas.length === 0) {
    return <p className="mensaje">Todavía no hay consultas.</p>;
  }

  const ordenadas = [...consultas].sort((a, b) => b.fecha.localeCompare(a.fecha));

  // TODO: las respuestas arrancan ocultas; cada consulta respondida tiene su botón para mostrarla
  return (
    <>
      {ordenadas.map((c) => (
        <article className="consulta" key={c.id}>
          <p>
            <span className="consulta-autor">@{c.autor}</span>
            <span className="consulta-fecha">{formatearFecha(c.fecha)}</span>
          </p>
          <p>{c.texto}</p>
          {c.respuesta ? (
            <div className="respuesta">
              ↳ {nombreInmobiliaria}: {c.respuesta}
            </div>
          ) : (
            <span className="sin-responder">Sin responder</span>
          )}
        </article>
      ))}
    </>
  );
}
