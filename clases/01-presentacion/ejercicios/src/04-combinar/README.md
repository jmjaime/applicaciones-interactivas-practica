# 04 — Combinar (spread)

**Tema:** spread syntax e inmutabilidad.

## Consigna

Completar `combinar.ts`: `actualizarEdad` recibe una `persona` y una `nuevaEdad`, y debe
devolver un objeto **nuevo** con los mismos datos de `persona` pero con `edad`
reemplazada — sin modificar el objeto original.

```ts
const ada = { nombre: "Ada", edad: 30 };
actualizarEdad(ada, 31); // { nombre: "Ada", edad: 31 }
ada.edad;                // sigue siendo 30 — no se mutó el original
```

Pista: `{ ...persona, edad: nuevaEdad }` copia todos los campos de `persona` y después
pisa `edad` con el nuevo valor.

## Cómo validar

```bash
npm test -- 04-combinar
```

## Documentación relacionada

- [MDN — Spread syntax](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN — Object spread en la creación de objetos](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_en_literales_de_objeto)
