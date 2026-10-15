import { EJERCICIOS } from "./ejercicios";

export default function Indice() {
  return (
    <main className="indice">
      <h1>⚛️ Clase 11 · Ejercicios</h1>
      <ul>
        {EJERCICIOS.map((e) => (
          <li key={e.id}>
            <a href={`?ej=${e.id}`}>{e.titulo}</a>
            <small> · src/{e.carpeta}/</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
