# 08 — Coordenada

**Tema:** TypeScript — definir un tipo propio (`type` alias).

## Consigna

Completar `coordenada.ts` en dos pasos:

1. Definir el tipo `Coordenada` (hoy es `unknown`, un placeholder) como un objeto con
   dos campos numéricos: `x` e `y`.
2. Implementar `distanciaAlOrigen`, que recibe un `Coordenada` y devuelve su distancia
   al punto `(0, 0)`, con la fórmula `Math.sqrt(x² + y²)`.

```ts
distanciaAlOrigen({ x: 3, y: 4 }); // 5
distanciaAlOrigen({ x: 0, y: 0 }); // 0
```

`unknown` es un tipo que casi no deja hacer nada con el valor (a propósito, para que no
compile mientras el tipo real no esté definido) — una vez que `Coordenada` tenga `x` e
`y`, vas a poder acceder a `punto.x` y `punto.y` sin problema.

## Cómo validar

```bash
npm test -- 08-coordenada
```

## Documentación relacionada

- [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook — Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [MDN — Math.sqrt()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)
