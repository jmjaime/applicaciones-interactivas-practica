# CLI intro: calculadora + filtro JSON

Setup práctico de la Parte 2 de Clase 1. Este proyecto ya viene armado (`package.json`,
`tsconfig.json`, `jest.config.ts`, scripts) — para arrancar alcanza con:

```bash
cd clases/01-presentacion/ejemplos/04-cli-ts-intro
npm install
```

El trabajo es completar los `// TODO` que quedan en el código.

## 1. La calculadora

`src/operaciones.ts` ya tiene resuelto el caso `sumar`. Completar el caso `restar`
(`a - b`) donde dice `// TODO`.

Correr:

```bash
npm run calc -- sumar 2 3   # ya funciona -> 5
npm run calc -- restar 5 2  # completar el TODO para que funcione -> 3
```

`src/calculadora.ts` no hace falta tocarlo — lee `process.argv`, llama a `calcular(...)`
y muestra el resultado (o un error si la operación no existe).

## 2. Filtrar una lista en JSON

`src/filtrar.ts` ya tiene resuelto el filtro por `activo`. Completar el filtro por
`nombre` donde dice `// TODO` (comparar `persona.nombre` con `valor`).

Correr:

```bash
npm run filtrar -- activo true   # ya funciona -> Ada, Grace y Linus
npm run filtrar -- nombre Ada    # completar el TODO para que funcione -> Ada
```

Los datos están en `data/personas.json`.

## 3. Tests con Jest

`src/operaciones.spec.ts` ya tiene un test para `sumar` y un `it.todo(...)` para
`multiplicar` — `it.todo` marca un test pendiente, aparece en el resultado como "todo"
sin fallar. Se completa en el ejercicio de abajo.

Correr `npm test`.

## 4. Ejercicio incremental (en parejas)

1. Agregar la operación `multiplicar` (y, opcional, `dividir` cuidando la división por
   cero) en `operaciones.ts`.
2. Si `a` o `b` no son números válidos, mostrar un mensaje de error claro en vez de operar
   con `NaN`.
3. Extender `filtrar.ts` para soportar un filtro por `edad` con comparación numérica (por
   ejemplo `npm run filtrar -- edad mayor 40`), no solo igualdad exacta.
4. Completar el test pendiente (`it.todo`) de `multiplicar` y, si da el tiempo, escribir uno
   para el nuevo filtro.
