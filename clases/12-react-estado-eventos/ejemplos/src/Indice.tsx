import { EJEMPLOS } from "./ejemplos";

export default function Indice() {
  return (
    <main className="contenido indice">
      <h1>⚛️ Clase 12 · Ejemplos</h1>
      <ul>
        {EJEMPLOS.map((e) => (
          <li key={e.id}>
            <a href={`?ej=${e.id}`}>
              <strong>{e.id}</strong> {e.titulo}
            </a>
            <small> · Bloque {e.bloque}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
