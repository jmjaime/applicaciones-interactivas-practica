import { Link, useParams } from "react-router";
import BadgeEstado from "../comun/BadgeEstado";
import { formatearFecha, formatearPrecio } from "../formato";
import type { MiPropiedad, SolicitudVisita } from "../types";

export default function DetallePropiedad() {
  const { id } = useParams();

  // TODO (2): la propiedad del :id desde la API (GET /properties/:id), con sus estados de carga y de error.
  const propiedad: MiPropiedad | null = null as MiPropiedad | null;

  // TODO (2): las visitas del :id desde la API (GET /properties/:id/visit-requests), con su propia carga y su propio error.
  const visitas: SolicitudVisita[] = [];

  // TODO (2): si la API responde 404, se muestra este mensaje (hoy, siempre).
  if (!propiedad) {
    return (
      <div className="mensaje">
        <p>No existe la propiedad {id}.</p>
        <Link to="/">Volver a Mis propiedades</Link>
      </div>
    );
  }

  return (
    <div className="detalle">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div>
        <h1>{propiedad.titulo}</h1>
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
        <h2>Visitas</h2>
        {/* TODO (2): carga, error y "Todavía no hay visitas." */}
        {visitas.map((v) => (
          <p key={v.id} className="item">
            {v.nombre} · {formatearFecha(v.fecha)} ·{" "}
            <span className={`estado estado-${v.estado.toLowerCase()}`}>{v.estado}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
