import { Link, Outlet } from "react-router";

const IDS = [1, 2, 3];

export default function Layout() {
  return (
    <main className="contenido">
      <h1>Detalle de propiedad</h1>
      <div className="filtros">
        <strong>Con race:</strong>
        {IDS.map((id) => (
          <Link key={id} className="boton" to={`/con-race/${id}`}>
            {id}
            {id === 1 && " (lenta)"}
          </Link>
        ))}
        <strong>Con abort:</strong>
        {IDS.map((id) => (
          <Link key={id} className="boton" to={`/con-abort/${id}`}>
            {id}
            {id === 1 && " (lenta)"}
          </Link>
        ))}
      </div>
      <Outlet />
    </main>
  );
}
