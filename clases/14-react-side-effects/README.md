# Clase 14 — Side Effects

En la Clase 13, `repositorio.ts` prometía que cada función iba a pasar a ser
un request. Un request tarda, puede fallar y responde después de que el
componente retornó su JSX: ¿dónde se escribe? En esta clase, traer y
escribir datos contra una API con `useEffect`, cleanup y Form Actions. Los
ejemplos están del lado del **comprador** (el sitio público); la práctica,
del lado del **vendedor** (el panel).

## Slides

- [slides/clase14-slides.html](slides/clase14-slides.html)

## Contenido

1. **`useEffect` y el primer fetch**: render puro y side effects, handler vs. effect, los tres casos del array de dependencias, `async` adentro del effect, `res.ok`, los estados de carga, error y vacío, y el doble montaje de StrictMode (`ejemplos/src/1.1-bucle/`, `ejemplos/src/1.2-listado/`, `ejemplos/src/1.3-sincronizar/`).
2. **Dependencias y cleanup**: qué va en las dependencias, race conditions y `AbortController`, timers y listeners, más de un effect y búsqueda con debounce (`ejemplos/src/2.1-race-condition/`, `ejemplos/src/2.2-debounce/`, `ejemplos/src/2.3-carrusel/`).
3. **Cuándo no usar un effect y cómo escribir datos**: datos derivados, resets con `key`, lógica de eventos en handlers, `<form action>` y `useActionState` con los errores del backend (`ejemplos/src/3.1-effects-que-sobran/`, `ejemplos/src/3.2-action-state/`).

## Cómo ejecutar

Ejemplos y ejercicios son dos proyectos Vite independientes, cada uno con su
propia API Express en memoria (`api/`). `npm run dev` levanta las dos cosas
en la misma terminal:

```bash
cd ejemplos      # API en :3001, http://localhost:5173 → índice
npm install
npm run dev

cd ejercicios    # API en :3002, http://localhost:5174 → índice
npm install
npm run dev
```

Los puertos no chocan entre sí ni con el back del TPO (`:3000`), así que se
pueden levantar a la vez. Los de Vite son fijos: si uno está ocupado, Vite
corta con un error en vez de pasar a otro puerto. Cada ejemplo o ejercicio es
una app aparte bajo `/<id>/` (p. ej. `http://localhost:5173/2.1/con-race/2` o
`http://localhost:5174/2/`). Ver el [README de ejemplos](ejemplos/README.md)
para el detalle de cada demo.

## Práctica

En `ejercicios/`: el **panel del Vendedor** de la Clase 13, que deja los
datos en memoria y pasa a hablar con una API. Un ejercicio por bloque: el
panel desde la API, filtros y detalle con cancelación y debounce, y effects
que sobran con el alta vía `useActionState`. Cada carpeta es un punto de
partida que trae resuelta la anterior. Al final hay un integrador de
autoestudio: **Panel conectado** (edición, confirmar o rechazar visitas y
contador con polling). Enunciados y requisitos en el
[README de ejercicios](ejercicios/README.md).
