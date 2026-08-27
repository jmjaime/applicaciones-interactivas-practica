# Ejercicios — Clase 4: TypeORM

Tema conductor: una app de streaming de música (`Artist`, `Album`, `Track`,
`User`, `Playlist`, `Subscription`).

## Instalación

```bash
npm install
npm test                      # corre todos los tests
```

## Estructura de ejercicios

Cada ejercicio tiene su enunciado (Objetivo/Requisitos, como checklist) en
un `README.md` al lado de su `exercise.ts` — el `exercise.ts` solo deja un
puntero de una línea al README y los `TODO` inline en cada función.

| Tema | Carpeta | Comando |
|---|---|---|
| 1. Entidades básicas — Artist/Album | `01-entidades/` | `npm run test:ej01` |
| 2. Restricciones de BD — User | `02-restricciones/` | `npm run test:ej02` |
| 3. Validación de aplicación — User (sobre el 2) | `03-validacion/` | `npm run test:ej03` |
| 4.1 Relaciones 1:1 — User↔Subscription | `04-relaciones/uno-a-uno/` | `npm run test:ej04a` |
| 4.2 Relaciones 1:N — Artist→Track | `04-relaciones/uno-a-muchos/` | `npm run test:ej04b` |
| 4.3 Relaciones N:M — Playlist↔Track (integrador) | `04-relaciones/muchos-a-muchos/` | `npm run test:ej04c` |
| 5. Carga por defecto vs. eager (práctica en casa) | `05-carga/` | `npm run test:ej05` |
| 7. Herencia (TPH) — Track: Song/Podcast/Audiobook | `07-herencia/` | `npm run test:ej07` |
| 7b. Herencia (TPC) (práctica en casa) | `07-herencia/table-per-class/` | `npm run test:ej07b` |
| 8. QueryBuilder (práctica en casa) | `08-query-builder/` | `npm run test:ej08` |
| 9. Optimización — evitar N+1 (práctica en casa) | `09-optimizacion/` | `npm run test:ej09` |
| 10. Migraciones (práctica en casa) | `10-migraciones/` | `npm run test:ej10` |
| 11. Transacciones con QueryRunner (práctica en casa) | `11-transacciones/` | `npm run test:ej11` |

## Otros scripts

```bash
npm test -- <ruta al .spec.ts>  # corre un solo ejercicio
npm run typecheck
npm run clean                   # borra los .sqlite/dist generados
```

## Cómo ver el resultado

Cada `exercise.spec.ts` sigue el mismo patrón: `beforeAll` inicializa la
base de datos del scope correspondiente (`EJ_SCOPE`, ver
`src/common/data-source.ts` — cada ejercicio registra solo sus propias
entidades, para no colisionar con las de otro), `beforeEach` limpia las
tablas, y cada test **construye sus propios objetos tipados**, los
inserta con los métodos que hay que implementar, y valida el objeto
tipado que devuelve la consulta correspondiente — nunca inspecciona SQL
directamente.

Como varios ejercicios comparten el mismo `DataSource` (a diferencia de
Clase 3, que es SQL crudo sin ese acoplamiento), correr `npm test` sin
`EJ_SCOPE` corre todo `test:ejNN` en secuencia (`--runInBand`); para
enfocarse en uno solo, usar su script `test:ejNN` puntual.
