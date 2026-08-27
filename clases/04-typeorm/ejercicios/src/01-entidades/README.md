#### Ejercicio 1: Entidades básicas — Artist / Album

**Objetivo**: definir y operar sobre entidades TypeORM básicas (sin
relaciones todavía), usando `Repository` para crear, listar y actualizar.

**Requisitos**:

- [ ] `createArtists(artists)`: crea varios `Artist` con `create()` y los
      persiste con `save()`.
- [ ] `listArtistsByCountry(country)`: devuelve los artistas de un país,
      ordenados por `debutYear` ascendente.
- [ ] `deactivateArtist(name)`: busca un artista por nombre y pone
      `isActive` en `false`; devuelve `null` si no existe.
- [ ] `createAlbums(albums)`: crea varios `Album` en una sola operación.
- [ ] `listAlbumsByGenre(genre)`: devuelve álbumes de un género, ordenados
      por `releaseYear` descendente.
- [ ] `getTotalDurationMinutes()`: suma `durationMinutes` de todos los
      álbumes.

`exercise.spec.ts` construye sus propios `Artist`/`Album` y valida los
objetos tipados que devuelven las consultas.
