// Ejercicio 3.2 — ver README.md de esta carpeta.
import type { Consulta } from "../types";

type ConsultasProps = {
  consultas: Consulta[];
};

export default function Consultas({ consultas }: ConsultasProps) {
  // TODO: una entrada por consulta (autor, fecha, texto y respuesta o "Sin responder")
  // TODO: si no hay consultas, un mensaje
  return <p className="mensaje">Pendiente: {consultas.length} consultas</p>;
}
