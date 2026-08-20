#### Ejercicio 2.2: Table Per Class (TPC) — Payment

**Objetivo**: mapear la misma jerarquía de pagos (`CreditCardPayment` /
`BankTransferPayment` / `CashPayment`) a una tabla independiente por cada
clase concreta, sin tabla base (mismo concepto que la demo
`ejemplos/src/03-mappeo-herencia/table-per-class`, otro dominio).

**Requisitos**:

- [ ] `createSchema()`: una tabla por tipo concreto
      (`credit_card_payments`, `bank_transfer_payments`, `cash_payments`),
      cada una con sus columnas propias, sin FKs entre ellas.
- [ ] `insertPayment(payment)`: inserta en la tabla correspondiente según
      `payment.method` y devuelve el objeto con el id generado.
- [ ] `getAll()`: UNION de las 3 tablas devolviendo `Payment` (con
      `method`).
- [ ] `getByMethod(method)`: SELECT de la tabla correspondiente al método.
- [ ] `getTotalAmount()`: suma `amount` de las 3 tablas.

`exercise.spec.ts` construye sus propios `Payment` (de cada subtipo), los
inserta y valida los objetos tipados que devuelven las consultas — no
depende del SQL interno, solo de lo que entra y lo que sale.

`Payment` (en cualquiera de sus 3 variantes) es la Entidad de este
ejercicio — sin Value Objects acá.

Esta misma jerarquía `Payment` se mapea con las 3 estrategias de herencia
de la clase (TPC acá, TPH y JOINED en las carpetas vecinas) — comparar
cómo cambia el esquema SQL con la estrategia, sobre el mismo dominio.
