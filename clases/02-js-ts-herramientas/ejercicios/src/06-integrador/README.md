#### Ejercicio 6.1 (integrador): `POST /tareas`

**Objetivo**: combinar Express (routing, Bloque 1), Zod (validación, ya
dada, Bloque 3) y el array en memoria del Bloque 4 en un único endpoint.

**Requisitos**:

- [ ] La validación con `crearTareaSchema` y la respuesta `400` ya están
      armadas — no hace falta tocarlas.
- [ ] Si el body es válido, crear una tarea nueva: `id` = el mayor `id`
      existente en `tareas` + 1 (o `1` si el array está vacío), `estado`
      = `"pendiente"`, con el `titulo` y `prioridad` ya validados.
- [ ] Agregarla al array `tareas` (importado de
      `../04-filtrar-modificar/exercise`) y responder `201` con la tarea
      creada.
- [ ] Después de crearla, `GET /tareas/:id/detalle` con el `id` devuelto
      tiene que encontrarla.

En clase, 20-25 min. Cierra la clase: combina los tres bloques anteriores
sobre el mismo estado en memoria.
