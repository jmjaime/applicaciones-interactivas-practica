#### Ejercicio 4.2: Relación 1:N — Artist → Track

**Objetivo**: mapear una relación 1:N con `@OneToMany`/`@ManyToOne` (mismo
concepto que la demo `ejemplos/src/04-relaciones`), del lado "uno" y del
lado "muchos".

**Requisitos**:

- [ ] `createArtistWithTracks(artistData, tracksData)`: crea el `Artist`,
      después cada `Track` con `track.artist` apuntando al artista recién
      creado. Devuelve el `Artist` con `tracks` cargado.
- [ ] `listArtistTracks(artistName)`: tracks de un artista, buscado por
      nombre.
- [ ] `getTotalDurationByArtist(artistName)`: suma `durationSeconds` de
      todos los tracks de un artista; `0` si no existe o no tiene tracks.

`exercise.spec.ts` construye sus propios `Artist`/`Track` y valida los
objetos tipados que devuelven las consultas.
