# Clase 1 — Presentación

## Slides

- [`slides/clase1-materia-slides.html`](slides/clase1-materia-slides.html) — apertura
- [`slides/clase1-parte1-apps-web-slides.html`](slides/clase1-parte1-apps-web-slides.html) — Aplicaciones Web
- [`slides/clase1-parte2-intro-js-slides.html`](slides/clase1-parte2-intro-js-slides.html) — Intro a JS, TS y Node

## Actividad: inspeccionar una página real (Parte 1)

Abrí `ejemplos/01-inspeccionar-pagina/pagina-demo.html` en el navegador con las DevTools
abiertas (F12). La página carga estilos, JS e imágenes desde varios dominios distintos —
es a propósito, para poder observar:

- **Network**: en qué orden salen los requests y cuáles van en paralelo.
- **Elements**: cómo quedó el DOM generado (comparado con "Ver código fuente").
- **Styles / Computed**: qué reglas del CSSOM se aplican a cada elemento.

El `<details>` al final de la página trae una referencia de colores del
waterfall de Network (Queueing, DNS Lookup, SSL, Waiting TTFB, Content
Download, etc.) para interpretar los requests sin depender de que el
profesor lo explique en el momento.

## Sintaxis básica de JS y TS (Parte 2)

`ejemplos/02-sintaxis-js-ts/` — un archivo por concepto (variables, objetos/arrays,
condicionales, destructuring, métodos de array, callbacks, async/await, y el demo de
TypeScript), corribles directo con `node`. Instrucciones y ejercicios guiados en su
propio `README.md`.

## Setup práctico: Node + TypeScript + Jest (Parte 2)

Dos carpetas, en orden:

- `ejemplos/03-setup-node-ts/` — guía para armar un proyecto Node + TypeScript desde
  cero, terminando en un `Hello, world!`.
- `ejemplos/04-cli-ts-intro/` — proyecto ya armado (`npm install` y listo) con una
  calculadora y un filtro de JSON por línea de comandos. Parte del código ya está
  resuelto, y hay `// TODO` para completar.
