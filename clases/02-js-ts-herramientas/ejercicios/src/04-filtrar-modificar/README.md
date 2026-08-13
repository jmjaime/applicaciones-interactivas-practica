#### Ejercicio 4.1: Filtrar por prioridad

**Objetivo**: mismo patrón que el ejemplo (`ejemplos/src/04-filtrar-modificar/`,
que filtra por `estado`), acá filtrando por otro campo.

**Requisitos**:

- [ ] `GET /tareas?prioridad=alta` devuelve solo las tareas con esa
      prioridad.
- [ ] `GET /tareas` (sin query param) devuelve todas.

#### Ejercicio 4.2: Detalle con subconjunto de propiedades

**Objetivo**: dar forma a la respuesta con destructuring (visto en el
ejemplo, que devuelve `{ id, titulo }` — acá otro subconjunto).

**Requisitos**:

- [ ] `GET /tareas/:id/detalle` devuelve `{ titulo, estado }` (no el
      objeto entero).
- [ ] Si no existe, `404` con `{ error: "Tarea no encontrada" }`.

#### Ejercicio 4.3: Borrar una tarea

**Objetivo**: modificar el array en memoria (el ejemplo actualiza con
`PATCH`+spread, acá se elimina con `splice`).

**Requisitos**:

- [ ] `DELETE /tareas/:id` saca la tarea de `tareas` y responde `204` sin
      body.
- [ ] Si no existe, `404` con `{ error: "Tarea no encontrada" }`.

En clase, 20-25 min entre los tres. Manejo de errores genérico en los
tres (`if (!encontrado) res.status(404)...`) — sin clases de error ni
middleware, como en el ejemplo.
