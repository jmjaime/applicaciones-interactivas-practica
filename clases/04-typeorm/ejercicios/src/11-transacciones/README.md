#### Ejercicio 6: Transacciones con QueryRunner (práctica en casa)

**Objetivo**: usar un `QueryRunner` manual para que "debitar saldo" y
"crear la subscription" sean atómicos — o pasan las dos cosas, o no pasa
ninguna.

**Requisitos**:

- [ ] `purchaseSubscription(username, plan, price)`: usando
      `AppDataSource.createQueryRunner()` (nunca el repositorio default),
      dentro de una transacción: si el `walletBalance` del usuario no
      alcanza, hace `rollbackTransaction()` y lanza `new
      Error("Saldo insuficiente")`, sin dejar nada guardado; si alcanza,
      resta el precio del saldo, crea la `Subscription` y hace
      `commitTransaction()`. `queryRunner.release()` siempre al final.

`exercise.spec.ts` valida ambos casos, incluyendo que el saldo **no**
cambia y no queda ninguna `Subscription` creada cuando la compra se
rechaza — esa ausencia de estado parcial es lo que prueba que la
transacción funciona.
