#### Ejercicio 2: Restricciones de base de datos — User

**Objetivo**: usar restricciones declaradas a nivel de base de datos con
decoradores de TypeORM (`unique`, `@Check`, `@Index`) y manejar los errores
que SQLite tira cuando se violan.

**Requisitos**:

- [ ] `createUser(data)`: crea y guarda un usuario. No captura ni oculta
      errores de restricciones — si `email`/`username` está duplicado o
      `age` está fuera del rango del `@Check`, el error se propaga tal
      cual lo tira TypeORM.
- [ ] `findUsersByPlan(plan)`: usuarios activos de un plan, ordenados por
      `lastName` ascendente.
- [ ] `countUsersByPlan()`: cuenta usuarios por cada valor de `PlanType`
      (los planes sin usuarios cuentan como `0`, no se omiten).
- [ ] `upgradeToPremium(username)`: busca por `username` y cambia el plan
      a `PREMIUM`; devuelve `null` si no existe.

`exercise.spec.ts` valida tanto el caso feliz como los rechazos por
restricción (email duplicado, edad fuera de rango) — el ejercicio queda
resuelto cuando ambos casos se comportan como espera el test.
