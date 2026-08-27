#### Ejercicio 5: Carga por defecto vs. eager (práctica en casa)

**Objetivo**: comparar qué trae `find()` sobre una relación según cómo
está declarada — por defecto (no se carga si no se pide) vs. `eager:
true` (se carga siempre).

**Requisitos**:

- [ ] `createPlaylistWithTracks(name, titles)` / `getPlaylistDefault(name)`
      / `getPlaylistWithTracks(name)`: sobre `Playlist`/`Track` (relación
      declarada sin `eager`). `getPlaylistDefault()` NO debe traer
      `tracks` poblado; `getPlaylistWithTracks()`, pidiendo
      `relations: ["tracks"]`, sí.
- [ ] `createPlaylistEagerWithTracks(name, titles)` /
      `getPlaylistEager(name)`: mismo patrón sobre `PlaylistEager`/
      `TrackEager` (relación con `eager: true`) — acá `tracks` viene
      poblado aunque no se pida.

`exercise.spec.ts` construye sus propias entidades y valida, en cada
caso, si `tracks` viene poblado o no — esa es la comparación que importa,
no solo que las funciones no tiren error.
