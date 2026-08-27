#### Ejercicio 3: Validación de aplicación — User (sobre el ejercicio 2)

**Objetivo**: agregar una capa de validación con `class-validator` sobre
la misma entidad `User` del ejercicio anterior, y usarla para rechazar
datos inválidos **antes** de intentar guardarlos — a diferencia del
ejercicio 2, donde el rechazo lo hacía SQLite al guardar.

**Requisitos**:

- [ ] `validateUser(data)`: instancia un `User`, corre `validate()` de
      class-validator y devuelve los mensajes de error como array de
      strings (vacío si es válido).
- [ ] `createValidUser(data)`: valida primero con `validateUser()`; si hay
      errores, lanza un `Error` con los mensajes SIN guardar nada; si es
      válido, recién ahí guarda y devuelve el usuario.
- [ ] `countInvalid(usersData)`: cuenta cuántos de una lista fallarían la
      validación, sin guardar ninguno en la base.

`exercise.spec.ts` confirma explícitamente que los casos inválidos no
tocan la base de datos (`repository.count()` sigue en `0`) — esa es la
diferencia central con el ejercicio 2.
