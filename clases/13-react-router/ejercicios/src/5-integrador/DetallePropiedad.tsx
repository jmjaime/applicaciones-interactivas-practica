import { Link, useParams } from "react-router";
import { buscarPropiedad, listarConsultas, listarSolicitudes } from "../datos/repositorio";
import { formatearFecha, formatearPrecio } from "../formato";
import BadgeEstado from "./BadgeEstado";

export default function DetallePropiedad() {
  const { id } = useParams();
  const propiedad = buscarPropiedad(Number(id));

  if (!propiedad) {
    return (
      <div className="mensaje">
        <p>No existe la propiedad {id}.</p>
        <Link to="/">Volver a Mis propiedades</Link>
      </div>
    );
  }

  const visitas = listarSolicitudes(propiedad.id);
  const consultas = listarConsultas(propiedad.id);

  return (
    <div className="detalle">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div>
        <div className="titulo-con-accion">
          <h1>{propiedad.titulo}</h1>
          {/* TODO (5): link "✏️ Editar", salvo que la propiedad esté vendida, alquilada o cancelada */}
        </div>
        <BadgeEstado estado={propiedad.estado} />
        <p>
          {propiedad.tipo} en {propiedad.operacion.toLowerCase()} ·{" "}
          <strong>{formatearPrecio(propiedad.precio, propiedad.moneda)}</strong>
        </p>
        <p>
          {propiedad.ambientes !== null && `${propiedad.ambientes} amb. · `}
          {propiedad.superficieCubierta !== null && `${propiedad.superficieCubierta} m² cubiertos · `}
          {propiedad.superficieTotal} m² totales
        </p>
        <h2>Visitas ({visitas.length})</h2>
        {visitas.map((v) => (
          <p key={v.id} className="item">
            {v.nombre} · {formatearFecha(v.fecha)} ·{" "}
            <span className={`estado estado-${v.estado.toLowerCase()}`}>{v.estado}</span>
          </p>
        ))}
        <h2>Consultas ({consultas.length})</h2>
        {consultas.map((c) => (
          <p key={c.id} className={c.respuesta ? "item respondida" : "item"}>
            <strong>{c.autor}</strong>: {c.texto}
          </p>
        ))}
      </div>
    </div>
  );
}
