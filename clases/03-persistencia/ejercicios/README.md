# Ejercicios — Clase 3: Mapeo con SQL Plano

## Instalación

```bash
npm install
npm test                      # corre todos los tests
```

## Estructura de ejercicios

Cada ejercicio tiene su enunciado (Objetivo/Requisitos, como checklist) en
un `README.md` al lado de su `exercise.ts` — el `exercise.ts` solo deja un
puntero de una línea al README y los `TODO` inline en cada método.

### 1. Relaciones (`01-relaciones/`)

- `one-to-one/` — `Product` ↔ `Inventory` (1:1, FK con UNIQUE)
- `one-to-many/` — `Customer` → `PurchaseOrder` (1:N, también N:1)
- `many-to-many/` — `Recipe` ↔ `Ingredient` vía `RecipeIngredient` (N:M, integrador)

```bash
npm test -- 01-relaciones
```

### 2. Herencia (`02-herencia/`)

Misma jerarquía `Payment` (`CreditCardPayment`/`BankTransferPayment`/
`CashPayment`), mapeada con 3 estrategias distintas:

- `table-per-hierarchy/` — TPH
- `table-per-class/` — TPC
- `table-per-type/` — JOINED (autoestudio)

```bash
npm test -- 02-herencia
```

### 3. Diseño de Entidades (`03-diseno-entidades/`)

Ejercicio de diseño abierto (hotel, Entidad/VO) — ver `enunciado.md`. Sin
tests: se evalúa la justificación escrita, no un resultado ejecutable.

## Otros scripts

```bash
npm test -- <ruta al .spec.ts>  # corre un solo ejercicio
npm run one-to-one-sql          # o cualquier otro script, para ver un ejercicio standalone
npm run typecheck
npm run lint
npm run clean                   # borra los .sqlite/.db generados
```

## Cómo ver el resultado

Cada `exercise.spec.ts` sigue el mismo patrón: antes de cada test borra el
`.sqlite` de test y corre `createSchema()` (limpieza automática, no hay
que escribir nada para eso), y después el test **construye sus propios
objetos tipados** (`Product`, `Payment`, etc.), los inserta con los
métodos que hay que implementar, y valida el objeto tipado que devuelve
la consulta correspondiente. Los tests no inspeccionan SQL en ningún
momento — si el esquema o las queries están mal, el test falla porque el
objeto que vuelve no tiene los datos esperados, no por revisar la
sentencia SQL usada.

Los `.sqlite` que genera cada ejercicio quedan en el proyecto después de
correr los tests — a propósito, para poder abrirlos con un visor de
SQLite e inspeccionar visualmente qué quedó guardado (columnas, filas,
constraints). En VS Code, la extensión **SQLite Viewer**
(`qwtel.sqlite-viewer`) permite abrir un `.sqlite` directo en el editor.
