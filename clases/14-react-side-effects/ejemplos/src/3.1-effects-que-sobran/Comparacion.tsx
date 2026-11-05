import { useEffect, useState } from "react";
import { API_URL } from "../comun/api";
import type { Propiedad } from "../types";
import ConEffects from "./ConEffects";
import SinEffects from "./SinEffects";

// Traer los datos sí es un effect legítimo: sincroniza con algo de afuera (la API).
export default function Comparacion() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/properties`, { signal: controller.signal })
      .then((res) => res.json())
      .then(setPropiedades)
      .catch(() => {}); // sin manejo de error a propósito: el foco de esta demo es otro
    return () => controller.abort();
  }, []);

  return (
    <main className="contenido comparacion">
      <section>
        <h2>❌ Con effects</h2>
        <ConEffects propiedades={propiedades} />
      </section>
      <section>
        <h2>✅ Sin effects</h2>
        <SinEffects propiedades={propiedades} />
      </section>
    </main>
  );
}
