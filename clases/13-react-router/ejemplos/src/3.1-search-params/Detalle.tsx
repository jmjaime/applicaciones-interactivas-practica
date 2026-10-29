import { useParams } from "react-router";
import { formatearPrecio } from "../comun/formato";
import { buscarPropiedad } from "../datos";

export default function Detalle() {
  const { id } = useParams();
  const propiedad = buscarPropiedad(Number(id));

  if (!propiedad) return <p className="mensaje">No existe la propiedad {id}.</p>;

  return (
    <div className="detalle">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div>
        <h1>{propiedad.titulo}</h1>
        <p>
          <strong>{formatearPrecio(propiedad.precio, propiedad.moneda)}</strong> · {propiedad.barrio}
        </p>
        <p>{propiedad.descripcion}</p>
        <p>
          <small>Para volver con los filtros puestos alcanza con el botón Atrás del navegador.</small>
        </p>
      </div>
    </div>
  );
}
