#### Ejercicio 8: QueryBuilder (práctica en casa)

**Objetivo**: escribir consultas con `createQueryBuilder()` — joins,
agregaciones (`SUM`/`AVG`) y paginación — para casos que `find()` no
resuelve directamente.

**Requisitos**:

- [ ] `topArtistsByPlays(limit)`: los artistas con más reproducciones
      totales (`SUM(t.plays)`), con join a `Track`, agrupados por
      artista, ordenados descendente, limitados a `limit`.
- [ ] `getPaginatedTracks(page, pageSize)`: tracks ordenados por título,
      paginados con `skip`/`take`.
- [ ] `getAverageDurationByArtist(artistName)`: duración promedio
      (`AVG(t.durationSeconds)`) de los tracks de un artista; `0` si no
      tiene tracks.

`createArtist`/`createTrack` ya están resueltos — el ejercicio es sobre
las consultas, no sobre el setup de datos. `exercise.spec.ts` valida los
valores agregados que devuelve cada consulta.
