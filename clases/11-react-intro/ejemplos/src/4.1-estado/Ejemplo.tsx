// 4.1 · Estado: por qué una variable local no alcanza, y qué hace useState.
// El console.log en el cuerpo de cada componente muestra cuándo React lo vuelve a ejecutar.
// (En desarrollo, StrictMode ejecuta cada render dos veces: por eso algunos logs salen repetidos.)
import { useState } from "react";

function ContadorConLet() {
  let favoritos = 0;
  console.log("render ContadorConLet, favoritos =", favoritos);

  function sumar() {
    favoritos = favoritos + 1;
    console.log("click: favoritos =", favoritos); // cambia… pero React no se entera
  }

  return (
    <section>
      <h2>Con let</h2>
      <button onClick={sumar}>❤️ {favoritos}</button>
    </section>
  );
}

function ContadorConUseState() {
  const [favoritos, setFavoritos] = useState(0);
  console.log("render ContadorConUseState, favoritos =", favoritos);

  return (
    <section>
      <h2>Con useState</h2>
      <button onClick={() => setFavoritos(favoritos + 1)}>❤️ {favoritos}</button>
    </section>
  );
}

export default function Ejemplo() {
  return (
    <main className="contenido">
      <div className="contadores">
        <ContadorConLet />
        <ContadorConUseState />
      </div>
    </main>
  );
}

// 🔧 Probar:
//   1. Clickear 3 veces cada botón con la Console abierta: el de let loguea 1, 2, 3 y nunca re-renderiza.
//   2. Clickear el de let 3 veces y después el de useState: el de let no "recupera" su valor.
//   3. Duplicar <ContadorConUseState /> en el Ejemplo: cada uso tiene su propio estado.
//   4. Cambiar el onClick por onClick={setFavoritos(favoritos + 1)} (sin la arrow): error de loop
//      infinito ("Too many re-renders"). Se pasa la función, no su resultado.
