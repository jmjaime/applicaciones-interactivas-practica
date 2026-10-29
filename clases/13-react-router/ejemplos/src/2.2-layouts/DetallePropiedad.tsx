import { Link, useParams } from "react-router";
import { formatearPrecio } from "../comun/formato";
import { buscarInmobiliaria, buscarPropiedad } from "../datos";

export default function DetallePropiedad() {
  const { id } = useParams();
  const propiedad = buscarPropiedad(Number(id));

  if (!propiedad) return <p className="mensaje">No existe la propiedad {id}.</p>;

  const inmobiliaria = buscarInmobiliaria(propiedad.inmobiliariaId);

  return (
    <div className="detalle">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div>
        <h1>{propiedad.titulo}</h1>
        <p>
          {propiedad.tipo} en {propiedad.operacion.toLowerCase()} · {propiedad.barrio}
        </p>
        <p>
          <strong>{formatearPrecio(propiedad.precio, propiedad.moneda)}</strong>
        </p>
        <p>{propiedad.descripcion}</p>
        {inmobiliaria && (
          <p>
            Publicada por <Link to={`/inmobiliarias/${inmobiliaria.id}`}>{inmobiliaria.nombre}</Link>
          </p>
        )}
      </div>
    </div>
  );
}
