// 4.2 · El listado de la clase pasada (ejemplos/3-js/3.4-estado-render), en React.
// Misma idea, UI = f(estado), pero sin render() a mano ni replaceChildren:
// cada set…() pide un re-render y React toca en el DOM solo lo que cambió.
import { useState } from "react";
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import Card from "./Card";
import Filtros from "./Filtros";
import Header from "./Header";

const lista: Propiedad[] = propiedades;

export default function Ejemplo() {
  // Estado: lo mínimo, lo que el usuario cambia.
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [texto, setTexto] = useState("");
  const [operacion, setOperacion] = useState("");
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  // Derivado: se recalcula en cada render (la propiedadesVisibles(estado) de la clase pasada).
  const visibles = lista.filter(
    (p) =>
      (p.titulo + " " + p.barrio).toLowerCase().includes(texto.toLowerCase()) &&
      (!operacion || p.operacion === operacion) &&
      (!soloFavoritos || favoritos.includes(p.id)),
  );

  function toggleFavorito(id: number) {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]); // un array nuevo: con push, React no ve el cambio
    }
  }

  return (
    <>
      <Header cantidadFavoritos={favoritos.length} />
      <main className="contenido">
        <Filtros
          texto={texto}
          operacion={operacion}
          soloFavoritos={soloFavoritos}
          resultados={`${visibles.length} de ${lista.length}`}
          onTextoChange={setTexto}
          onOperacionChange={setOperacion}
          onSoloFavoritosChange={setSoloFavoritos}
        />
        {visibles.length === 0 ? (
          <p className="mensaje">No hay propiedades con esos filtros.</p>
        ) : (
          <section className="listado">
            {visibles.map((p) => (
              <Card
                key={p.id}
                propiedad={p}
                esFavorita={favoritos.includes(p.id)}
                onToggleFavorito={() => toggleFavorito(p.id)}
              />
            ))}
          </section>
        )}
      </main>
    </>
  );
}

// 🔧 Probar:
//   1. DevTools → Elements mientras se escribe en el buscador: parpadean solo las cards que entran
//      o salen (en la clase pasada parpadeaba todo el <section>).
//   2. Cambiar toggleFavorito por favoritos.push(id); setFavoritos(favoritos): no pasa nada.
//      Es el mismo array: para React, el estado no cambió.
//   3. Sumar un filtro por tipo (Casa / Departamento…): un useState, un <select> en Filtros
//      y una condición en visibles. Lo mismo que en la clase pasada, sin tocar render().
//   4. React DevTools → Components → Ejemplo: ver los hooks de estado cambiar en vivo.
//   5. Un console.log("Filtros") en Filtros y console.log("Card", propiedad.id) en Card: un click
//      en ❤️ re-ejecuta todo lo que está debajo de Ejemplo (los 8 Card y Filtros, aunque sus props
//      no cambiaron), pero en Elements solo cambia el botón de esa card.
