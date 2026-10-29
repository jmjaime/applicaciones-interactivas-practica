import { buscarPropiedad, listarSolicitudes } from "../datos/repositorio";
import { formatearFecha } from "../formato";
import NavPanel from "./NavPanel";

export default function SolicitudesVisita() {
  return (
    <>
      <NavPanel />
      <main className="contenido">
        <h1>Solicitudes de visita</h1>
        {listarSolicitudes().map((s) => (
          <div key={s.id} className="item">
            <p>
              <strong>{s.nombre}</strong> · {s.telefono} · {formatearFecha(s.fecha)}{" "}
              <span className={`estado estado-${s.estado.toLowerCase()}`}>{s.estado}</span>
            </p>
            <small>{buscarPropiedad(s.propiedadId)?.titulo}</small>
          </div>
        ))}
      </main>
    </>
  );
}
