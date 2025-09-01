# Repaso TypeScript + npm + Jest

## Instalación

```
npm i
```

o

```
npm install
```

## Scripts principales

- `npm run dev`: ejecuta `src/index.ts` (mensaje y guía)
- `npm test`: corre toda la suite de tests
- Por ejercicio:
  - `npm run sum`
  - `npm run count-char`
  - `npm run factorial`
  - `npm run most-frequent-char`
  - `npm run class-filter`

## Ejercicios

1. `sum`

- Descripción: sumar dos números
- Archivo: `src/01-sum/exercise.ts`
- Test: `src/01-sum/exercise.spec.ts`

2. `count-char`

- Descripción: contar ocurrencias de un carácter en un string (distingue mayúsculas/minúsculas)
- Archivo: `src/02-count-char/exercise.ts`
- Test: `src/02-count-char/exercise.spec.ts`

3. `factorial`

- Descripción: calcular el factorial de un entero no negativo (validar entrada)
- Archivo: `src/03-factorial/exercise.ts`
- Test: `src/03-factorial/exercise.spec.ts`

4. `most-frequent-char`

- Descripción: devolver el carácter más frecuente de un string; ante empate, devolver el primero según lectura izquierda→derecha; distingue mayúsculas/minúsculas
- Archivo: `src/04-most-frequent-char/exercise.ts`
- Test: `src/04-most-frequent-char/exercise.spec.ts`

5. `reverse-string` (para que el alumno implemente todo)

- Descripción: invertir un string ("hola" → "aloh"). Evitar usar `Array.prototype.reverse()` para practicar bucles y construcción de strings.
- Archivo: `src/05-reverse-string/exercise.ts`
- Test: `src/05-reverse-string/exercise.spec.ts` (a crear por el alumno)
- Script: `npm run reverse-string` (a crear por el alumno en package.json)

- 6. `class-filter` (clases y filtrado)

- Descripción: crear clase `Student` y función para encontrar el alumno con mejor score con filtro opcional.
- Archivo: `src/06-class-filter/exercise.ts`
- Test: `src/06-class-filter/exercise.spec.ts`

## Orden recomendado

1. sum
2. count-char
3. factorial
4. most-frequent-char
5. reverse-string
6. class-filter

## ¿Cómo trabajar cada ejercicio?

- Abrí el archivo `src/<numero>-<nombre>/exercise.ts` y leé el enunciado (comentarios al inicio).
- Implementá la función pedida y usá los tests como guía de comportamiento.
- Corré los tests del ejercicio con el script correspondiente, por ejemplo:
  - `npm run sum`
  - `npm run count-char`
  - `npm run factorial`
  - `npm run most-frequent-char`
  - Para `reverse-string`, creá el test y el script primero.
- Si algo falla, leé el mensaje de Jest, ajustá tu código y volvé a correr.

## Recursos útiles (lectura recomendada)

- TypeScript: tipos básicos y funciones:
  - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- JavaScript Strings (métodos comunes):
  - https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
- Bucles en JavaScript (`for`, `for...of`):
  - https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for
  - https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for...of
- Jest (matchers `expect`):
  - https://jestjs.io/docs/expect
- npm scripts (cómo ejecutar scripts):
  - https://docs.npmjs.com/cli/v10/using-npm/scripts
