// Versión en TypeScript de 2.1-bug-que-ts-atrapa.js: el mismo bug, pero acá
// no compila — el tipo declarado (number) atrapa el error antes de correr.
// Este archivo NO compila a propósito. Para ver el error: abrirlo en el
// editor (VS Code lo tipa sin instalar nada) o, con TypeScript instalado,
// correr `npx tsc --noEmit 2.1-bug-que-ts-atrapa.ts`.

function proximoCumple(edad: number): number {
  return edad + 1;
}

const edadInput = "25"; // viene de un <input>
proximoCumple(edadInput);
// ❌ Argument of type 'string' is not assignable
//    to parameter of type 'number'.
