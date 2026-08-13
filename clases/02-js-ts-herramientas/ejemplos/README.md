# Ejemplos — Clase 2: JS/TS y herramientas de desarrollo

Un solo servidor Express+TS que va creciendo bloque a bloque, en el mismo
orden que `../slides/clase2-slides.html`. Cada carpeta de `src/` es un tema; todas
se montan juntas en `src/app.ts`.

## Instalación

```bash
npm install
npm run dev   # http://localhost:3000, recarga automática
```

## Estructura de ejemplos

### 1. **Express básico** (`01-express-basico/`)

Primer servidor: routing con parámetros de ruta.

```bash
# GET /saludo/:nombre
```

### 2. **ESLint** (`02-eslint/`)

Config flat (`eslint.config.mjs`) + cómo provocar y arreglar un error real.

```bash
npm run lint
```

### 3. **Validaciones: manual y con Zod** (`03-validaciones/`)

El mismo caso (`titulo` requerido) resuelto a mano y con un schema de Zod,
para comparar.

```bash
# POST /tareas-manual
# POST /tareas-zod
```

### 4. **Filtrar, dar forma y modificar** (`04-filtrar-modificar/`)

Un array de tareas en memoria: filtrar con query params, dar forma a la
respuesta con destructuring, modificar con spread. Errores genéricos
(`if (!encontrado) res.status(404)...`), sin clases propias ni middleware.

```bash
# GET   /tareas
# GET   /tareas?estado=pendiente
# GET   /tareas/:id/resumen
# PATCH /tareas/:id
```

### 5. **API externa** (`05-api-externa/`)

`fetch` con `async`/`await`, encadenando dos llamadas a Open-Meteo
(geocoding + forecast).

```bash
# GET /clima/:ciudad
```

## Otros scripts

```bash
npm run build       # tsc → dist/
npm start           # node dist/server.js
npm run typecheck   # tsc --noEmit
```

## Coherencia con `ejercicios/`

Cada bloque de acá tiene su ejercicio espejo en `../ejercicios/` — mismo
tema, mismo naming (`example.ts` acá ↔ `exercise.ts` allá), pero
**dominio distinto** dentro del mismo caso general (ver
`../ejercicios/README.md`): esta clase valida/expone "tareas" y "clima",
el ejercicio usa entidades y endpoints propios para que no se resuelvan
copiando y pegando este código.
