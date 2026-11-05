# Ejercicios — Clase 14: Side Effects

## Instalación

```bash
npm install
npm run dev          # API en :3002 y http://localhost:5174 → índice de ejercicios
```

`npm run dev` levanta dos procesos en la misma terminal: la API (`[api]`, con
un log de cada request) y Vite (`[web]`). Los puertos no chocan con los de
`ejemplos/` (`:3001` y `:5173`): los dos proyectos se pueden levantar a la vez.

Temática conductora: el **panel del Vendedor** de la Clase 13, que deja de usar
datos en memoria y pasa a hablar con una API.

Cada carpeta es un **punto de partida** independiente, con su propio router, y
se abre en `/<N>/` (o desde el índice). Cada una trae resuelta la anterior: si
un ejercicio no se terminó, el siguiente se puede empezar igual desde
su carpeta. La API es la misma para todas, y reiniciarla vuelve a los datos
originales.

La API está en `api/`, con las rutas del TPO y sin JWT. Los tipos están en
`src/types.ts`, la URL base en `src/comun/api.ts` y los estilos en
`src/estilos.css`.

## Estructura de ejercicios

### 1. `useEffect` y el primer fetch (`src/1-fetch/`)

- [1 · El panel desde la API](src/1-fetch/README.md): traer datos al montar, con carga y error.

```text
/1/
/1/visitas
```

### 2. Dependencias y cleanup (`src/2-dependencias/`)

- [2 · Filtros y detalle](src/2-dependencias/README.md): `:id` y query como dependencias, cancelación y debounce.

```text
/2/propiedades/2
/2/?estado=Publicada&q=dep
```

### 3. Cuándo no usar un effect y cómo escribir datos (`src/3-acciones/`)

- [3 · Effects que sobran y alta](src/3-acciones/README.md): refactor de Reportes y alta con `useActionState`.

```text
/3/reportes
/3/propiedades/nueva
```

### Integrador (`src/4-integrador/`)

- [Integrador · Panel conectado](src/4-integrador/README.md) (autoestudio): edición, confirmar o rechazar visitas y contador con polling.

```text
/4/propiedades/2/editar
/4/visitas
```

## Otros scripts

```bash
npm run build        # typecheck (tsc -b) + build de producción en dist/
npm run lint         # ESLint (avisa sobre dependencias faltantes en los effects)
npm run preview      # sirve dist/
```

## Cómo ver el resultado

- **Network**: cada request, su estado, y `(canceled)` cuando se aborta. "Offline" sirve para probar los errores.
- **La terminal**: la API registra cada request que recibe. En desarrollo, StrictMode monta dos veces: dos `GET` al entrar a una pantalla es lo esperado.
