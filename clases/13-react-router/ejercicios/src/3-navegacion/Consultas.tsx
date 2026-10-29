import { Link } from "react-router";
import { buscarPropiedad, listarConsultas } from "../datos/repositorio";
import { formatearFecha } from "../formato";

export default function Consultas() {
  return (
    <>
      <h1>Consultas recibidas</h1>
      {listarConsultas().map((c) => (
        <div key={c.id} className={c.respuesta ? "item respondida" : "item"}>
          <p>
            <strong>{c.autor}</strong>: {c.texto}
          </p>
          <p>{c.respuesta ? `↳ ${c.respuesta}` : <span className="alerta">Sin responder</span>}</p>
          <small>
            {formatearFecha(c.fecha)} ·{" "}
            <Link to={`/propiedades/${c.propiedadId}`}>{buscarPropiedad(c.propiedadId)?.titulo}</Link>
          </small>
        </div>
      ))}
    </>
  );
}
