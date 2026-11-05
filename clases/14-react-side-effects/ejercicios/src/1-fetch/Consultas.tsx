import { Link } from "react-router";
import { formatearFecha } from "../formato";
import type { ConsultaRecibida } from "../types";

export default function Consultas() {
  // TODO (1, opcional): las consultas de la API, con sus estados de carga y de error.
  const consultas: ConsultaRecibida[] = [];

  return (
    <>
      <h1>Consultas recibidas</h1>
      {consultas.length === 0 && <p className="mensaje">Todavía no hay consultas.</p>}
      {consultas.map((c) => (
        <div key={c.id} className={c.respuesta ? "item respondida" : "item"}>
          <p>
            <strong>{c.autor}</strong>: {c.texto}
          </p>
          <p>{c.respuesta ? `↳ ${c.respuesta}` : <span className="alerta">Sin responder</span>}</p>
          <small>
            {formatearFecha(c.fecha)} · <Link to={`/propiedades/${c.propiedadId}`}>{c.propiedadTitulo}</Link>
          </small>
        </div>
      ))}
    </>
  );
}
