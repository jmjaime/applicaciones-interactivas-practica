# Ejemplos — Clase 3: Mapeo con SQL Puro

## Instalación

```bash
npm install
npm run mapeo-basico-sql   # o cualquier otro script, ver abajo
```

## Estructura de ejemplos

### 1. Mapeo básico (`01-mapeo-basico/`)

`Person` → tabla `PERSON`: clase → tabla, instancia → fila, propiedad →
columna.

```bash
npm run mapeo-basico-sql
```

### 2. Relaciones (`02-mappeo-relaciones/`)

- `one-to-one/` — `User` ↔ `Profile` (1:1)
- `one-to-many/` y `many-to-one/` — `Author` → `Books` (misma FK, las dos
  direcciones de consulta)
- `many-to-many/` — `Student` ↔ `Course` (N:M). **Recortado a
  propósito**: solo arma el esquema y los datos (tabla puente incluida),
  sin las consultas — esas son el ejercicio integrador
  (`../ejercicios/src/01-relaciones/many-to-many`)

```bash
npm run one-to-one-sql
npm run one-to-many-sql
npm run many-to-one-sql
npm run many-to-many-sql
npm run mappeo-relaciones   # corre las 4 seguidas
```

### 3. Herencia (`03-mappeo-herencia/`)

Misma jerarquía `Vehicle` (auto/moto) mapeada con las 3 estrategias, para
comparar el esquema SQL resultante sobre el mismo dominio:

- `table-per-hierarchy/` — una tabla `vehicles` con discriminador `type`
- `table-per-class/` — una tabla por tipo (`auto`, `moto`)
- `joined-table/` — tabla base `vehicles` + tablas de especialización

```bash
npm run table-per-hierarchy-sql
npm run table-per-class-sql
npm run joined-table-sql
npm run mappeo-herencia   # corre las 3 seguidas
```

### 4. Objetos embebidos (`04-mappeo-embebido/`) — autoestudio

Un Value Object (`Money`) embebido de 3 formas distintas:

- `multiple-columns/` — aplanado en columnas (`price_value`, `price_currency`)
- `comma-separated/` — colección simple como CSV
- `json-mapping/` — serializado en una columna JSON

```bash
npm run multiple-columns-sql
npm run comma-separated-sql
npm run json-mapping-sql
npm run mappeo-embebido   # corre las 3 seguidas
```

## Otros scripts

```bash
npm run all-sql       # todos los ejemplos, en orden
npm run build         # tsc → dist/
npm run typecheck     # tsc --noEmit
npm run lint          # eslint
npm run clean         # borra dist/ y los .sqlite generados
```

## Cómo ver el resultado

Cada script imprime por consola el esquema creado, los datos insertados y
las consultas de ejemplo, paso a paso (con una pausa entre cada uno si
corrés en una terminal). No hay tests ni menú: son demos para correr y
leer la salida — o abrir el `.sqlite` generado con un visor de SQLite
(en VS Code: extensión **SQLite Viewer**, `qwtel.sqlite-viewer`) para
inspeccionar tablas, filas y constraints.
