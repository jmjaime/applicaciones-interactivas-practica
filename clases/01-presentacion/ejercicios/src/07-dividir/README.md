# 07 — Dividir

**Tema:** TypeScript — un resultado que puede no existir (`number | undefined`).

## Consigna

Completar `dividir.ts`: recibe dos números y devuelve el resultado de dividirlos, salvo
que `b` sea `0` — en ese caso no hay resultado válido, así que se devuelve `undefined`
en vez de operar con `Infinity` o `NaN`.

```ts
dividir(10, 2); // 5
dividir(5, 0);  // undefined
```

El tipo de retorno `number | undefined` es una **unión de tipos**: el valor devuelto
puede ser un `number` **o** `undefined`, y quien llama a la función tiene que
contemplar ambos casos (TypeScript lo obliga si después intentás usar el resultado como
si fuera siempre un número).

## Cómo validar

```bash
npm test -- 07-dividir
```

## Documentación relacionada

- [TypeScript Handbook — Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Handbook — el tipo `undefined`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-billion-dollar-mistake)
