import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../comun/api";
import { formatearPrecio } from "../comun/formato";
import type { Propiedad } from "../types";

// La versión con el bug: gana la última respuesta en llegar, no el último request en salir.
export default function DetalleConRace() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);

  useEffect(() => {
    async function cargar() {
      const res = await fetch(`${API_URL}/properties/${id}`);
      setPropiedad(await res.json());
    }
    cargar();
  }, [id]);

  if (!propiedad) return <p className="cargando">Cargando…</p>;

  return (
    <article>
      <p className="nota">
        URL: propiedad <strong>{id}</strong> · En pantalla: propiedad <strong>{propiedad.id}</strong>
      </p>
      <h2>{propiedad.titulo}</h2>
      <p>{formatearPrecio(propiedad.precio, propiedad.moneda)}</p>
    </article>
  );
}
