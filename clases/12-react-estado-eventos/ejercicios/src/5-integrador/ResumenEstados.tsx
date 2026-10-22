import { ESTADOS, type MiPropiedad } from "../types";

type ResumenEstadosProps = {
  propiedades: MiPropiedad[];
};

export default function ResumenEstados({ propiedades }: ResumenEstadosProps) {
  return (
    <div className="resumen-estados">
      {ESTADOS.map((estado) => {
        const cantidad = propiedades.filter((p) => p.estado === estado).length;
        return (
          cantidad > 0 && (
            <span key={estado} className={`estado estado-${estado.toLowerCase()}`}>
              {estado} {cantidad}
            </span>
          )
        );
      })}
    </div>
  );
}
