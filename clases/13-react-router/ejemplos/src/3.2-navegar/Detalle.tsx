import { Link, useLocation, useParams } from "react-router";
import { formatearPrecio } from "../comun/formato";
import { buscarPropiedad } from "../datos";

export default function Detalle() {
  const { id } = useParams();
  // El state que mandó navigate() desde PedirVisita (o null si se llegó por un link).
  const { state } = useLocation();
  const propiedad = buscarPropiedad(Number(id));

  if (!propiedad) return <p className="mensaje">No existe la propiedad {id}.</p>;

  return (
    <div className="detalle">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div>
        {state?.fechaVisita && (
          <p className="aviso">✅ Visita pedida para el {state.fechaVisita}. La inmobiliaria se va a comunicar.</p>
        )}
        <h1>{propiedad.titulo}</h1>
        <p>
          <strong>{formatearPrecio(propiedad.precio, propiedad.moneda)}</strong> · {propiedad.barrio}
        </p>
        <p>{propiedad.descripcion}</p>
        <div className="acciones">
          {/* Relativo: desde /propiedades/3 lleva a /propiedades/3/visita */}
          <Link to="visita" className="boton primario">
            Pedir visita
          </Link>
        </div>
      </div>
    </div>
  );
}
