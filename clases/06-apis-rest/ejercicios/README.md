# Ejercicios · Clase 6 · APIs REST

Un solo ejercicio: **Propiedades**, ABM de `Propiedad` del dominio del TPO
(`TPO/tpo.md` § Propiedad) persistido con TypeORM + sql.js, punta a
punta — migraciones de esquema (generadas con el CLI de TypeORM, una por
tabla), un script de seed aparte (no es una migración), repository,
service con reglas de negocio, controller con validación
(`class-validator`), logging, manejo de errores centralizado y
paginación. Capas Controller → Service → Repository sobre Express 5 + TS,
cada una en su propia carpeta.

`Propiedad` e `Inmobiliaria` (`entities/`) ya están mapeadas — el foco no
es repasar decoradores de columnas (eso ya se practicó en la Clase 4), es
todo lo que se apoya encima.

Base: http://localhost:3001

## Correr tests

```bash
cd clases/06-apis-rest/ejercicios
npm install
npm test
```

## Ejecutar servidor (opcional para requests.http)

```bash
npm run dev
# o
npm run build && npm start
```

Puerto configurable por `PORT` (ver `.env.example`) — default `3001`.

## Migraciones (CLI de TypeORM)

```bash
npm run migration:generate   # diffea entities/ contra la DB y genera una migración
npm run migration:run        # aplica las migraciones pendientes (orden por timestamp)
```

`migrations/NNNNN-CreateInmobiliarias.ts` y
`migrations/NNNNN-CreatePropiedades.ts` ya se generaron así, a partir de
las entidades (no se escribieron a mano) — **una migración por tabla**:
cada migración versiona un cambio puntual, no todo el esquema de una vez
(una migración que junta cambios sin relación entre sí es más difícil de
revertir sola).

## Seed (no es una migración)

```bash
npm run seed   # pobla la base con datos de ejemplo (db/seed.json)
```

El seed vive en `db/seed.ts`, no en `migrations/`: es una herramienta de
prueba manual para tener datos con los que probar la API (`requests.http`)
o iterar en desarrollo, no un cambio de esquema versionado — por eso no
se ejecuta con `migration:run`. Necesita que las tablas ya existan
(correr `migration:run` antes). Ya está resuelto — el fixture
(`db/seed.json`) trae 2 inmobiliarias con 100 propiedades cada una (200
en total) para que paginar tenga sentido al probar a mano.

Tablas y columnas quedan en `snake_case` de forma automática:
`db/data-source.ts` y `db/cli-data-source.ts` configuran
`namingStrategy: new SnakeNamingStrategy()` (paquete
`typeorm-naming-strategies`) — las entidades siguen escribiéndose en
camelCase (`nombreFantasia`, `inmobiliariaId`), TypeORM traduce solo al
tocar la base (`nombre_fantasia`, `inmobiliaria_id`). Por eso el SQL
crudo de las migraciones (`INSERT INTO`) usa los nombres snake_case, no
los nombres de propiedad de la entidad.

Las entidades tampoco se listan una por una: `entities: [glob]` apunta a
`entities/*.{ts,js}` (mismo criterio que `migrations: ["src/migrations/*.ts"]`)
— agregar una entidad nueva alcanza con crear el archivo en `entities/`,
sin tocar el DataSource.

---

## Estructura

```
src/
  app.ts                  # crea app express (logging + router + error handler)
  index.ts                # arranque (inicializa la DB antes de levantar el server)
  entities/{Inmobiliaria,Propiedad}.ts
  db/
    data-source.ts        # DataSource de runtime (en memoria)
    cli-data-source.ts    # DataSource para el CLI de migraciones (archivo persistente)
    seed.json              # fixture: 2 inmobiliarias, 100 propiedades c/u
    seed.ts                 # script de seed (npm run seed, ya resuelto) — no es una migración
  migrations/
    NNNNN-CreateInmobiliarias.ts   # esquema, generada con migration:generate (dada)
    NNNNN-CreatePropiedades.ts     # esquema, generada con migration:generate (dada)
  repositories/propiedades.repository.ts
  services/propiedades.service.ts
  controllers/
    propiedades.controller.ts
    propiedades.dto.ts    # DTOs de entrada (class-validator)
  errors/propiedades.errors.ts   # NotFoundError, ConflictError
  middlewares/
    logging.ts            # loguea método/path/status/tiempo
    errorHandler.ts
  routes/propiedades.routes.ts
__tests__/
  helpers.ts          # fixtures compartidas (no es un test — ver jest.config.ts)
  esquema.spec.ts      # migraciones + seed (ya resueltos)
  repository.spec.ts    # paginación + update
  validacion.spec.ts    # DTOs (class-validator)
  service.spec.ts       # reglas de negocio
  controller.spec.ts    # end-to-end vía HTTP
requests.http
```

