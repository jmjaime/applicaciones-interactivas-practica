#### Ejercicio 2.1: Table Per Hierarchy (TPH) — Payment

**Objetivo**: mapear una jerarquía de pagos (`CreditCardPayment` /
`BankTransferPayment` / `CashPayment`) a una única tabla con columna
discriminadora (mismo concepto que la demo
`ejemplos/src/03-mappeo-herencia/table-per-hierarchy`).

**Requisitos**:

- [ ] `createSchema()`: tabla única `payments` con columnas comunes +
      columnas específicas de cada subtipo (NULL cuando no aplican), más
      `method` como discriminador.
- [ ] `insertPayment(payment)`: inserta un pago (de cualquier subtipo) y
      devuelve el objeto con el id generado.
- [ ] `getAll()`: SELECT * mapeado de vuelta a `Payment` (unión
      discriminada).
- [ ] `getByMethod(method)`: filtra por `method`.
- [ ] `getTotalAmount()`: suma el campo `amount` de todos los pagos.

`exercise.spec.ts` construye sus propios `Payment` (de cada subtipo), los
inserta y valida los objetos tipados que devuelven las consultas — no
depende del SQL interno, solo de lo que entra y lo que sale.

Esta misma jerarquía `Payment` se mapea con las 3 estrategias de herencia
de la clase (TPH acá, TPC y JOINED en las carpetas vecinas) — comparar
cómo cambia el esquema SQL con la estrategia, sobre el mismo dominio.
