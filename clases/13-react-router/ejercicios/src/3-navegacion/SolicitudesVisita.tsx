import { Link } from "react-router";
import { buscarPropiedad, listarSolicitudes } from "../datos/repositorio";
import { formatearFecha } from "../formato";

export default function SolicitudesVisita() {
  return (
    <>
      <h1>Solicitudes de visita</h1>
      {listarSolicitudes().map((s) => (
        <div key={s.id} className="item">
          <p>
            <strong>{s.nombre}</strong> · {s.telefono} · {formatearFecha(s.fecha)}{" "}
            <span className={`estado estado-${s.estado.toLowerCase()}`}>{s.estado}</span>
          </p>
          <small>
            <Link to={`/propiedades/${s.propiedadId}`}>{buscarPropiedad(s.propiedadId)?.titulo}</Link>
          </small>
        </div>
      ))}
    </>
  );
}