`errors/propiedades.errors.ts`, `middlewares/errorHandler.ts` y
`middlewares/logging.ts` ya están resueltos: son la misma idea de
middlewares de `clases/05-rest-express/ejemplos/src/03-middlewares`,
aplicada acá — el service lanza `NotFoundError`/`ConflictError`, el
controller no hace `try/catch` (Express 5 reenvía solo el rechazo de una
promesa async al error handler), y `errorHandler.ts` los traduce a
404/409.

Endpoints: `GET/POST /api/propiedades`, `GET/PATCH/DELETE
/api/propiedades/:id`.

---

## Objetivo

Resolver, en un solo recurso, todo el recorrido de una API persistida
real: capas Controller → Service → Repository sobre TypeORM, migraciones
de esquema, un script de seed para poblar datos de prueba, validación de
datos de entrada, manejo de errores centralizado y paginación. Lo que se
resuelve acá es directamente reusable en el TPO.

Pensado para resolverse **de abajo hacia arriba**: cada archivo de
`__tests__/` prueba una sola capa, en el mismo orden en que conviene
resolverlas (`esquema` → `repository` → `validacion` → `service` →
`controller`; `esquema` ya está resuelto) — correr `npm test -- <nombre>`
(por ejemplo `npm test -- repository`) después de cada TODO muestra qué
capa ya quedó resuelta sin esperar a terminar todo.

## Requisitos

- [ ] `repositories/propiedades.repository.ts` → `findAllPaginated(page, limit)`:
      página 1-indexed con `findAndCount`, devuelve `{ items, total }`.
- [ ] `repositories/propiedades.repository.ts` → `update(id, partial)`:
      merge parcial sobre la entidad existente, actualiza `updatedAt`,
      devuelve `undefined` si no existe.
- [ ] `controllers/propiedades.dto.ts` → `CreatePropiedadDto`: agregar los
      decoradores de `class-validator` que faltan (marcados con `TODO`)
      para que `titulo`/`tipo`/`operacion`/`precio`/`moneda`/
      `superficieTotal`/`inmobiliariaId` inválidos sean rechazados.
- [ ] `services/propiedades.service.ts` → `create(dto)`: toda propiedad
      nueva arranca en `EstadoPropiedad.BORRADOR`, sin importar qué
      `estado` venga en el body.
- [ ] `services/propiedades.service.ts` → `update(id, changes)`: si la
      propiedad no existe, lanzar `NotFoundError`; si está en
      `VENDIDA`/`ALQUILADA`/`CANCELADA`, lanzar `ConflictError` sin llegar
      a tocar el repositorio; caso contrario, aplicar los cambios.
- [ ] `controllers/propiedades.controller.ts` → `list`: query params
      `page`/`limit` (defaults 1/10, `limit` tope 50) → 200
      `{ items, page, limit, total }`.
- [ ] `controllers/propiedades.controller.ts` → `create`/`update`:
      validar el DTO con `class-validator` antes de llamar al service; 400
      si hay errores, 201 (+ `Location`) o 200 si está todo bien — el 404/409
      por `NotFoundError`/`ConflictError` los resuelve solo el error
      handler, no hace falta manejarlos acá.

---

## Notas

- Usa `kebab-case` en rutas, `camelCase` en JSON.
- Usa códigos de estado correctos (2xx/4xx/5xx) y `Location` en 201 Created.
- No usar `*` en selects/respuestas; lista explícita de campos.
