# Clase 10 — Ejemplos

Demos en vivo de la clase, en el mismo orden que las slides. Todo es
HTML/CSS/JS estático, **sin npm ni build**: lo que se escribe es lo que
corre el navegador. App conductora: el **listado de propiedades** (la home
del Interesado en el TPO).

## Cómo correrlos

Los bloques 1 y 2 se abren con doble click. El bloque 3 hace `fetch` a un
JSON, y `fetch` no funciona sobre `file://`: hay que servir la carpeta por
HTTP. Cualquiera de estas opciones alcanza:

```bash
cd ejemplos
npx serve          # http://localhost:3000  (requiere Node, ya instalado para el TPO)
```

O la extensión **Live Server** de VS Code (botón "Go Live"). Después, abrir
`index.html`.

## 1 · HTML (`1-html/`)

### 1.1 **El documento es un árbol** (`1.1-documento.html`)
Un documento completo y chico (head + listado con dos cards) para recorrer
en DevTools → Elements: anidamiento, padre/hijos/hermanos, y que editar un
nodo cambia la pantalla pero no el archivo.

### 1.2 **HTML semántico** (`1.2-semantica.html`)
El listado con `header`/`nav`/`main`/`article`/`aside`/`footer`, sin CSS.
Muestra el estilo por defecto del navegador y que la semántica no cambia
cómo se ve, sino qué *significa* (accesibilidad, buscadores).

### 1.3 **Formularios** (`1.3-formulario.html`)
Pedido de visita con `label`, tipos de `input`, `fieldset` y validación
nativa (`required`, `pattern`, `minlength`). Enviar el form muestra cómo se
mandaban datos antes de las SPA (navegación con query string).

## 2 · CSS (`2-css/`)

### 2.1 **Selectores y cascada** (`2.1-cascada.html`)
Cuatro reglas que apuntan al mismo elemento: checkpoint de predicción
sobre especificidad, orden y herencia.

### 2.2 **Box model** (`2.2-box-model.html`)
Dos cards con el mismo `width` y distinto tamaño real: `content-box` vs.
`border-box`, e `inline` vs. `block`.

### 2.3 **Flexbox** (`2.3-flexbox.html`)
Header con logo y nav, y la fila precio + badge de la card. Layout en una
dimensión, eje principal y cruzado.

### 2.4 **Grid y responsive** (`2.4-grid-responsive.html`)
Grilla de cards con `repeat(auto-fill, minmax(...))` y layout de página
mobile first con una media query.

## 3 · JavaScript y el DOM (`3-js/`)

Comparten `estilos.css` (lo armado en el bloque 2) y `../datos/propiedades.json`.

### 3.1 **Leer y modificar el DOM** (`3.1-dom.*`)
`querySelector`, `textContent`, `classList`, `dataset`, `createElement` y
`append`. Pensado para replicarlo línea por línea en la Console.

### 3.2 **Eventos** (`3.2-eventos.*`)
Favoritos con delegación de eventos y un buscador con `preventDefault`. El
estado vive *en el DOM* (una clase CSS): el 🔧 del archivo lleva a
desincronizar el contador a propósito.

### 3.3 **Render desde datos + fetch** (`3.3-render-fetch.*`)
`fetch` del JSON, estados de carga/error y una función `crearCard(propiedad)`
que convierte un objeto en un nodo: un "componente" escrito a mano.
Incluye por qué los datos van con `textContent` y no dentro de `innerHTML` (XSS).

### 3.4 **Estado + render** (`3.4-estado-render.*`)
El puente a React: un objeto `estado` como única fuente de verdad, una
función `render()` que dibuja todo desde él, y eventos que solo cambian
el estado. Filtros por texto, operación y favoritos, con contador siempre
consistente. La Clase 11 rehace esta misma pantalla en React para comparar
lado a lado.
