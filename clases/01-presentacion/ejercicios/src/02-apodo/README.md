# 02 — Apodo

**Tema:** objetos y el operador nullish coalescing (`??`).

## Consigna

Completar `obtenerApodo.ts`: recibe una `persona` con `nombre` y un `apodo` opcional
(puede no venir, o venir en `null`), y debe devolver el apodo si tiene un valor real, o
el nombre si no.

```ts
obtenerApodo({ nombre: "Ada", apodo: "Ada L." }); // "Ada L."
obtenerApodo({ nombre: "Grace", apodo: null });   // "Grace"
obtenerApodo({ nombre: "Linus" });                // "Linus"
```

Usar `??`, no `||` — `??` solo cae al valor por defecto con `null`/`undefined` (con
`||` un apodo vacío `""` o `0` también caerían al default, que no es lo que queremos acá).

## Cómo validar

```bash
npm test -- 02-apodo
```

## Documentación relacionada

- [MDN — Operador nullish coalescing (`??`)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [TypeScript Handbook — Optional Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)
