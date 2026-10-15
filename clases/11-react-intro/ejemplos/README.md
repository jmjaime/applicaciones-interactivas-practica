# Ejemplos — Clase 11: Introducción a React

## Instalación

```bash
npm install
npm run dev          # http://localhost:5173 → índice de ejemplos
```

Cada ejemplo es una app independiente dentro del mismo proyecto: se abre
desde el índice o directo con `?ej=N.M` en la URL (p. ej.
`http://localhost:5173/?ej=4.2`). Todos usan `src/datos/propiedades.json`
(el mismo de la clase pasada) y `src/estilos.css` (los estilos del listado de
la clase pasada).

## Estructura de ejemplos

### 1. React y JSX (`1.1-jsx/`)

Una card escrita en un solo componente con expresiones entre llaves:
precio formateado, `className` condicional, `style` como objeto, un JSX
guardado en una variable y un texto con HTML que se ve escapado.

```text
?ej=1.1
```

### 2. Componentes y props (`2.1-componentes/`, `2.2-props/`)

- `2.1` — La pantalla del listado partida en `Header`, `Filtros` y `Card`,
  con datos fijos: tres cards idénticas, el problema que resuelven las props.
- `2.2` — `Card` recibe `propiedad` y `esFavorita` como props tipadas; un
  `Seccion` con `children` envuelve tres cards distintas.

```text
?ej=2.1
?ej=2.2
```

### 3. Listas y condicional (`3.1-listas/`, `3.2-condicional/`)

- `3.1` — Las 8 propiedades con `map` y `key`.
- `3.2` — Ternario (badge), `&&` (tags, ❤️ en el título), return temprano
  (lista vacía) y contador en el header solo si hay favoritos.

```text
?ej=3.1
?ej=3.2
```

### 4. Eventos y estado (`4.1-estado/`, `4.2-listado/`)

- `4.1` — Dos contadores lado a lado: con `let` (no re-renderiza) y con
  `useState`. Un `console.log` en cada uno muestra cuándo se ejecuta el
  componente.
- `4.2` — El listado completo: favoritos, buscador, operación y "solo
  favoritos". Es `clases/10-html-css/ejemplos/3-js/3.4-estado-render.html` en
  React, con el estado en `Ejemplo` y los eventos que suben por props.

```text
?ej=4.1
?ej=4.2
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint
npm run preview      # sirve dist/
```

## Cómo ver el resultado

Todo se ve en el navegador. Además de la página:

- **Console**: warnings de React (falta de `key`, `class` en vez de
  `className`), los logs de render del 4.1 y, en el 4.2, los que se
  agreguen en `Card`/`Filtros` para ver qué se re-ejecuta en cada click. En desarrollo, `StrictMode`
  ejecuta cada render dos veces, por eso los logs salen duplicados.
- **Elements**: en el 4.2, escribir en el buscador y ver qué nodos
  parpadean (comparar con el 3.4 de la clase pasada).
- **React DevTools** (extensión de Chrome/Firefox) → Components: árbol de
  componentes, props y estado de cada uno.
- Cada archivo `Ejemplo.tsx` termina con un bloque `🔧 Probar:` con
  variantes para editar en vivo.
