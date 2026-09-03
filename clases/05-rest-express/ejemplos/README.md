# Ejemplos — Clase 5: Semántica REST y bases de Express

Un solo servidor Express+TS que va creciendo tema a tema, en el mismo
orden que `../rest-express-slides.md`. Cada carpeta de `src/` es un tema;
todas se montan juntas en `src/app.ts`. Dominio: streaming de música
(`Artist`/`Track`), continuación del de Clase 4.

## Instalación

```bash
npm install
npm run dev   # http://localhost:3000, recarga automática
```

## Estructura de ejemplos

Numeración espejo de `../ejercicios/`: el mismo número y el mismo nombre
de carpeta son el mismo tema en los dos proyectos (acá no hay `05` porque
el integrador es práctica pura del alumno, sin demo).

### 1. **CRUD básico de `Artist`** (`01-crud/`)

`GET /artists`, `GET /artists/:id` (con `404`), `POST /artists` (validado
con Zod, `400`/`201`) sobre un array en memoria.

```bash
# GET  /artists
# GET  /artists/:id
# POST /artists
```

### 2. **Relaciones entre recursos** (`02-relaciones/`)

Subrecurso anidado (`/artists/:id/tracks`) vs. filtro por query param
(`/tracks?artistId=`) — mismos datos, dos caminos.

```bash
# GET /artists/:id/tracks
# GET /tracks?artistId=
```

### 3. **Middlewares y manejo de errores** (`03-middlewares/`)

Logging global + manejo de errores centralizado (middleware de 4
parámetros), aplicados a toda la app.

```bash
# GET /demo/error
```

### 4. **OpenAPI generado desde Zod** (`04-openapi/`)

El schema de Zod que ya valida `POST /artists` en `01-crud/` se registra
acá con `zod-to-openapi` para generar la documentación — code-first, sin
YAML a mano. Servida con Swagger UI. No repite la ruta, solo la
documenta.

```bash
# GET /docs
```

## Otros scripts

```bash
npm run build       # tsc → dist/
npm start           # node dist/server.js
npm run typecheck   # tsc --noEmit
```

## Cómo ver el resultado

```bash
npm run dev
```

- `requests.http` trae todas las requests de arriba listas para correr
  (extensión REST Client de VS Code, u otro cliente HTTP).
- `http://localhost:3000/docs` sirve la documentación OpenAPI generada.
