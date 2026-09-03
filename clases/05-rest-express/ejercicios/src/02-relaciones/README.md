#### Ejercicio 2.1: Listar los `Book` de una `Collection` (subrecurso)

**Objetivo**: subrecurso con URL anidada (mismo patrón que
`/artists/:id/tracks` de la teoría, acá sobre otro par de entidades).

**Requisitos**:

- [ ] `GET /collections/:id/books` devuelve los books de esa collection.
- [ ] Responde `404` si la collection no existe.

#### Ejercicio 2.2: Los mismos datos, por query param

**Objetivo**: mismos datos que 2.1, otro camino — el mismo contraste
subrecurso-vs-query-param del demo de `ejemplos/02-relaciones/` (ahí sobre
`/artists/:id/tracks` vs. `/tracks?artistId=`), acá sobre `Collection`/`Book`.

**Requisitos**:

- [ ] `GET /books?collectionId=1` devuelve los mismos books que
      `GET /collections/1/books`.
- [ ] `GET /books` (sin query param) devuelve todos los books.
- [ ] Responde `404` si la collection del `collectionId` no existe.

#### Ejercicio 2.3: Agregar y quitar `Book` de una `Collection`

**Objetivo**: modificar una relación N:M en memoria (agregar/sacar un id de
un array), con las validaciones de existencia correspondientes.

**Requisitos**:

- [ ] `POST /collections/:id/books` (body `{ bookId }`) agrega el book a la
      collection y responde `201`.
- [ ] Responde `404` si la collection o el book no existen.
- [ ] `DELETE /collections/:id/books/:bookId` saca el book de la
      collection y responde `204` sin body.
- [ ] Responde `404` si la collection no existe.

Manejo de errores genérico, sin middleware.
