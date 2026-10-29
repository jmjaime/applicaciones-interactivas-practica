// Ejercicio 4 · ver README.md de esta carpeta.
import type { EstadoPropiedad } from "../types";

// TODO (4): hoy usa las clases globales .estado y .estado-xxx de estilos.css; pasarlo a BadgeEstado.module.css.
export default function BadgeEstado({ estado }: { estado: EstadoPropiedad }) {
  return <span className={`estado estado-${estado.toLowerCase()}`}>{estado}</span>;
}
