# Ejemplos TypeORM — Clase 4

Demos en vivo que complementan la teoría de la clase, un tema por carpeta.
Cada una se corre de forma independiente con `npm run <script>` — no hace
falta un setup global previo.

## Instalación

```bash
npm install
```

## Estructura de ejemplos

### 1. Entidades básicas (`01-entidades/`)

Definición de una entidad con decoradores (`@Entity`, `@Column`,
`@PrimaryGeneratedColumn`), tipos de columna y CRUD básico.

```bash
npm run entidades
```

### 2. Restricciones de base de datos (`02-restricciones/`)

Restricciones que aplica SQLite al guardar: `unique: true`, `@Check`,
`@Index`. Sin class-validator todavía — esa es una capa aparte (ver 3).

```bash
npm run restricciones
```

### 3. Validación de aplicación (`03-validacion/`)

La misma entidad del tema anterior, con `class-validator` agregado encima.
Contrasta las dos capas: una la revisa SQLite al guardar (y tira un error
de base de datos), la otra la revisa la aplicación antes de intentar
guardar (y devuelve un array de errores, sin tocar la base de datos).

```bash
npm run validacion
```

### 4. Relaciones (`04-relaciones/`)

One-to-One, One-to-Many/Many-to-One y Many-to-Many entre entidades.

```bash
npm run relaciones
```

### 5. Carga: eager vs. lazy (`05-carga/`)

Comparación entre estrategias de carga de relaciones y su efecto en la
cantidad de queries ejecutadas.

```bash
npm run carga
```

Además, `lazy-relations-example.ts` muestra las relaciones lazy reales de
TypeORM (`Promise<Entity[]>` como tipo) — no se usan en el resto de la
materia, es solo para conocer que existen.

```bash
npm run carga:lazy
```

### 6. Objetos embebidos (`06-embebidos/`)

Composición de un Value Object dentro de una entidad, mapeo a múltiples
columnas.

```bash
npm run embebidos
```

### 7. Herencia (`07-herencia/`)

Table Per Hierarchy (TPH) y Table Per Class (TPC), comparadas sobre la
misma jerarquía.

```bash
npm run herencia          # introducción a las estrategias (sin correr nada)
npm run herencia:tph      # TPH
npm run herencia:tpc      # TPC
```

### 8. Query Builder (`08-query-builder/`)

Joins, agregaciones, subqueries, paginación y SQL crudo cuando hace falta.

```bash
npm run query-builder
```

### 9. Optimización (`09-optimizacion/`)

Problema N+1 y su solución con JOINs, índices, SELECT específicos,
operaciones en lote.

```bash
npm run optimizacion
```

### 10. Migraciones (`10-migraciones/`)

Migraciones con `synchronize: false`, incluyendo una con foreign key y
`ON DELETE CASCADE`.

```bash
npm run migraciones
npm run migraciones:fk
```

### 11. Transacciones (`11-transacciones/`)

Transacciones manuales y con decoradores, rollback.

```bash
npm run transacciones
```

## Otros comandos

```bash
npm run build       # compilar TypeScript
npm run typecheck   # tsc --noEmit
npm run clean       # borra dist/ y los .sqlite generados
```

## Archivos de base de datos

Cada ejemplo genera su propio `.sqlite` en la raíz del proyecto (p.ej.
`restricciones-example.sqlite`) — se puede inspeccionar con un visor de
SQLite (extensión **SQLite Viewer** de VS Code, por ejemplo).

## Solución de problemas

**Error: "Reflect.getMetadata is not a function"** — falta el import de
`reflect-metadata` al principio del archivo de entry point. TypeScript no
conserva información de tipos en tiempo de ejecución por defecto; este
import agrega esa capacidad, que es la que necesitan los decoradores de
TypeORM para leer/escribir metadata de las entidades.

## Recursos

- [Documentación oficial de TypeORM](https://typeorm.io/)
- [Documentación de class-validator](https://github.com/typestack/class-validator)
