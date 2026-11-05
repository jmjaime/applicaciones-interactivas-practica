import { Link, useParams } from "react-router";

// El detalle se conecta a la API en el Ejercicio 2.
export default function DetallePendiente() {
  const { id } = useParams();
  return (
    <div className="mensaje">
      <p>El detalle de la propiedad {id} se conecta en el Ejercicio 2.</p>
      <Link to="/">Volver a Mis propiedades</Link>
    </div>
  );
}
