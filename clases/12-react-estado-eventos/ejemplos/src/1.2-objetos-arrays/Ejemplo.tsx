// 1.2 · Objetos y arrays en el estado: se reemplazan, nunca se mutan.
// - filtros: un objeto (antes eran tres useState) → { ...filtros, campo }
// - comparadas: un array de { id, puntaje } → [...a, x], filter, [...a].sort(), map + spread
import { useState } from "react";
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import Card from "./Card";
import Comparador from "./Comparador";
import Filtros, { type FiltrosListado } from "./Filtros";

const lista: Propiedad[] = propiedades;
const MAXIMO_COMPARADAS = 3;

// Solo el id y lo propio de la comparación: los datos de la propiedad se buscan por id.
type Comparada = { id: number; puntaje: number };

function buscar(id: number): Propiedad {
  return lista.find((p) => p.id === id)!;
}

export default function Ejemplo() {
  const [filtros, setFiltros] = useState<FiltrosListado>({ texto: "", operacion: "", soloFavoritos: false });
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [comparadas, setComparadas] = useState<Comparada[]>([]);

  const visibles = lista.filter(
    (p) =>
      (p.titulo + " " + p.barrio).toLowerCase().includes(filtros.texto.toLowerCase()) &&
      (!filtros.operacion || p.operacion === filtros.operacion) &&
      (!filtros.soloFavoritos || favoritos.includes(p.id)),
  );

  // Derivado: se arma en cada render, así nunca queda una copia vieja de la propiedad.
  const propiedadesComparadas = comparadas.map((c) => ({ ...buscar(c.id), puntaje: c.puntaje }));

  function toggleFavorito(id: number) {
    setFavoritos(favoritos.includes(id) ? favoritos.filter((f) => f !== id) : [...favoritos, id]);
  }

  function comparar(id: number) {
    setComparadas([...comparadas, { id, puntaje: 0 }]);
  }

  function quitar(id: number) {
    setComparadas(comparadas.filter((c) => c.id !== id));
  }

  function puntuar(id: number, puntaje: number) {
    // Array nuevo, y objeto nuevo solo en la posición que cambia.
    setComparadas(comparadas.map((c) => (c.id === id ? { ...c, puntaje } : c)));
  }

  function ordenarPorPrecio() {
    // sort ordena el original: primero se copia. (Compara el número sin convertir monedas.)
    setComparadas([...comparadas].sort((a, b) => buscar(a.id).precio - buscar(b.id).precio));
  }

  return (
    <>
      <header className="header">
        <strong>🏠 Inmobi</strong>
        <span className="contador">❤️ {favoritos.length}</span>
      </header>
      <main className="contenido">
        <Comparador
          propiedades={propiedadesComparadas}
          onQuitar={quitar}
          onPuntuar={puntuar}
          onOrdenarPorPrecio={ordenarPorPrecio}
        />
        <Filtros filtros={filtros} resultados={`${visibles.length} de ${lista.length}`} onChange={setFiltros} />
        <section className="listado">
          {visibles.map((p) => (
            <Card
              key={p.id}
              propiedad={p}
              esFavorita={favoritos.includes(p.id)}
              enComparador={comparadas.some((c) => c.id === p.id)}
              comparadorLleno={comparadas.length >= MAXIMO_COMPARADAS}
              onToggleFavorito={() => toggleFavorito(p.id)}
              onComparar={() => comparar(p.id)}
            />
          ))}
        </section>
      </main>
    </>
  );
}

// 🔧 Probar (romperlo a propósito):
//   1. En comparar: comparadas.push({ id, puntaje: 0 }); setComparadas(comparadas).
//      El comparador no se actualiza… hasta que otro estado (un ❤️) fuerza un render y aparece de golpe.
//   2. En ordenarPorPrecio: comparadas.sort(…); setComparadas(comparadas). Mismo array: nada cambia en pantalla.
//   3. En puntuar: c.puntaje = puntaje dentro de un forEach, y setComparadas([...comparadas]).
//      Re-renderiza (el array es nuevo), pero se mutó el objeto del estado anterior.
//   4. En Filtros: onChange({ texto: e.target.value }) sin el spread. Al escribir se pierden la operación
//      y "solo favoritos" (y TypeScript avisa que faltan propiedades).
//   5. Agregar un filtro "ambientes mínimos" al objeto filtros: un campo más en el tipo, un input y una
//      condición en visibles. No hace falta otro useState.
