import { useState } from "react";
import { formatearFecha } from "../formato";
import type { ConsultaRecibida } from "../types";

type ListaConsultasProps = {
  consultas: ConsultaRecibida[];
};

export default function ListaConsultas({ consultas }: ListaConsultasProps) {
  // La lista sabe cuál está seleccionada… pero el panel, que es su hermano, no.
  const [seleccionadaId, setSeleccionadaId] = useState<number | null>(null);

  return (
    <section>
      <ul className="lista-consultas">
        {consultas.map((c) => (
          <li
            key={c.id}
            className={c.id === seleccionadaId ? "item-consulta seleccionada" : "item-consulta"}
            onClick={() => setSeleccionadaId(c.id)}
          >
            <strong>{c.propiedad}</strong>
            <span>
              {c.autor}: “{c.texto}”
            </span>
            <small>{formatearFecha(c.fecha)}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
