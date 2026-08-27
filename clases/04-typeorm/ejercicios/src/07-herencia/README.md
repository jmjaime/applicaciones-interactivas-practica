#### Ejercicio 7: Herencia (Table Per Hierarchy) — Song / Podcast / Audiobook

**Objetivo**: mapear una jerarquía (`Track` con subtipos `Song`/
`Podcast`/`Audiobook`) con la estrategia Table Per Hierarchy de TypeORM
(`@TableInheritance` + `@ChildEntity`) — mismo concepto que la estrategia
TPH vista con SQL a mano en Clase 3, ahora declarada con decoradores.

**Requisitos**:

- [ ] `createSong(data)` / `createPodcast(data)` / `createAudiobook(data)`:
      crear y guardar cada subtipo con su propio repositorio
      (`getRepository(Song)`, etc.).
- [ ] `listAllTracks()`: devolver todos los tracks de cualquier subtipo
      usando `getRepository(Track)` — consulta polimórfica, TypeORM arma
      cada instancia con la clase que corresponde según la columna `type`.
- [ ] `getTotalDurationBySong()`: sumar `durationSeconds` solo de los
      `Song` (no `Podcast` ni `Audiobook`).

`exercise.spec.ts` valida que cada subtipo guarda sus campos propios y
que la consulta polimórfica devuelve instancias del subtipo correcto.

> Práctica en casa: Table Per Class sobre el mismo dominio, para comparar
> el esquema resultante de las 2 estrategias — ver
> `ejercicios/src/07-herencia/table-per-class/` (ejercicio propio) y
> `ejemplos/src/07-herencia/table-per-class/` (demo). TypeORM no soporta
> Joined Table como estrategia de herencia.
