#### Ejercicio 2.3: Table Per Type / JOINED (TPT) — Payment

Autoestudio (Clase 3 solo da la teoría con TPH y TPC en vivo) — mismo
patrón que esos dos, aplicado a la misma jerarquía de pagos.

**Objetivo**: mapear la jerarquía de pagos (`CreditCardPayment` /
`BankTransferPayment` / `CashPayment`) a una tabla base + tablas
específicas por tipo, unidas por FK (PK compartida) — mismo concepto que
la demo `ejemplos/src/03-mappeo-herencia/joined-table`, otro dominio.

**Requisitos**:

- [ ] `createSchema()`: tabla base `payments` (`amount`, `paid_at`,
      `method`) + `credit_card_payments` / `bank_transfer_payments` /
      `cash_payments` con FK a `payments(id)`.
- [ ] `insertPayment(payment)`: inserta primero en `payments`, luego en la
      tabla específica según el tipo, y devuelve el objeto con el id
      generado.
- [ ] `getAll()`: JOIN de `payments` con la tabla específica de cada fila.
- [ ] `getByMethod(method)`: filtra por `method` en la tabla base.
- [ ] `getTotalAmount()`: suma `amount` de `payments`.

`exercise.spec.ts` construye sus propios `Payment` (de cada subtipo), los
inserta y valida los objetos tipados que devuelven las consultas — no
depende del SQL interno, solo de lo que entra y lo que sale.

`Payment` (en cualquiera de sus 3 variantes) es la Entidad de este
ejercicio — sin Value Objects acá.

Esta misma jerarquía `Payment` se mapea con las 3 estrategias de herencia
de la clase (JOINED acá, TPH y TPC en las carpetas vecinas) — comparar
cómo cambia el esquema SQL con la estrategia, sobre el mismo dominio.
