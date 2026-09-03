### Práctica integradora — extender `Author` (en parejas)

Combina los temas anteriores sobre el mismo `Author` del Ejercicio 1:
verbos HTTP nuevos, middlewares, manejo de errores centralizado y OpenAPI
generado desde Zod.

#### Ejercicio 5.1: `DELETE /authors/:id`

**Objetivo**: agregar el verbo que faltaba al CRUD de `Author`.

**Requisitos**:

- [ ] `DELETE /authors/:id` saca el author de `authors` y responde `204`
      sin body.
- [ ] Responde `404` (vía `next(new HttpError(404, ...))`, no
      `res.status()` directo) si no existe.

#### Ejercicio 5.2: Middlewares (`middlewares/`)

**Objetivo**: logging global y manejo de errores centralizado —
middleware de 4 parámetros, montado al final de todas las rutas.

**Requisitos**:

- [ ] `middlewares/logging.ts`: loggea método + path de cada request.
- [ ] `middlewares/errorHandler.ts`: si el error es `HttpError`, responde
      con su `status`/`message`; si no, `500`.
- [ ] El `404` de `GET /authors/:id` (Ejercicio 1.2) sigue funcionando
      igual — antes con `res.status(404)` directo, ahora puede quedar así
      o pasar por el mismo middleware (no es requisito migrarlo).

#### Ejercicio 5.3: `PATCH /authors/:id` con Zod

**Objetivo**: reutilizar el patrón de schema de Zod del Ejercicio 4, acá
para una actualización parcial.

**Requisitos**:

- [ ] `AuthorPatchSchema`: mismos campos que `Author` (`name`,
      `nationality`), todos opcionales (`.partial()`).
- [ ] `PATCH /authors/:id` valida el body con ese schema — `400` si algún
      campo tiene tipo inválido.
- [ ] Actualiza solo los campos que vinieron y responde `200` con el
      author actualizado.
- [ ] `404` si el author no existe.

#### Ejercicio 5.4: Documentación OpenAPI (`document.ts`)

**Objetivo**: el mismo schema de Zod, registrado, genera la
documentación — sin escribir YAML a mano. Se agrega al **mismo `registry`**
que arma `04-openapi/document.ts` (importado, no uno nuevo), así
`/docs` termina mostrando `POST /collections` y `PATCH /authors/{id}`
juntos en un solo documento.

**Requisitos**:

- [ ] `registry.registerPath(...)` (el importado de
      `04-openapi/document.ts`) registra `PATCH /authors/{id}`
      con `AuthorPatchSchema`.
- [ ] `GET /docs` (Swagger UI, montado en `app.ts` desde
      `04-openapi/document.ts`) muestra los dos endpoints
      documentados.

Sin arquitectura en capas todavía — el router de este ejercicio convive
con el de la Ejercicio 1 en `app.ts`, cada uno resolviendo un verbo
distinto sobre `/authors/:id`.
