# Ejemplos · Express + TypeScript

Proyecto mínimo para acompañar la intro a Express. Incluye rutas básicas, middlewares y manejo centralizado de errores.

## Requisitos

- Node.js 18+
- npm

## Scripts

```bash
# desarrollo (watch + restart)
npm run dev

# compilar a JS (dist/)
npm run build

# ejecutar compilado
npm start
```

## Estructura

```
src/
  app.ts                # configura express (middlewares, rutas)
  index.ts              # arranca el servidor
  middlewares.ts        # logger y error handler
  validators/
    requireFields.ts    # validador de body
  routes/
    home.routes.ts      # GET /
    ping.routes.ts      # GET /ping
    boom.routes.ts      # GET /boom(/:code) errores a propósito
    users.routes.ts     # /users
  controllers/
    users.controller.ts # handlers de users
  services/
    users.service.ts    # store en memoria
```

## Endpoints

- `GET /` → "Hello, Express + TypeScript!"
- `GET /ping` → `{ ok: true, ts }`
- `GET /boom` → lanza error 418 (para probar el error handler)
- `GET /boom/:code` → lanza error con el status indicado
- `GET /users` → lista usuarios (en memoria)
  - filtros: `?name=<substring>` (case‑insensitive)
- `GET /users/:id` → usuario por id
- `POST /users` → crea usuario `{ name: string, email: string }`
  - valida campos requeridos con `requireFields(["name","email"])`

## cURL de ejemplo

```bash
# ping
curl -s http://localhost:3000/ping | jq

# crear usuario
curl -s -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada Lovelace","email":"ada@example.com"}' | jq

# listar usuarios
curl -s http://localhost:3000/users | jq

# filtrar por nombre
curl -s 'http://localhost:3000/users?name=ada' | jq

# obtener por id
curl -s http://localhost:3000/users/1 | jq

# forzar un error
curl -i http://localhost:3000/boom/500
```

## Middlewares incluidos

- `requestLogger` (app‑level): log simple de cada request.
- `errorHandler` (app‑level): responde `{ error }` y status adecuado.
- `requireFields` (route‑level): valida campos requeridos del body.

## Notas

- Puerto por defecto: `3000` (usar `PORT` si deseas cambiarlo).
- Se usan comandos clásicos de npm (`npm run ...`).
- La persistencia es solo en memoria (se reinicia con el proceso).

