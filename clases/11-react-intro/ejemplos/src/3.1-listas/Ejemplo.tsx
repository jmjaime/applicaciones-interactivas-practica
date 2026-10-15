// 3.1 · Listas: de un array de datos a un array de <Card />.
// Es el visibles.map(crearCard) de la clase pasada, sin replaceChildren.
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import Header from "../2.1-componentes/Header";
import Card from "../2.2-props/Card";

// Los datos importados como módulo: pedirlos con fetch desde React se ve más adelante.
const lista: Propiedad[] = propiedades;

export default function Ejemplo() {
  return (
    <>
      <Header />
      <main className="contenido">
        <section className="listado">
          {lista.map((p) => (
            <Card key={p.id} propiedad={p} esFavorita={false} />
          ))}
        </section>
      </main>
    </>
  );
}

// 🔧 Probar:
//   1. Sacar key={p.id}: todo se ve igual, pero la Console avisa "Each child in a list should have a unique key".
//   2. Mostrar solo las de venta: lista.filter((p) => p.operacion === "Venta").map(…).
//   3. Ordenar por precio antes del map: [...lista].sort((a, b) => a.precio - b.precio).
//      (¿Por qué la copia con [...lista]? sort modifica el array original.)
