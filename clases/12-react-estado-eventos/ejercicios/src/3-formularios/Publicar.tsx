// Ejercicio 3: Publicar propiedad — ver README.md de esta carpeta.
// Esta pantalla ya está resuelta: el trabajo es en PublicarPropiedad.tsx.
import { useState } from "react";
import { formatearPrecio } from "../formato";
import type { NuevaPropiedad } from "../types";
import PublicarPropiedad from "./PublicarPropiedad";

export default function Publicar() {
  const [publicadas, setPublicadas] = useState<NuevaPropiedad[]>([]);

  return (
    <main className="panel-vendedor">
      <h1>Publicar propiedad</h1>
      <PublicarPropiedad onPublicar={(p) => setPublicadas([...publicadas, p])} />

      <h2>Publicadas en esta sesión ({publicadas.length})</h2>
      {publicadas.length === 0 ? (
        <p className="mensaje">Todavía no se publicó ninguna.</p>
      ) : (
        <ul className="publicadas">
          {publicadas.map((p, i) => (
            <li key={i}>
              <strong>{p.titulo}</strong> · {p.tipo} en {p.operacion.toLowerCase()} ·{" "}
              {formatearPrecio(p.precio, p.moneda)}
              {p.ambientes !== null && ` · ${p.ambientes} amb.`}
              {p.superficieCubierta !== null && ` · ${p.superficieCubierta} m² cub.`}
              {` · ${p.superficieTotal} m² tot.`}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
