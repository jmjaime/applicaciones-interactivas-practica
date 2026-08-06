# Sintaxis básica de JS y TS

Cada archivo de esta carpeta muestra **un** concepto de JavaScript o
TypeScript, listo para correr y modificar.

## Cómo correr

Los archivos `.js` y `.mjs` se corren directo con Node, desde esta carpeta:

```bash
node 1.1-variables-y-funciones.js
```

(reemplazar el nombre de archivo por el que corresponda en cada caso).

`1.7` usa la extensión `.mjs` (en vez de `.js`) para poder usar `await` de
nivel superior sin necesitar un `package.json` con `"type": "module"`.

## Ejercicios guiados

Para cada archivo: correrlo, predecir la salida antes de correrlo, y
después probar la variante propuesta.

- **`1.1-variables-y-funciones.js`** — `const` vs `let`, función clásica
  vs arrow function. _Para probar_: agregar un tercer parámetro a
  `saludar` con un valor por defecto (`function saludar(nombre, saludo = "Hola")`).
- **`1.2-objetos-arrays-nullish.js`** — acceso a propiedades, `??`.
  _Para probar_: cambiar `persona.apodo` por `persona.edad ?? 99` y ver
  por qué el resultado no es 99 (`edad` sí está definida).
- **`1.3-condicionales-y-loops.js`** — `if`/`else`, ternario, `for...of`.
  _Para probar_: sumar todos los elementos de `numeros` dentro del loop.
- **`1.4-destructuring-y-spread.js`** — desestructurar objetos/arrays,
  spread. _Para probar_: desestructurar solo `edad` (sin `nombre`) y
  renombrarla (`const { edad: anios } = persona`).
- **`1.5-metodos-de-array.js`** — `map`/`filter`/`find`. _Para probar_:
  encadenar `filter` + `map` en una sola línea (quedarse con los pares y
  después duplicarlos).
- **`1.6-callbacks.js`** — la forma "old school" de manejar código
  asíncrono, con callback (antes de que existieran las Promises). Dos
  pasos encadenados, cada uno anidado dentro del callback del anterior —
  solo para que se sepa que existe y se vea por qué es menos legible que
  `1.7`. _Para probar_: agregar un tercer paso, anidado dentro del
  segundo, y notar cuánto crece la indentación.
- **`1.7-async-await.mjs`** — los mismos dos pasos asíncronos, pero con
  `async`/`await` sobre una Promise: se leen de arriba a abajo, sin
  anidar. Los `console.log` numerados muestran además que pedir los datos
  no bloquea el resto del programa. _Para probar_: cambiar el tiempo de
  espera (500 → 1000) y ver que el orden de los pasos 1/2/3 no cambia (2
  siempre antes que 3): lo único que se mueve es cuánto tarda en aparecer
  "3.".
- **`2.1-bug-que-ts-atrapa.js`** / **`2.1-bug-que-ts-atrapa.ts`** — el
  mismo bug en JS (corre, falla en silencio) y en TS (no compila). Ver
  la sección siguiente para cómo probar el `.ts`.

## El archivo `.ts`

`2.1-bug-que-ts-atrapa.ts` no compila a propósito: es la versión con
TypeScript de `2.1-bug-que-ts-atrapa.js`, para ver el error marcado *antes*
de correr el código. Dos formas de verlo (sin usar playgrounds online):

- Abrir el archivo en el editor — VS Code lo tipa automáticamente sin
  instalar nada y subraya el error
- O, si ya se instaló TypeScript en la máquina:
  `npx tsc --noEmit 2.1-bug-que-ts-atrapa.ts`
