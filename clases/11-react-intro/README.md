# Clase 11 — Introducción a React: componentes y JSX

Primeros pasos con React: JSX, componentes con props, listas y renderizado
condicional, y un primer estado con `useState`. Todo se construye sobre el
**listado de propiedades** de la Clase 10, que se rehace en React pieza por
pieza para comparar las dos versiones lado a lado.

## Slides

- [slides/clase11-slides.html](slides/clase11-slides.html)

## Contenido

1. **React y JSX**: qué agrega React al patrón `estado → render()` (reconciliación y Virtual DOM), JSX y su transpilación, el proyecto Vite + React + TS, reglas de JSX, llaves y escape (`ejemplos/src/1.1-jsx/`).
2. **Componentes y props**: un componente por archivo, el árbol de componentes, props tipadas con TypeScript, props de solo lectura y `children` (`ejemplos/src/2.1-componentes/`, `ejemplos/src/2.2-props/`).
3. **Listas y renderizado condicional**: `map` y `key`, ternario, `&&` y return temprano (`ejemplos/src/3.1-listas/`, `ejemplos/src/3.2-condicional/`).
4. **Eventos y un primer estado**: eventos en JSX, `let` vs. `useState`, arrays nuevos en el estado, los datos bajan y los eventos suben, lo derivado se calcula, input controlado (`ejemplos/src/4.1-estado/`, `ejemplos/src/4.2-listado/`).

## Cómo ejecutar

Hace falta Node ≥ 20. Ejemplos y ejercicios son dos proyectos Vite
independientes:

```bash
cd ejemplos      # o cd ejercicios
npm install
npm run dev      # http://localhost:5173 → índice
```

Cada ejemplo o ejercicio se elige desde el índice o con `?ej=` en la URL.
Ver el [README de ejemplos](ejemplos/README.md) para el detalle de cada
demo. Conviene tener instalada la extensión **React DevTools** en el
navegador.

## Práctica

En `ejercicios/`: el **detalle de una propiedad** (pantalla del Interesado
en el TPO), una carpeta por bloque. Cada carpeta es un punto de partida,
así que un bloque se puede empezar aunque el anterior no esté terminado.
Al final hay un integrador: **Mis propiedades**, la pantalla del Vendedor
para mover sus propiedades por su ciclo de vida. Enunciados y requisitos en
el [README de ejercicios](ejercicios/README.md).
