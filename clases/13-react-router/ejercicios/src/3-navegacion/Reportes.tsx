import { listarPropiedades } from "../datos/repositorio";
import { ESTADOS } from "../types";

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
            <span className={`estado estado-${estado.toLowerCase()}`}>{estado}</span>
            <span>{cantidad}</span>
          </div>
        );
      })}
    </>
  );
}
