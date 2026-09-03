#### Ejercicio 4.1: Schema de Zod para `Collection`

**Objetivo**: declarar un schema propio con Zod y usarlo para validar un
body — mismo mecanismo que `ArtistSchema` de la teoría, sobre un recurso
de esta clase.

**Requisitos**:

- [ ] `POST /collections` (body `{ name }`) crea una collection con
      `bookIds: []` y responde `201`.
- [ ] Responde `400` si falta `name` o es un string vacío — con el detalle
      de Zod (`resultado.error.issues`) en el body.

#### Ejercicio 4.2: El mismo schema genera la documentación (`document.ts`)

**Objetivo**: mismo mecanismo que el demo de `ejemplos/04-openapi/` — el
schema que ya valida el body también genera el contrato OpenAPI, sin YAML
a mano. `registry` queda exportado: el Ejercicio 5 (integrador) le agrega
el path de `Author` al mismo documento.

**Requisitos**:

- [ ] `registry.registerPath(...)` registra `POST /collections` con
      `CollectionSchema`.
- [ ] `GET /docs` (Swagger UI) muestra `POST /collections` documentado.
