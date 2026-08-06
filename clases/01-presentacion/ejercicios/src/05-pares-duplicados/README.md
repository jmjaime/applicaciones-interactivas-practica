# 05 — Pares duplicados

**Tema:** métodos de array (`filter` + `map` encadenados).

## Consigna

Completar `pares-duplicados.ts`: recibe un array de números, se queda solo con los
pares y duplica cada uno.

```ts
paresDuplicados([1, 2, 3, 4]); // [4, 8]
paresDuplicados([1, 3, 5]);    // []
```

Pista: `numeros.filter(...).map(...)` — el resultado de `filter` es un array, así que se
le puede encadenar `map` directo.

## Cómo validar

```bash
npm test -- 05-pares-duplicados
```

## Documentación relacionada

- [MDN — Array.prototype.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN — Array.prototype.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
