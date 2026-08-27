#### Ejercicio 4.3: Relación N:M — Playlist ↔ Track (integrador)

**Objetivo**: mapear `Playlist` ↔ `Track` con `@ManyToMany` + `@JoinTable`
(TypeORM crea la tabla intermedia automáticamente). Integrador del bloque
de Relaciones — combina crear entidades relacionadas (como en 4.1/4.2) con
una relación N:M real.

**Requisitos**:

- [ ] `createPlaylist(ownerUsername, playlistName)`: crea el `User` dueño
      y una `Playlist` vacía.
- [ ] `addTrackToPlaylist(playlistName, trackData)`: crea el `Track` y lo
      agrega a la playlist (buscada por nombre). Devuelve el `Track`
      creado.
- [ ] `getPlaylistWithTracks(playlistName)`: la playlist con sus tracks
      cargados; `null` si no existe.
- [ ] `getPlaylistsContainingTrack(trackTitle)`: la consulta "del otro
      lado" — qué playlists contienen un track dado.
- [ ] `getPlaylistDurationSeconds(playlistName)`: suma `durationSeconds`
      de todos los tracks de una playlist; `0` si no existe o está vacía.

`exercise.spec.ts` construye sus propios `User`/`Track`/`Playlist` y
valida los objetos tipados que devuelven las consultas.
