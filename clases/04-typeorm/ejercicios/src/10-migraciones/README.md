#### Ejercicio 10: Migraciones (práctica en casa)

**Objetivo**: escribir un cambio de esquema explícito con `QueryRunner`
(sin `synchronize: true`), como se haría en una migración real.

**Requisitos**:

- [ ] `migrateAddIsPublicColumn(queryRunner)`: agrega la columna
      `isPublic` (`BOOLEAN NOT NULL DEFAULT 0`) a la tabla `playlist` con
      un `ALTER TABLE`.

`setupInitialSchema()` y `columnExists()` ya están resueltos (crean la
tabla base y verifican si una columna existe vía `PRAGMA table_info`).
`exercise.spec.ts` confirma que la columna no existe antes de la
migración, existe después, y que las filas insertadas después tienen el
default esperado.

> Ver también `ejemplos/src/10-migraciones/`, con dos migraciones más
> completas (rename de tabla + vista, y una FK con `ON DELETE CASCADE`).
