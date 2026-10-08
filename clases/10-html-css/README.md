# Clase 10 — Fundamentos de la web: HTML, CSS y JS sobre el DOM

Repaso de los fundamentos de HTML y CSS, y una introducción a JavaScript
"plano" sobre el DOM (sin frameworks). Todo se construye sobre el
**listado de propiedades** del TPO: primero la estructura, después la
presentación y al final el comportamiento. La Clase 11 rehace esa misma
pantalla en React, para comparar las dos versiones.

## Slides

- [slides/clase10-slides.html](slides/clase10-slides.html)

## Contenido

1. **HTML**: qué recibe el navegador y cómo arma la página, anatomía y estructura de un documento, el documento como árbol, HTML semántico, formularios y validación nativa (`ejemplos/1-html/`).
2. **CSS**: selectores, cascada y especificidad, box model y `box-sizing`, `display`, Flexbox, Grid y responsive mobile first (`ejemplos/2-css/`).
3. **JavaScript y el DOM**: seleccionar, modificar y crear nodos, eventos y delegación, `fetch`, el problema de guardar el estado en el DOM y el patrón `estado → render()` (`ejemplos/3-js/`).

## Cómo ejecutar

No hay `npm install`: todo es HTML, CSS y JS estático. Los ejemplos de HTML
y CSS se abren con doble click. Los de JS (y los ejercicios del bloque 3)
usan `fetch`, que no funciona con `file://`, así que hay que servir la
carpeta por HTTP:

```bash
cd ejemplos      # o cd ejercicios
npx serve        # abrir la URL que imprime (por defecto http://localhost:3000)
```

También sirve la extensión **Live Server** de VS Code. Ver el
[README de ejemplos](ejemplos/README.md) para el detalle de cada demo.

## Práctica

En `ejercicios/`: el **perfil público de una inmobiliaria** (el "Sitio del
vendedor" del TPO), una carpeta por bloque. Cada carpeta es un punto de
partida, así que un bloque se puede empezar aunque el anterior no esté
terminado. Al final hay un integrador: el panel de **solicitudes de visita**
del Vendedor. Enunciados y requisitos en el
[README de ejercicios](ejercicios/README.md).

## Referencia

`referencia/html/` y `referencia/css/`: páginas interactivas con más
detalle de lo visto en clase (tablas, formularios, tipografía, colores,
posicionamiento, animaciones), para consultar por cuenta propia.
