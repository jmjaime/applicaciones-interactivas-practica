# Clase 12 — Estado y formularios

La Clase 11 terminó con una pantalla que se ve y reacciona. En esta, el
usuario **cambia los datos**: estado en profundidad (snapshots, objetos y
arrays sin mutar), estado compartido entre componentes, formularios y un
primer uso de refs. Los ejemplos siguen sobre el **listado de
propiedades** del comprador; la práctica pasa al lado del vendedor.

## Slides

- [slides/clase12-slides.html](slides/clase12-slides.html)

## Contenido

1. **Estado en profundidad**: el estado como foto de cada render, función actualizadora, objetos y objetos anidados con spread, arrays sin mutar (`[...a, x]`, `filter`, `map`, `[...a].sort()`), qué guardar en el estado y qué calcular (`ejemplos/src/1.1-snapshot/`, `ejemplos/src/1.2-objetos-arrays/`).
2. **Compartir estado**: subir el estado al ancestro común, una sola fuente de verdad, el estado atado a la posición y `key` para reiniciarlo (`ejemplos/src/2.1-compartir/`).
3. **Formularios**: `onSubmit` y `preventDefault()`, formulario controlado con un objeto y un solo handler, cada tipo de input, validación calculada, cuándo mostrar los errores, validación del cliente vs. del servidor, y formularios no controlados con `FormData` (`ejemplos/src/3.1-controlado/`, `ejemplos/src/3.2-formdata/`).
4. **Refs**: `useRef` para operar sobre el DOM (foco) y la diferencia entre ref y estado (`ejemplos/src/4.1-refs/`).

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

En `ejercicios/`: las pantallas del **Vendedor** en el TPO, una carpeta
por bloque: solicitudes de visita, bandeja de consultas, el formulario
para publicar una propiedad y el foco en sus errores. Cada carpeta es un
punto de partida, así que un bloque se puede empezar aunque el anterior no
esté terminado. Al final hay un integrador: **Mis propiedades**, el de la
Clase 11, ahora con alta y edición. Enunciados y requisitos en el
[README de ejercicios](ejercicios/README.md).
