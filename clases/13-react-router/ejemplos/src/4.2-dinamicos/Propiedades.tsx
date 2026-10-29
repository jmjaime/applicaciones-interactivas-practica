import { useState } from "react";
import { formatearPrecio } from "../comun/formato";
import { propiedades } from "../datos";
import estilos from "./Propiedades.module.css";

export default function Propiedades() {
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

  function toggle(id: number) {
    setSeleccionadas(seleccionadas.includes(id) ? seleccionadas.filter((s) => s !== id) : [...seleccionadas, id]);
  }

  return (
    <>
      <h1>Propiedades ({seleccionadas.length} seleccionadas)</h1>
      <div className={estilos.grilla}>
        {propiedades.map((p) => (
          <article
            key={p.id}
            // Clase condicional: una base siempre + otra según el estado.
            className={seleccionadas.includes(p.id) ? `${estilos.card} ${estilos.seleccionada}` : estilos.card}
            onClick={() => toggle(p.id)}
          >
            {/* Clase según un dato: estilos["Venta"] o estilos["Alquiler"] */}
            <span className={`${estilos.badge} ${estilos[p.operacion]}`}>{p.operacion}</span>
            <h3>{p.titulo}</h3>
            <p>{formatearPrecio(p.precio, p.moneda)}</p>
          </article>
        ))}
      </div>
    </>
  );
}

// 🔧 Probar:
//   1. Click en varias cards: el borde sale de la clase .seleccionada, no de un style inline.
//   2. Agregar una operación nueva en los datos ("Temporario"): estilos["Temporario"] es undefined → badge sin color.
//   3. Armar el className con un array: [estilos.card, sel && estilos.seleccionada].filter(Boolean).join(" ").
