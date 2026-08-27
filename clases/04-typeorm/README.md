# Clase 4 — Framework de Persistencia: TypeORM

Continúa desde la Clase 3: el mismo mapeo objeto-relacional que ahí se escribía a mano con SQL, ahora declarado con decoradores de TypeORM.

## Slides

- [slides/clase4-slides.html](slides/clase4-slides.html)

## Contenido

1. **¿Qué es un ORM?** — qué resuelve un ORM frente a escribir SQL a mano.
2. **Mecánica del lenguaje nueva** — decoradores y generics (`Repository<T>`, `DataSource`), antes de la primera entidad.
3. **Entidades** — decoradores de columna, CRUD con `Repository` (`ejemplos/src/01-entidades/`).
4. **Restricciones de BD vs. validación de aplicación** — `@Unique`/`@Check`/`@Index` (SQLite) contra `class-validator` (aplicación) (`ejemplos/src/02-restricciones/`, `03-validacion/`).
5. **Relaciones** — 1:1, 1:N, N:M con `@OneToOne`/`@OneToMany`/`@ManyToMany` (`ejemplos/src/04-relaciones/`).
6. **Carga: por defecto, eager y lazy** — cuándo se disparan las queries de una relación (`ejemplos/src/05-carga/`).
7. **Objetos embebidos** — un Value Object mapeado con `@Column(() => Money)` (`ejemplos/src/06-embebidos/`).
8. **Herencia vía TypeORM** — Table Per Hierarchy y Table Per Class sobre la misma jerarquía (`ejemplos/src/07-herencia/`).
9. **Query Builder, Optimización, Migraciones** — joins/agregaciones con `createQueryBuilder`, el problema N+1, y cambios de esquema versionados (`ejemplos/src/08-query-builder/`, `09-optimizacion/`, `10-migraciones/`).
10. **Transacciones** — `QueryRunner` con `BEGIN`/`COMMIT`/`ROLLBACK` (`ejemplos/src/11-transacciones/`).
11. **Comparación TypeORM vs. SQL raw** — cierra el arco de las dos clases de persistencia.

## Cómo ejecutar

```bash
cd ejemplos
npm install
npm run entidades   # o cualquier otro script, ver README de ejemplos
```

Ver el [README de ejemplos](ejemplos/README.md) para el resto de los scripts.

## Ejercicios

`ejercicios/` — tema conductor de streaming de música (`Artist`, `Album`, `Track`, `User`, `Playlist`, `Subscription`), con los mismos temas más un ejercicio integrador de relaciones N:M. Ver su [README](ejercicios/README.md).

```bash
cd ejercicios
npm install
npm test
```
