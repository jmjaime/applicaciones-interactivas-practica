# Ejercicios · Clase III · APIs REST (Tema: Courses)

Resuelve los ejercicios implementando endpoints Express en capas (routes → controllers → services → repositorios en memoria). Cada ejercicio tiene tests con Jest + Supertest que deben pasar.

Base: http://localhost:3001

## Correr tests

```bash
cd unidad2/clases/III/ejercicios
npm install
npm test
```

## Ejecutar servidor (opcional para requests.http)

```bash
npm run dev
# o
npm run build && npm start
```

---

## Estructura

```
src/
  app.ts            # crea app express
  index.ts          # arranque
  routes/
  controllers/
  services/
  repositories/
  types.ts
__tests__/
  01-crud.courses.spec.ts
  02-params.spec.ts
  03-relations.spec.ts
  04-idempotency.spec.ts
requests.http
```

---

## Ejercicio 01: CRUD de courses

Implementa recursos `courses`:

- GET `/api/courses` → lista
- GET `/api/courses/:id` → detalle
- POST `/api/courses` → crea (201 + Location)
- PUT `/api/courses/:id` → reemplazo completo (200/204/201)
- PATCH `/api/courses/:id` → actualización parcial (200/204)
- DELETE `/api/courses/:id` → 204

Campos mínimos: `id`, `title`, `level`, `createdAt`.

---

## Ejercicio 02: Parámetros, paginación y filtros

- Paginación: `page`, `limit`, `sort`
- Filtros simples: `status`, `instructorId`, `level`, `topics` (CSV)
- Respuesta de lista: `{ items, page, limit, total }`

---

## Ejercicio 03: Relaciones

- Instructores: `/api/instructors`, `/api/instructors/:id`, `/api/instructors/:id/courses`
- Topics: `/api/topics`, `/api/topics/:id`
- Topics de un curso: GET/POST/DELETE `/api/courses/:id/topics`

---

## Ejercicio 04: Idempotencia

Endpoint `POST /api/enrollments` con header `Idempotency-Key`. Reintentos con la misma clave deben devolver la misma respuesta sin duplicar.

---

## Notas

- Usa `kebab-case` en rutas, `camelCase` en JSON.
- Usa códigos de estado correctos (2xx/4xx/5xx) y `Location` en 201 Created.
- No usar `*` en selects/respuestas; lista explícita de campos.

---

Nota: actualmente todos los endpoints devuelven 501 (Not Implemented) desde los controllers. Debes implementar services/repositorios y ajustar controllers para hacer pasar los tests.
