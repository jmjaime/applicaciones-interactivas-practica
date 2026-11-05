import { useState } from "react";
import CardPropiedad from "../comun/CardPropiedad";
import { API_URL } from "../comun/api";
import type { Propiedad } from "../types";

// El tope no es parte de la lección: frena el bucle para no saturar la API durante la demo.
const TOPE = 20;
let requests = 0;

export default function Listado() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);

  // El cuerpo del componente corre en cada render: fetch → setState → render → fetch → …
  if (requests < TOPE) {
    requests++;
    fetch(`${API_URL}/properties`)
      .then((res) => res.json())
      .then((datos) => setPropiedades(datos));
  }

  return (
    <main className="contenido">
      <h1>Propiedades</h1>
      <p className="nota">
        Requests disparados: <strong>{requests}</strong> (con tope en {TOPE})
      </p>
      <div className="listado">
        {propiedades.map((p) => (
          <CardPropiedad key={p.id} propiedad={p} />
        ))}
      </div>
    </main>
  );
}
