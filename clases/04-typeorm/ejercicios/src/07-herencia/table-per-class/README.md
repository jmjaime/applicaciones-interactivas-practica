#### Ejercicio 7b: Herencia (Table Per Class) — Song / Podcast / Audiobook (práctica en casa)

**Objetivo**: mapear la misma jerarquía del ejercicio 7 (`Track` con
subtipos `Song`/`Podcast`/`Audiobook`), esta vez con Table Per Class
(cada subtipo en su propia tabla completa, sin columna discriminadora) —
para comparar contra Table Per Hierarchy.

**Requisitos**:

- [ ] `createSong(data)` / `createPodcast(data)` / `createAudiobook(data)`:
      crear y guardar cada subtipo con su propio repositorio
      (`getRepository(Song)`, etc.).
- [ ] `listAllTracks()`: devolver todos los tracks de cualquier subtipo —
      a diferencia del ejercicio 7, acá no hay una consulta polimórfica
      automática: hay que traer cada repositorio por separado y combinar
      los resultados.
- [ ] `getTotalDurationBySong()`: sumar `durationSeconds` solo de los
      `Song` (no `Podcast` ni `Audiobook`).

`exercise.spec.ts` valida que cada subtipo guarda sus campos propios y
que `listAllTracks()` devuelve los tracks de las tres tablas combinados.

> Ver también `ejemplos/src/07-herencia/table-per-class/`, con una
> comparación más completa (estadísticas, búsquedas, demostración de
> polimorfismo en código).
