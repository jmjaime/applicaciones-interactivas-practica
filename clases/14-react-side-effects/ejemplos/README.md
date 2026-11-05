# Ejemplos — Clase 14: Side Effects

## Instalación

```bash
npm install
npm run dev          # API en :3001 y http://localhost:5173 → índice de ejemplos
```

`npm run dev` levanta dos procesos en la misma terminal: la API (`[api]`, con
un log de cada request) y Vite (`[web]`). La API (`api/server.ts`) es Express en
memoria, con demoras artificiales para que se vean los estados de carga. La URL
base se puede cambiar con `VITE_API_URL` (ver `.env.example`). Los puertos no
chocan con los de `ejercicios/` (`:3002` y `:5174`): los dos proyectos se pueden
levantar a la vez.

Cada ejemplo es una app independiente, con su propio router, montada bajo
`/<id>/`. Todos están del lado del **comprador**, sobre las propiedades de las
clases anteriores.

## Estructura de ejemplos

### 1. `useEffect` y el primer fetch (`1.1-bucle/`, `1.2-listado/`, `1.3-sincronizar/`)

- `1.1`: el `fetch` en el cuerpo del componente y el bucle que genera. Tiene un
  tope de 20 requests para no saturar la API durante la demo.
- `1.2`: el mismo listado con `useEffect`, una función `async` adentro, `res.ok`
  y los estados de carga, error y vacío.
- `1.3`: effects sin red: los tres casos del array de dependencias en la
  consola, el título de la pestaña y el foco al montar.

```text
/1.1/
/1.2/
/1.3/
```

### 2. Dependencias y cleanup (`2.1-race-condition/`, `2.2-debounce/`, `2.3-carrusel/`)

- `2.1`: el detalle depende de `:id`. La propiedad 1 tarda 3 segundos, y la misma
  pantalla está en dos versiones: con la race condition y con `AbortController`.
- `2.2`: búsqueda con la query en la URL. Un mismo cleanup cancela el timer del
  debounce y el request en curso.
- `2.3`: carrusel con `setInterval` y un listener de teclado, ambos con cleanup.

```text
/2.1/con-race/2
/2.1/con-abort/99
/2.2/?q=palermo
/2.3/
```

### 3. Cuándo no usar un effect y cómo escribir datos (`3.1-effects-que-sobran/`, `3.2-action-state/`)

- `3.1`: la misma pantalla dos veces, lado a lado: con effects que sobran
  (derivado copiado en el estado, reset manual, estado-bandera) y sin ellos
  (cálculo en el render, `key`, handler).
- `3.2`: "Pedir visita" con `<form action>` y `useActionState`: botón pendiente,
  errores 400 de la API y valores conservados después del reset del form.

```text
/3.1/
/3.2/
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint (avisa sobre dependencias faltantes en los effects)
npm run preview      # sirve dist/ (la API se levanta aparte)
```

## Cómo ver el resultado

Además de la página:

- **DevTools → Network**: cada request y su estado, `(canceled)` cuando se
  aborta, y la opción "Offline" para probar los errores.
- **La terminal**: la API registra cada request que recibe. En desarrollo,
  StrictMode monta dos veces: dos `GET` al entrar a una pantalla es lo esperado.
- **DevTools → Console**: los logs de los ejemplos 1.3, 2.3 y 3.1.
- Cada `rutas.tsx` termina con un bloque `🔧 Probar:` con variantes para editar
  y probar.
