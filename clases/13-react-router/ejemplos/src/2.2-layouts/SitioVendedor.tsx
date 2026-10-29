import { NavLink, Outlet, useParams } from "react-router";
import { buscarInmobiliaria } from "../datos";

// Una página que también es layout: los datos de la inmobiliaria quedan fijos
// y las pestañas cambian lo que va en su propio <Outlet />.
export default function SitioVendedor() {
  const { id } = useParams();
  const inmobiliaria = buscarInmobiliaria(Number(id));

  if (!inmobiliaria) return <p className="mensaje">No existe la inmobiliaria {id}.</p>;

  return (
    <>
      <section className="inmobiliaria-header">
        <h1>{inmobiliaria.nombre}</h1>
        <p>{inmobiliaria.descripcion}</p>
        <p>
          📞 {inmobiliaria.telefono} · ✉️ {inmobiliaria.email}
        </p>
      </section>
      <nav className="tabs">
        {/* Links relativos (sin "/" adelante): se resuelven desde /inmobiliarias/:id */}
        <NavLink to="." end>
          Propiedades
        </NavLink>
        <NavLink to="resenas">Reseñas ({inmobiliaria.resenas.length})</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
