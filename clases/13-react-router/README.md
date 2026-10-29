# Clase 13 — React Router y styling

Hasta la Clase 12, cada demo se elegía con `?ej=N` y un `<a>` que recargaba
toda la página. En esta, cada pantalla del TPO (listado, detalle, sitio de
la inmobiliaria, panel del vendedor) tiene **su propia URL** y se navega
sin recargar, con React Router. Al final, las formas de darle estilo a una
app React. Los ejemplos están del lado del **comprador** (el sitio
público); la práctica, del lado del **vendedor** (el panel).

## Slides

- [slides/clase13-router-slides.html](slides/clase13-router-slides.html) — React Router
- [slides/clase13-styling-slides.html](slides/clase13-styling-slides.html) — Styling

## Contenido

1. **Rutas y navegación**: MPA vs. SPA, qué hace un router, `createBrowserRouter`, `<Link>` contra `<a>` y la ruta `*` para el 404 (`ejemplos/src/1.1-rutas/`).
2. **Parámetros y layouts**: `:id` + `useParams` y el caso del dato que no existe, layouts con rutas hijas y `<Outlet />`, `index`, `NavLink` y `end`, layouts anidados (`ejemplos/src/2.1-parametros/`, `ejemplos/src/2.2-layouts/`).
3. **La URL como estado**: qué estado va en la URL, `useSearchParams` (con `replace`), `useNavigate` (`replace`, `state`, `-1`) y rutas protegidas con un guardia y `<Navigate>` (`ejemplos/src/3.1-search-params/`, `ejemplos/src/3.2-navegar/`, `ejemplos/src/3.3-protegidas/`).
4. **Styling**: CSS global vs. CSS Modules, clases condicionales, `NavLink` con `className` como función, `style` inline con variables CSS y Tailwind (`ejemplos/src/4.1-css-modules/`, `ejemplos/src/4.2-dinamicos/`).

## Cómo ejecutar

Se usa **React Router v8**: todo se importa de `react-router` (el paquete
`react-router-dom` ya no existe). Pide Node ≥ 22.22; con un Node 22 más
viejo, npm solo avisa (`EBADENGINE`) y todo funciona. Ejemplos y
ejercicios son dos proyectos Vite independientes:

```bash
cd ejemplos      # o cd ejercicios
npm install
npm run dev      # http://localhost:5173 → índice
```

Cada ejemplo o ejercicio es una app aparte, con su propio router, montada
bajo `/<id>/` (p. ej. `http://localhost:5173/2.1/propiedades/3` o
`http://localhost:5173/3/`). Ver el [README de ejemplos](ejemplos/README.md)
para el detalle de cada demo.

## Práctica

En `ejercicios/`: el **panel del Vendedor** en el TPO, un ejercicio por
bloque: las rutas del panel, el layout con el detalle de una propiedad,
los filtros en la URL con el alta, y el styling del panel con CSS Modules.
Cada carpeta es un punto de partida que trae resuelta la anterior. Al
final hay un integrador: **Panel con sesión y edición** (login, rutas
protegidas y edición). Enunciados y requisitos en el
[README de ejercicios](ejercicios/README.md).
