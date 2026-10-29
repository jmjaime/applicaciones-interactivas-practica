# Ejemplos — Clase 13: React Router y styling

## Instalación

```bash
npm install
npm run dev          # http://localhost:5173 → índice de ejemplos
```

Cada ejemplo es una app independiente, con su propio router, montada bajo
`/<id>/` (p. ej. `http://localhost:5173/2.1/propiedades/3`). Adentro de cada
ejemplo las rutas empiezan en `/`, como en una app real: `main.tsx` le pasa
el prefijo al router con `basename`. Todos están del lado del **comprador**
(el sitio público del TPO), sobre `src/datos/` (las propiedades de las
clases 10 a 12, más inmobiliarias con sus reseñas). React Router v8: todo se
importa de `react-router` (el paquete `react-router-dom` ya no existe).

## Estructura de ejemplos

### 1. Rutas y navegación (`1.1-rutas/`)

- `1.1`: el mapa de rutas (`createBrowserRouter` con un array de
  `{ path, element }`), `<Link>` contra `<a>` en el mismo header y una ruta
  `*` para el 404. La consola avisa cada vez que la app arranca de cero.

```text
/1.1/
/1.1/inmobiliarias
/1.1/cualquier-cosa
```

### 2. Parámetros y layouts (`2.1-parametros/`, `2.2-layouts/`)

- `2.1`: `/propiedades/:id` y `/inmobiliarias/:id` con `useParams()`. Un id
  que no existe muestra un mensaje en vez de romper.
- `2.2`: el mismo sitio con un layout (`<Outlet />`) que dibuja header y
  footer una sola vez, `index` routes, `NavLink` con la clase `active`, y
  el sitio de la inmobiliaria como layout anidado con pestañas
  (Propiedades / Reseñas).

```text
/2.1/propiedades/2
/2.1/propiedades/99
/2.2/inmobiliarias/2/resenas
```

### 3. La URL como estado (`3.1-search-params/`, `3.2-navegar/`, `3.3-protegidas/`)

- `3.1`: los filtros del listado (operación, tipo, texto) en
  `?operacion=…&tipo=…&q=…` con `useSearchParams()`. El buscador usa
  `replace` para no llenar el historial.
- `3.2`: "Pedir visita" en `/propiedades/:id/visita`. Al enviar,
  `navigate()` vuelve al detalle con `replace` y un `state` que muestra la
  confirmación; "Cancelar" hace `navigate(-1)`.
- `3.3`: login de mentira (guarda un `token` en `localStorage`) y el panel
  del vendedor detrás de una ruta guardia que redirige con `<Navigate>` y
  recuerda a dónde se quería ir.

```text
/3.1/?operacion=Alquiler&tipo=Departamento
/3.2/propiedades/3
/3.3/panel/consultas
```

### 4. Styling (`4.1-css-modules/`, `4.2-dinamicos/`)

- `4.1`: dos componentes con su propio `.css` y la misma clase `.titulo`,
  lado a lado: con CSS global las reglas se mezclan; con CSS Modules
  (`*.module.css`) cada uno queda con la suya.
- `4.2`: clases condicionales (card seleccionada, badge según la
  operación con `estilos[p.operacion]`), `NavLink` con `className` como
  función de `isActive`, y `style` inline con una variable CSS para la
  barra de calificación de cada inmobiliaria.

```text
/4.1/
/4.2/
/4.2/inmobiliarias
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint
npm run preview      # sirve dist/
```

## Cómo ver el resultado

Todo se ve en el navegador. Además de la página:

- **Barra de direcciones y botones Atrás/Adelante**: son parte de la demo.
  Escribir URLs a mano (ids que no existen, filtros en la query) y navegar
  el historial muestra qué guarda la URL y qué no.
- **DevTools → Network** (con "Preserve log"): un `<Link>` no pide nada al
  servidor; un `<a>` vuelve a pedir `index.html` y todo el JavaScript.
- **DevTools → Application → Local Storage**: el `token` del 3.3.
- **DevTools → Elements**: los nombres de clase reales de CSS Modules
  (`_titulo_xxxx_1`) y la clase `active` que agrega `NavLink`.
- **React DevTools → Components**: en el 2.2, el layout no se desmonta al
  navegar; solo cambia lo que hay dentro del `Outlet`.
- Cada `rutas.tsx` (o la página principal del ejemplo) termina con un
  bloque `🔧 Probar:` con variantes para editar en vivo.
