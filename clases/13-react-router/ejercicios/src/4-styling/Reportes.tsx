import { listarPropiedades } from "../datos/repositorio";
import { ESTADOS } from "../types";
import BadgeEstado from "./BadgeEstado";

export default function Reportes() {
  const propiedades = listarPropiedades();

  return (
    <>
      <h1>Reportes</h1>
      <h2>Propiedades por estado</h2>
      {ESTADOS.map((estado) => {
        const cantidad = propiedades.filter((p) => p.estado === estado).length;
        return (
          <div key={estado} className="reporte">
            <BadgeEstado estado={estado} />
            {/* TODO (4): una barra (.barra) con el ancho proporcional a la cantidad */}
            <span />
            <span>{cantidad}</span>
          </div>
        );
      })}
    </>
  );
}
