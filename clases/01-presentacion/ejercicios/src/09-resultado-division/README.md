# 09 — Resultado de división (unión de tipos)

**Tema:** TypeScript — unión discriminada (*discriminated union*) y narrowing.

## Consigna

Completar `resultado-division.ts` en tres pasos:

1. Definir el tipo `ResultadoDivision` (hoy es `unknown`) como la unión de dos formas
   posibles:
   - `{ ok: true; valor: number }`
   - `{ ok: false; error: string }`
2. Implementar `dividirSeguro(a, b)`: si `b` es `0` devuelve la forma `ok: false` con un
   mensaje de error; si no, devuelve `ok: true` con el resultado.
3. Implementar `describirResultado(resultado)`: usa un `if (resultado.ok)` para
   distinguir qué forma es (esto es *narrowing*: dentro del `if`, TypeScript ya sabe que
   `resultado` tiene `valor`; en el `else`, que tiene `error`) y devuelve un mensaje
   distinto para cada caso.

```ts
dividirSeguro(10, 2); // { ok: true, valor: 5 }
dividirSeguro(5, 0);  // { ok: false, error: "no se puede dividir por cero" }

describirResultado({ ok: true, valor: 5 });                      // "El resultado es 5"
describirResultado({ ok: false, error: "no se puede dividir..." }); // "Error: no se puede dividir..."
```

El campo `ok` es el **discriminante**: es lo que le permite a TypeScript (y a
`describirResultado`) saber en qué forma de la unión está parado en cada rama del `if`.
Es una alternativa más segura a devolver `number | undefined` (como en el ejercicio 07):
acá el caso de error viene con un mensaje, no solo con "no hay valor".

## Cómo validar

```bash
npm test -- 09-resultado-division
```

## Documentación relacionada

- [TypeScript Handbook — Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Handbook — Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
