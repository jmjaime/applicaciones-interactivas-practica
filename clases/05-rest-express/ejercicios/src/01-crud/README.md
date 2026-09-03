#### Ejercicio 1.1: CRUD básico de `Author`

**Objetivo**: aplicar el patrón de rutas de Clase 2 (`req.body`,
`res.status().json()`) a un recurso propio.

**Requisitos**:

- [ ] `GET /authors` devuelve todos los authors (array).
- [ ] `POST /authors` crea un author con `name`/`nationality` del body y
      responde `201` con el author creado.
- [ ] `POST /authors` responde `400` si falta `name` o `nationality`.

#### Ejercicio 1.2: Detalle y `404`

**Objetivo**: elegir el código de estado correcto según exista o no el
recurso pedido.

**Requisitos**:

- [ ] `GET /authors/:id` devuelve el author con `200` si existe.
- [ ] `GET /authors/:id` responde `404` si no existe.

#### Ejercicio 1.3: Filtro por query param

**Objetivo**: agregar un filtro opcional sin romper el caso sin filtro
(mismo patrón que `?genre=` sobre `Artist` en la teoría).

**Requisitos**:

- [ ] `GET /authors?nationality=Argentina` devuelve solo los authors con esa
      nationality.
- [ ] `GET /authors` (sin query param) sigue devolviendo todos.

Manejo de errores genérico (`if (!encontrado) res.status(404)...`), sin
middleware — eso llega en el Ejercicio 5 (integrador).
