import { Link, useParams } from "react-router";
import { formatearPrecio } from "../comun/formato";
import { buscarInmobiliaria, buscarPropiedad } from "../datos";
import Header from "./Header";

export default function DetallePropiedad() {
  // Los parámetros siempre llegan como string (o undefined): se convierten antes de usarlos.
  const { id } = useParams();
  const propiedad = buscarPropiedad(Number(id));

  // Que la ruta matchee no garantiza que el dato exista: /propiedades/99 también entra acá.
  if (!propiedad) {
    return (
      <>
        <Header />
        <main className="contenido mensaje">
          <p>No existe la propiedad {id}.</p>
          <Link to="/">Ver todas las propiedades</Link>
        </main>
      </>
    );
  }

  const inmobiliaria = buscarInmobiliaria(propiedad.inmobiliariaId);

  return (
    <>
      <Header />
      <main className="contenido detalle">
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
      </main>
    </>
  );
}
