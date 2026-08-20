#### Ejercicio 1.1: Relación 1:1 — Product ↔ Inventory

**Objetivo**: mapear una relación 1:1 entre `product` e `inventory`,
garantizada por constraint UNIQUE en la FK (mismo concepto que la demo
`ejemplos/src/02-mappeo-relaciones/one-to-one`).

**Requisitos**:

- [ ] `createSchema()`: tablas `product` e `inventory`, con
      `UNIQUE(product_id)` en `inventory` para garantizar la relación 1:1.
- [ ] `insertProduct(product)`: inserta un producto y devuelve el objeto
      con el id generado por SQLite.
- [ ] `insertInventory(inventory)`: inserta el registro de inventario y
      devuelve el objeto con el id generado por SQLite.
- [ ] `getProductWithInventory(productId)`: SELECT JOIN product ↔
      inventory, devuelve el producto con su inventario anidado (o `null`
      si no existe).
- [ ] `getByWarehouse(warehouse)`: filtra productos por depósito
      (`inventory.warehouse`).

`exercise.spec.ts` construye sus propios `Product`/`Inventory`, los
inserta y valida los objetos tipados que devuelven las consultas — no
depende del SQL interno, solo de lo que entra y lo que sale.
