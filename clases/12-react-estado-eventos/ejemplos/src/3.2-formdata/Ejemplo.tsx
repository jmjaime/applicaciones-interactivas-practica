// 3.2 · Formulario no controlado con FormData: el mismo tipo de formulario que el 3.1, con mucho
// menos código. A cambio, no hay validación mientras se escribe: solo lo que hace el navegador.
import { useState } from "react";
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import HacerConsulta, { type NuevaConsulta } from "./HacerConsulta";

const propiedad: Propiedad = propiedades[1];

export default function Ejemplo() {
  // El estado está en el padre: la lista de consultas, no lo que se está escribiendo.
  const [consultas, setConsultas] = useState<NuevaConsulta[]>([]);

  return (
    <main className="contenido detalle-con-form">
      <section>
        <img src={propiedad.foto} alt={propiedad.titulo} className="portada" />
        <h1>{propiedad.titulo}</h1>
        <h3>Consultas ({consultas.length})</h3>
        {consultas.length === 0 ? (
          <p className="mensaje">Todavía no hay consultas.</p>
        ) : (
          <ul>
            {consultas.map((c, i) => (
              <li key={i}>
                <strong>{c.nombre}:</strong> {c.texto}
              </li>
            ))}
          </ul>
        )}
      </section>
      <HacerConsulta onEnviar={(c) => setConsultas([...consultas, c])} />
    </main>
  );
}

// 🔧 Probar:
//   1. React DevTools → Components → HacerConsulta: no tiene hooks. Escribir no re-renderiza nada.
//   2. Enviar vacío: el globo del navegador lo frena (required); el handleSubmit ni se ejecuta.
//   3. Sacar el name="texto" del textarea: datos.get("texto") devuelve null → se guarda "null".
//   4. Agregar <input name="email" type="email" required /> y sumarlo a NuevaConsulta: un campo más,
//      sin estado nuevo ni handler nuevo.
//   5. Mostrar "quedan N caracteres" mientras se escribe: ya no alcanza con FormData, hace falta estado
//      (o sea, pasar ese campo a controlado).
