import { formatearPrecio } from "../formato";
import type { EstadoPropiedad, MiPropiedad } from "../types";

type Accion = { texto: string; destino: EstadoPropiedad };

// Las transiciones del ciclo de vida del TPO (Cancelar se agrega aparte).
function accionesDe(p: MiPropiedad): Accion[] {
  switch (p.estado) {
    case "Borrador":
      return [{ texto: "Publicar", destino: "Publicada" }];
    case "Publicada":
      return [
        { texto: "Pausar", destino: "Pausada" },
        { texto: "Marcar reservada", destino: "Reservada" },
      ];
    case "Pausada":
      return [{ texto: "Republicar", destino: "Publicada" }];
    case "Reservada":
      return p.operacion === "Venta"
        ? [{ texto: "Marcar vendida", destino: "Vendida" }]
        : [{ texto: "Marcar alquilada", destino: "Alquilada" }];
    default:
      return [];
  }
}

type FilaPropiedadProps = {
  propiedad: MiPropiedad;
  onCambiarEstado: (destino: EstadoPropiedad) => void;
};

export default function FilaPropiedad({ propiedad: p, onCambiarEstado }: FilaPropiedadProps) {
  const acciones = accionesDe(p);
  const cancelable = acciones.length > 0;

  function cancelar() {
    if (window.confirm(`¿Cancelar "${p.titulo}"?`)) onCambiarEstado("Cancelada");
  }

  return (
    <article className="fila">
      <img src={p.foto} alt={p.titulo} />
      <div>
        <h2>{p.titulo}</h2>
        <p>
          {p.tipo} en {p.operacion.toLowerCase()} · {formatearPrecio(p.precio, p.moneda)}
        </p>
        <span className={`estado estado-${p.estado.toLowerCase()}`}>{p.estado}</span>
        {p.consultasSinResponder > 0 && (
          <p className="alerta">
            💬 {p.consultasSinResponder}{" "}
            {p.consultasSinResponder === 1 ? "consulta sin responder" : "consultas sin responder"}
          </p>
        )}
      </div>
      <div className="acciones">
        {acciones.map((a) => (
          <button key={a.destino} type="button" onClick={() => onCambiarEstado(a.destino)}>
            {a.texto}
          </button>
        ))}
        {cancelable && (
          <button type="button" onClick={cancelar}>
            Cancelar
          </button>
        )}
        {/* TODO (5): Editar */}
      </div>
    </article>
  );
}
