# Clase 2 — JS/TS y herramientas de desarrollo

Continúa directo desde la Parte 2 de la Clase 1: ese mismo proyecto TypeScript (calculadora + filtro) se convierte acá en un servidor Express real, en 5 bloques.

## Slides

- [slides/clase2-slides.html](slides/clase2-slides.html)

## Contenido

1. **Express básico** — primer servidor, rutas con parámetros (`ejemplos/src/01-express-basico/`).
2. **ESLint** — config flat (`eslint.config.mjs`) para mantener el código consistente (`ejemplos/src/02-eslint/`).
3. **Validaciones: manual y con Zod** — dos formas de validar el body de un request (`ejemplos/src/03-validaciones/`).
4. **Filtrar, dar forma y modificar datos** — query params, destructuring y spread sobre un array en memoria (`ejemplos/src/04-filtrar-modificar/`).
5. **Llamado a una API externa** — consumo de [Open-Meteo](https://open-meteo.com/) con `fetch`/`await`, encadenando dos llamadas (`ejemplos/src/05-api-externa/`).

## Cómo ejecutar

```bash
cd ejemplos
npm install
npm run dev   # http://localhost:3000
```

Ver el [README de ejemplos](ejemplos/README.md) para el detalle de cada endpoint.

## Ejercicios

`ejercicios/` — mismos temas que los ejemplos, con casos propios (ninguno se resuelve copiando el ejemplo), más un ejercicio integrador. Ver su [README](ejercicios/README.md).

```bash
cd ejercicios
npm install
npm test
```

## Autoestudio

- [tarea-para-el-hogar.md](tarea-para-el-hogar.md) — lectura corta sobre `==` vs `===`, el modelo prototipal de objetos y el event loop, con fuentes oficiales de MDN.
