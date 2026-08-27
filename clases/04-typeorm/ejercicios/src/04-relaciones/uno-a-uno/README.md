#### Ejercicio 4.1: Relación 1:1 — User ↔ Subscription

**Objetivo**: mapear una relación 1:1 con `@OneToOne`/`@JoinColumn` (mismo
concepto que la demo `ejemplos/src/04-relaciones`), garantizada por FK con
UNIQUE.

**Requisitos**:

- [ ] `createUserWithSubscription(userData, subscriptionData)`: crea el
      `User`, después crea la `Subscription` asociada, y devuelve el
      usuario con su `subscription` cargada.
- [ ] `getUserSubscription(username)`: busca un usuario por `username` y
      devuelve su `Subscription` (o `null` si no existe usuario o
      subscription).
- [ ] `upgradePlan(username, newPlan, newPrice)`: actualiza plan y precio
      de la subscription de un usuario; `null` si no existe.

`exercise.spec.ts` construye sus propios `User`/`Subscription` y valida
los objetos tipados que devuelven las consultas.
