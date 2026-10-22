import { formatearFecha } from "../formato";
import type { ConsultaRecibida } from "../types";

type PanelConsultaProps = {
  consulta: ConsultaRecibida;
};

export default function PanelConsulta({ consulta }: PanelConsultaProps) {
  // TODO: el borrador de la respuesta y el envío

  return (
    <aside className="panel-consulta">
      <h2>{consulta.propiedad}</h2>
      <p>
        <strong>{consulta.autor}</strong> · {formatearFecha(consulta.fecha)}
      </p>
      <blockquote>{consulta.texto}</blockquote>

      <form className="formulario">
        <label>
          Respuesta
          <textarea rows={4} />
        </label>
        <button type="submit" className="boton primario">
          Responder
        </button>
      </form>
    </aside>
  );
}
