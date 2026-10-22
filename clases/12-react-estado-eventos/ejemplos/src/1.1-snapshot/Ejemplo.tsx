// 1.1 · El estado es una foto: cada render ve SU valor de estado, de principio a fin.
// Dos botones que "suman 3": uno con el valor de la foto y otro con función actualizadora.
import { useState } from "react";

function ConValor() {
  const [interesados, setInteresados] = useState(0);

  function sumarTres() {
    // Las tres llamadas piden lo mismo: "pasar a 0 + 1" (en esta foto, interesados vale 0).
    setInteresados(interesados + 1);
    setInteresados(interesados + 1);
    setInteresados(interesados + 1);
    alert(`En esta foto, interesados vale ${interesados}`);
  }

  return (
    <section>
      <h2>setN(n + 1)</h2>
      <button onClick={sumarTres}>👀 {interesados}</button>
    </section>
  );
}

function ConActualizadora() {
  const [interesados, setInteresados] = useState(0);

  function sumarTres() {
    // Cada función recibe el resultado de la anterior: 0 → 1 → 2 → 3.
    setInteresados((n) => n + 1);
    setInteresados((n) => n + 1);
    setInteresados((n) => n + 1);
    alert(`En esta foto, interesados vale ${interesados}`);
  }

  return (
    <section>
      <h2>setN((n) =&gt; n + 1)</h2>
      <button onClick={sumarTres}>👀 {interesados}</button>
    </section>
  );
}

export default function Ejemplo() {
  return (
    <main className="contenido">
      <p>Cada botón llama tres veces a su <code>set</code> en el mismo click.</p>
      <div className="contadores">
        <ConValor />
        <ConActualizadora />
      </div>
    </main>
  );
}

// 🔧 Probar:
//   1. Primer click en cada botón: los dos alert muestran 0 (la foto), pero uno suma 1 y el otro 3.
//   2. Un console.log("render", interesados) en ConValor: un solo render por click, aunque haya
//      tres set (batching). En desarrollo, StrictMode lo duplica.
//   3. Mezclar: setInteresados(interesados + 5) y después setInteresados((n) => n + 1). ¿Cuánto suma?
//   4. Para mostrar el valor nuevo en el alert: calcularlo en una variable
//      (const nuevo = interesados + 3; setInteresados(nuevo); alert(nuevo)).
