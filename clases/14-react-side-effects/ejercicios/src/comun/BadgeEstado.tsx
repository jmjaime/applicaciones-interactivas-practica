import type { EstadoPropiedad } from "../types";
import estilos from "./BadgeEstado.module.css";

export default function BadgeEstado({ estado }: { estado: EstadoPropiedad }) {
  return <span className={`${estilos.badge} ${estilos[estado]}`}>{estado}</span>;
}
