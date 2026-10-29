import { listarPropiedades } from "../datos/repositorio";
import { ESTADOS } from "../types";
import BadgeEstado from "./BadgeEstado";

export default function Reportes() {
  const propiedades = listarPropiedades();
  const maximo = Math.max(...ESTADOS.map((e) => propiedades.filter((p) => p.estado === e).length));

  return (
    <>
      <h1>Reportes</h1>
      <h2>Propiedades por estado</h2>
      {ESTADOS.map((estado) => {
        const cantidad = propiedades.filter((p) => p.estado === estado).length;
        return (
          <div key={estado} className="reporte">
            <BadgeEstado estado={estado} />
            <div className="barra" style={{ width: `${(cantidad / maximo) * 100}%` }} />
            <span>{cantidad}</span>
          </div>
        );
      })}
    </>
  );
}
