#### Ejercicio 1.2: Relación 1:N / N:1 — Customer → PurchaseOrder

**Objetivo**: mapear `customer` (One) → `purchase_order` (Many) con FK en
el lado "muchos". La misma FK cubre también la consulta N:1 (desde el lado
"muchos", como se vio en la slide de Relaciones · N:1) — mismo concepto que
la demo `ejemplos/src/02-mappeo-relaciones/one-to-many` y
`.../many-to-one`.

**Requisitos**:

- [ ] `createSchema()`: tablas `customer` y `purchase_order` con FK
      `customer_id`.
- [ ] `insertCustomer(customer)`: inserta un cliente y devuelve el objeto
      con el id generado.
- [ ] `insertOrder(order)`: inserta una orden y devuelve el objeto con el
      id generado.
- [ ] `getAllOrders()`: SELECT JOIN customer ↔ purchase_order con campos
      mapeados.
- [ ] `getOrdersByStatus(status)`: filtra por `status`.
- [ ] `filterCustomersByActive(active)`: filtra por `is_active`.

`exercise.spec.ts` construye sus propios `Customer`/`Order`, los inserta y
valida los objetos tipados que devuelven las consultas — no depende del
SQL interno, solo de lo que entra y lo que sale.

`Customer` y `Order` son dos Entidades relacionadas por FK — sin Value
Objects acá.
