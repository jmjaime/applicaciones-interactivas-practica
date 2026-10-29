# Ejercicios — Clase 13: React Router y styling

## Instalación

```bash
npm install
npm run dev          # http://localhost:5173 → índice de ejercicios
```

Temática conductora: el **panel del Vendedor** en el TPO, una página por
sección (Mis propiedades, Visitas, Consultas, Reportes), más el detalle,
el alta y la edición de una propiedad.

Los ejercicios van uno por bloque (no uno por ejemplo): cada uno practica
juntos los temas de los ejemplos `N.x` de su bloque.

Cada carpeta es un **punto de partida** independiente, con su propio
router, y se abre en `/<N>/` (o desde el índice). Cada una trae resuelta
la anterior: si un ejercicio no se terminó, el siguiente se
puede empezar igual desde su carpeta.

Los datos están en `src/datos/repositorio.ts` (hace de backend, en
memoria: un F5 los reinicia), los tipos en `src/types.ts`, el formulario
de propiedad de la Clase 12 en `src/comun/FormularioPropiedad.tsx` y los
estilos en `src/estilos.css`. Los enunciados dicen qué clase usar en cada
elemento. React Router v8: todo se importa de `react-router`.

## Estructura de ejercicios

### 1. Rutas y navegación (`src/1-rutas/`)

- [1 · Rutas del panel](src/1-rutas/README.md): una ruta por sección, `<Link>` en vez de `<a>` y el 404.

```text
/1/
```

### 2. Parámetros y layouts (`src/2-layout/`)

- [2 · Layout y detalle](src/2-layout/README.md): `LayoutPanel` con `NavLink` y `<Outlet />`, y el detalle en `propiedades/:id`.

```text
/2/
```

### 3. La URL como estado (`src/3-navegacion/`)

- [3 · Filtros en la URL y alta](src/3-navegacion/README.md): chips de estado y buscador en la query, y el alta que redirige al detalle.

```text
/3/
```

### 4. Styling (`src/4-styling/`)

- [4 · Styling del panel](src/4-styling/README.md): la nav y los badges con CSS Modules, y barras con `style` inline.

```text
/4/
```

### 5. Integrador (`src/5-integrador/`)

- [Panel con sesión y edición](src/5-integrador/README.md): login, panel protegido que recuerda a dónde se quería ir, edición y contador de consultas.

```text
/5/
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint
npm run preview      # sirve dist/
```

## Cómo verificar

No hay tests automáticos: cada requisito del enunciado es algo que se
comprueba mirando la página, DevTools o el editor.

- **Barra de direcciones y Atrás/Adelante**: escribir URLs a mano (ids que
  no existen, filtros en la query, rutas protegidas sin sesión) y recorrer
  el historial.
- **Console**: sin errores ni warnings de React. En el 1, el mensaje de
  "arrancó de cero" no se repite al navegar.
- **DevTools → Elements**: la clase `active` de `NavLink` (2 y 3) y los
  nombres generados por CSS Modules (4 y 5).
- **DevTools → Application → Local Storage**: el `token` del integrador.
- **`npm run build`**: tiene que compilar sin errores de TypeScript.
