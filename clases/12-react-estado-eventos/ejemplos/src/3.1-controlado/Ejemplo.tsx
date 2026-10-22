// 3.1 · Formulario controlado: el form es un objeto en el estado, con un solo handleChange.
// Los errores se calculan (no se guardan) y se muestran recién después del primer intento.
import { useState } from "react";
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import PedirVisita, { type FormVisita } from "./PedirVisita";

const propiedad: Propiedad = propiedades[0];

export default function Ejemplo() {
  const [solicitudes, setSolicitudes] = useState<FormVisita[]>([]);

  return (
    <main className="contenido detalle-con-form">
      <section>
        <img src={propiedad.foto} alt={propiedad.titulo} className="portada" />
        <h1>{propiedad.titulo}</h1>
        <p>
          {propiedad.barrio} · {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
        </p>
        <h3>Solicitudes enviadas ({solicitudes.length})</h3>
        <ul>
          {solicitudes.map((s, i) => (
            <li key={i}>
              {s.nombre} · {s.fecha} ({s.franja})
            </li>
          ))}
        </ul>
      </section>
      <PedirVisita onEnviar={(visita) => setSolicitudes([...solicitudes, visita])} />
    </main>
  );
}

// 🔧 Probar:
//   1. Enviar vacío: aparecen los tres errores. Corregir de a uno: desaparecen en vivo.
//   2. Elegir la fecha de hoy o una pasada: "La fecha tiene que ser futura".
//   3. Comentar el e.preventDefault() en PedirVisita: la página se recarga y se pierde todo (las
//      solicitudes también). En la URL aparece ?… : el form hizo un GET a la misma página.
//   4. Sacar el name de un input: handleChange escribe en form[""] y ese campo no cambia.
//   5. Sumar un campo "personas" (input type="number"): llega como string, se convierte con Number()
//      al validar (mínimo 1, máximo 5).
//   6. React DevTools → Components → PedirVisita: ver el objeto form cambiar con cada tecla.
