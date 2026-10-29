import { buscarPropiedad, listarConsultas } from "../datos/repositorio";
import { formatearFecha } from "../formato";
import NavPanel from "./NavPanel";

export default function Consultas() {
  return (
    <>
      <NavPanel />
      <main className="contenido">
        <h1>Consultas recibidas</h1>
        {listarConsultas().map((c) => (
          <div key={c.id} className={c.respuesta ? "item respondida" : "item"}>
            <p>
              <strong>{c.autor}</strong>: {c.texto}
            </p>
            <p>{c.respuesta ? `↳ ${c.respuesta}` : <span className="alerta">Sin responder</span>}</p>
            <small>
              {formatearFecha(c.fecha)} · {buscarPropiedad(c.propiedadId)?.titulo}
            </small>
          </div>
        ))}
      </main>
    </>
  );
}
