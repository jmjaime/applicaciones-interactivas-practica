import type { CSSProperties } from "react";
import { inmobiliarias } from "../datos";
import estilos from "./Inmobiliarias.module.css";

function promedio(calificaciones: number[]): number {
  if (calificaciones.length === 0) return 0;
  return calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;
}

export default function Inmobiliarias() {
  return (
    <>
      <h1>Calificación promedio</h1>
      {inmobiliarias.map((i) => {
        const valor = promedio(i.resenas.map((r) => r.calificacion));
        // style inline: valores calculados que no se pueden escribir de antemano en un .css.
        const estiloRelleno = {
          width: `${(valor / 5) * 100}%`,
          "--color-calificacion": valor >= 4 ? "#50fa7b" : "#ffb86c",
        } as CSSProperties; // TypeScript no conoce las variables CSS custom
        return (
          <div key={i.id} className={estilos.fila}>
            <strong>{i.nombre}</strong>
            <div className={estilos.barra}>
              <div className={estilos.relleno} style={estiloRelleno} />
            </div>
            <span>{valor ? valor.toFixed(1) : "—"}</span>
          </div>
        );
      })}
    </>
  );
}

// 🔧 Probar:
//   1. Cambiar calificaciones en datos/inmobiliarias.json: la barra se ajusta sola.
//   2. Pasar el color directo como backgroundColor en el style, sin la variable.
//   3. Intentar un :hover en el objeto style: no existe; eso queda en el .module.css.
