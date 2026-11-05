import { Link, useParams } from "react-router";

// Cambia el :id sin salir de la ruta: DetallePropiedad no se desmonta, recibe otro id.
export default function NavegacionDetalle() {
  const id = Number(useParams().id);
  if (!Number.isInteger(id)) return null;

  return (
    <nav className="navegacion-detalle">
      {id > 1 && <Link to={`/propiedades/${id - 1}`}>← Anterior</Link>}
      <Link to={`/propiedades/${id + 1}`}>Siguiente →</Link>
    </nav>
  );
}
