import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BadgeEstado from "../comun/BadgeEstado";
import { API_URL } from "../comun/api";
import { formatearFecha, formatearPrecio } from "../formato";
import type { MiPropiedad, SolicitudVisita } from "../types";

export default function DetallePropiedad() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState<MiPropiedad | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitas, setVisitas] = useState<SolicitudVisita[]>([]);
  const [cargandoVisitas, setCargandoVisitas] = useState(true);
  const [errorVisitas, setErrorVisitas] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/properties/${id}`, { signal: controller.signal });
        if (res.status === 404) {
          setPropiedad(null);
        } else if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        } else {
          setPropiedad(await res.json());
        }
        setCargando(false);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError(e instanceof Error ? e.message : "Error desconocido");
        setCargando(false);
      }
    }
    cargar();

    return () => controller.abort();
  }, [id]);

  // Otro effect, con su propio cleanup: si fallan las visitas, la ficha se sigue viendo.
  useEffect(() => {
    const controller = new AbortController();

    async function cargarVisitas() {
      setCargandoVisitas(true);
      setErrorVisitas(null);
      try {
        const res = await fetch(`${API_URL}/properties/${id}/visit-requests`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        setVisitas(await res.json());
        setCargandoVisitas(false);
      } catch (e) {
        if (controller.signal.aborted) return;
        setErrorVisitas(e instanceof Error ? e.message : "Error desconocido");
        setCargandoVisitas(false);
      }
    }
    cargarVisitas();

    return () => controller.abort();
  }, [id]);

  if (cargando) return <p className="cargando">Cargando propiedad…</p>;
  if (error) return <p className="mensaje error">No se pudo cargar la propiedad: {error}</p>;

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
        <div className="titulo-con-accion">
          <h1>{propiedad.titulo}</h1>
          {/* TODO (integrador): link "✏️ Editar", salvo que la propiedad esté vendida, alquilada o cancelada */}
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
        <h2>Visitas</h2>
        {cargandoVisitas && <p className="cargando">Cargando visitas…</p>}
        {!cargandoVisitas && errorVisitas && (
          <p className="mensaje error">No se pudieron cargar las visitas: {errorVisitas}</p>
        )}
        {!cargandoVisitas && !errorVisitas && visitas.length === 0 && <p>Todavía no hay visitas.</p>}
        {!cargandoVisitas &&
          !errorVisitas &&
          visitas.map((v) => (
            <p key={v.id} className="item">
              {v.nombre} · {formatearFecha(v.fecha)} ·{" "}
              <span className={`estado estado-${v.estado.toLowerCase()}`}>{v.estado}</span>
            </p>
          ))}
      </div>
    </div>
  );
}
