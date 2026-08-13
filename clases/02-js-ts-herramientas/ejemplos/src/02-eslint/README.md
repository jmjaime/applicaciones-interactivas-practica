# 2. ESLint

No es un ejemplo de código: es la configuración de lint del proyecto
(`../../eslint.config.mjs`, flat config con `@eslint/js` +
`typescript-eslint`). Corresponde al Bloque 2 de `../../../slides/clase2-slides.html`.

```bash
npm run lint       # revisa src/**/*.ts
npm run lint:fix    # corrige lo que se puede arreglar solo
```

## Provocar y arreglar un error real

El repo ya está limpio (`npm run lint` no tira nada). Para ver ESLint en
acción, pegá esto al final de `01-express-basico/example.ts`, corré
`npm run lint` y mirá el error que tira — después borralo, no lo dejes
commiteado:

```ts
const noSeUsa = 42; // 'noSeUsa' is assigned a value but never used
```
