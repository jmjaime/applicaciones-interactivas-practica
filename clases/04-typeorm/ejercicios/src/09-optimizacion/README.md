#### Ejercicio 9: Optimización — evitar N+1 (práctica en casa)

**Objetivo**: reescribir una consulta que hace 1+N queries (`getUsersWithPlaylistsNaive`,
ya resuelta, para comparar) en una sola consulta con `relations` o
`leftJoinAndSelect`.

**Requisitos**:

- [ ] `getUsersWithPlaylistsOptimized()`: mismo resultado que
      `getUsersWithPlaylistsNaive()` — lista de `{ username,
      playlistCount }` — pero en una sola consulta (usar `relations:
      ["playlists"]` en el `find()`, o un `QueryBuilder` con
      `leftJoinAndSelect`).

`exercise.spec.ts` valida que ambas versiones devuelven el mismo
resultado — el punto del ejercicio es *cómo* se llega a ese resultado
(cuántas consultas SQL dispara cada una), que se puede observar activando
`logging: true` en el `DataSource` y mirando la consola al correr el
test.

> Ver también `ejemplos/src/09-optimizacion/`, que además mide tiempos y
> cantidad de queries de cada estrategia.
