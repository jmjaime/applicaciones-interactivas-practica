# 06 — Esperar dato

**Tema:** `async`/`await` sobre una Promise.

## Consigna

Completar `esperar-dato.ts`: `procesarDato` debe esperar el resultado de
`obtenerDatoAsync()` (ya está resuelta, simula una llamada asíncrona con `setTimeout`) y
devolverlo en mayúsculas.

```ts
await procesarDato(); // "DATO"
```

Pista: `await` se usa adentro de una función `async` y "desenvuelve" el valor de la
Promise — después de esa línea `dato` ya es un `string`, no una `Promise<string>`.

## Cómo validar

```bash
npm test -- 06-esperar-dato
```

## Documentación relacionada

- [MDN — función async](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN — operador await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await)
- [MDN — Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
