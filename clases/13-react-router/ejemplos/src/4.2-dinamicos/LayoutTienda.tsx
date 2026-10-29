import { NavLink, Outlet } from "react-router";
import estilos from "./LayoutTienda.module.css";

// Con CSS Modules la clase "active" automática de NavLink no sirve (el nombre real es otro):
// se le pasa una función que recibe { isActive } y devuelve la clase.
function claseLink({ isActive }: { isActive: boolean }) {
  return isActive ? `${estilos.link} ${estilos.activo}` : estilos.link;
}

export default function LayoutTienda() {
  return (
    <>
      <header className={estilos.header}>
        <NavLink to="/" end className={claseLink}>
          Propiedades
        </NavLink>
        <NavLink to="/inmobiliarias" className={claseLink}>
          Inmobiliarias
        </NavLink>
      </header>
      <main className="contenido">
        <Outlet />
      </main>
    </>
  );
}
