# Ejemplos — Clase 12: Estado y formularios

## Instalación

```bash
npm install
npm run dev          # http://localhost:5173 → índice de ejemplos
```

Cada ejemplo es una app independiente dentro del mismo proyecto: se abre
desde el índice o directo con `?ej=N.M` en la URL (p. ej.
`http://localhost:5173/?ej=1.2`). Todos son pantallas del **comprador**,
sobre `src/datos/propiedades.json` (el mismo de las clases 10 y 11) y
`src/estilos.css` (los estilos de la clase pasada, más los nuevos al final).

## Estructura de ejemplos

### 1. Estado en profundidad (`1.1-snapshot/`, `1.2-objetos-arrays/`)

- `1.1`: "+3 interesados" dos veces, lado a lado. Uno usa `setN(n + 1)`
  tres veces y suma 1. El otro usa `setN((n) => n + 1)` y suma 3. En los
  dos casos, el `alert` muestra el valor de la foto.
- `1.2`: los filtros del 4.2 de la clase pasada, ahora agrupados en un
  objeto (`{ ...filtros, campo }`). Suma un comparador de hasta 3
  propiedades que guarda solo `{ id, puntaje }`. Se puede agregar
  (`[...a, x]`), quitar (`filter`), ordenar por precio (`[...a].sort()`) y
  puntuar (`map` + spread).

```text
?ej=1.1
?ej=1.2
```

### 2. Compartir estado (`2.1-compartir/`)

- `2.1`: un listado a la izquierda y un panel de detalle a la derecha.
  `seleccionadaId` y `favoritos` viven en el padre. El ❤️ del listado y el
  del panel cambian el mismo estado. Un checkbox alterna el panel con y
  sin `key`, para ver si la nota se conserva o se reinicia.

```text
?ej=2.1
```

### 3. Formularios (`3.1-controlado/`, `3.2-formdata/`)

- `3.1`: "Pedir visita" como formulario controlado. Usa un objeto `form`,
  un solo `handleChange` con `[name]`, un radio para la franja y
  validación calculada (la fecha tiene que ser futura). Los errores
  aparecen recién después del primer intento.
- `3.2`: "Hacer consulta" con `FormData`. No tiene estado ni `onChange`:
  usa `required` del navegador y `reset()` al enviar.

```text
?ej=3.1
?ej=3.2
```

### 4. Refs (`4.1-refs/`)

- `4.1`: el formulario del 3.1 con una ref por campo. Al enviar con
  errores, el foco va al primer campo inválido. Al lado están los dos
  contadores del checkpoint (`useRef` vs. `useState`).

```text
?ej=4.1
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint
npm run preview      # sirve dist/
```

## Cómo ver el resultado

Todo se ve en el navegador. Además de la página:

- **React DevTools** (extensión de Chrome/Firefox) → Components. Muestra
  dónde vive cada estado: en el 2.1, todo está en `Ejemplo` y `Listado` no
  tiene hooks. En el 3.1 se ve el objeto `form` cambiar con cada tecla. En
  el 3.2, `HacerConsulta` no tiene ningún hook.
- **Console**: los `console.log` que se agreguen en las variantes. En
  desarrollo, `StrictMode` ejecuta cada render dos veces, por eso los logs
  salen duplicados.
- Cada archivo `Ejemplo.tsx` termina con un bloque `🔧 Probar:` con
  variantes para editar en vivo. Varias rompen el ejemplo a propósito
  (`push` + `set`, `sort` sin copiar, sacar el `preventDefault()`).
