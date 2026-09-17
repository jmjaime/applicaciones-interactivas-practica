# Clase 7 — Repaso: Repository, rutas/paginado, Validación, Documentación y JWT en el TPO

Repaso de cuatro temas ya vistos — **Repository** (Clase 4 y 6), **rutas con
path/query params y paginado** (Clase 5 y 6), **validación** con
DTO/`class-validator` o schema/Zod (Clase 2, 4, 5 y 6) y **documentación de
la API** con OpenAPI/Swagger (Clase 5) — más **JWT** (nuevo), aplicados
**directamente sobre el propio proyecto del TPO** de cada equipo. Al final,
cada equipo debería tener el modelo de acceso a datos, el listado
paginado/filtrado, la validación de entrada, la documentación de sus
endpoints y el login del Vendedor encaminados para la 1° entrega.

Slides en `slides/clase7-slides.html` — mismos cinco bloques que esta guía,
con el "cómo se resuelve" de cada uno en código. Los fragmentos de código
(acá y en las slides) son de referencia sobre el dominio del TPO, para
adaptar al código propio, no para copiar y pegar tal cual.

## Antes de empezar — diagnóstico rápido

Por equipo, antes de arrancar los pasos:

- [ ] Entidades del TPO mapeadas con TypeORM — `Inmobiliaria`, `Propiedad`,
      etc. (enumerar todas las del propio dominio — ver `TPO/tpo.md` § El
      dominio).
- [ ] Servidor Express levantando y respondiendo al menos un endpoint.
- [ ] Migraciones creadas/generadas y corriendo contra una base local.
- [ ] Base de datos corriendo y la app conectada sin errores.

Si falta alguno de estos cuatro puntos, priorizarlo antes de seguir con los
pasos de abajo — son la base de todo lo demás.

---

## Paso 1 — Repository: acceso a datos de las entidades del TPO

Repaso de lo visto en `clases/04-typeorm/` y `clases/06-apis-rest/`: la
capa de acceso a datos (queries contra la base, vía `Repository<Entity>` de
TypeORM) se mantiene separada de las reglas de negocio (service) y de HTTP
(controller). El repository no valida reglas de negocio ni conoce `req`/`res`
— solo sabe leer y escribir filas.

Como mínimo, revisar (o crear, si todavía no existe) un repository por
entidad:

- `InmobiliariaRepository`
- `PropiedadRepository`
- `SolicitudVisitaRepository`
- `ComentarioRepository`
- `ReseñaRepository`

```ts
// repositories/propiedad.repository.ts
import { AppDataSource } from "../db/data-source";
import { Propiedad } from "../entities/Propiedad";

const repo = AppDataSource.getRepository(Propiedad);

export const PropiedadRepository = {
  findById(id: number) {
    return repo.findOneBy({ id });
  },
  save(propiedad: Propiedad) {
    return repo.save(propiedad);
  },
};
```

Cada regla de negocio del `tpo.md` que necesite "buscar/contar algo" nace
como un método de repository — la decisión (qué hacer con ese resultado) es
del service, no del repository:

- [ ] `InmobiliariaRepository.existsByNombreFantasia(nombre)` — soporta la
      regla "nombre de fantasía único" (`tpo.md` § Reglas de negocio).
- [ ] `PropiedadRepository.countActivasByInmobiliaria(id)` — soporta la regla
      "una Inmobiliaria se elimina solo sin `Publicada`/`Reservada`".
- [ ] `SolicitudVisitaRepository.hasConfirmadasByPropiedad(id)` — soporta la
      regla "Propiedad con visita `Confirmada` pendiente no se edita ni
      elimina".

**Documentación oficial**: [TypeORM](https://typeorm.io/docs/) ·
[Repository API](https://typeorm.io/repository-api)

## Paso 2 — Express: rutas, params y paginado

Repaso de lo visto en `clases/05-rest-express/` (routing, middlewares) y
`clases/06-apis-rest/` (paginado con `findAndCount`). Se aplica directamente
a la pantalla **Listado de propiedades (home)** del TPO (`tpo.md` § Pantallas
mínimas → Para el Interesado): filtros combinados, búsqueda de texto,
orden y paginado.

- **Path params**: identifican un recurso — `GET /inmobiliarias/:id`,
  `GET /propiedades/:id`.
- **Query params**: filtran/ordenan/paginan una colección — nunca un
  recurso puntual. Para el listado de propiedades: `page`, `limit`, `tipo`,
  `operacion`, `precioMin`/`precioMax`, `zona`, `ambientes`, `amenities`,
  `q` (texto libre en título/descripción), `sort` (`precio`,
  `fechaPublicacion`, `superficieTotal`).

```ts
// controllers/propiedades.controller.ts
export async function list(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 10);

  const qb = propiedadRepo
    .createQueryBuilder("p")
    .where("p.estado = :estado", { estado: "PUBLICADA" });

  if (req.query.tipo) qb.andWhere("p.tipo = :tipo", { tipo: req.query.tipo });
  if (req.query.operacion)
    qb.andWhere("p.operacion = :operacion", { operacion: req.query.operacion });
  if (req.query.q)
    qb.andWhere("(p.titulo LIKE :q OR p.descripcion LIKE :q)", {
      q: `%${req.query.q}%`,
    });
  // resto de filtros (precioMin/Max, zona, ambientes, amenities) con el
  // mismo patrón: solo se agregan si vienen en la query.

  const [items, total] = await qb
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  res.json({ items, page, limit, total });
}
```

Checklist:

- [ ] `page` 1-indexed, `limit` con tope (evita que pidan `limit=10000`).
- [ ] Filtros combinables entre sí (tipo + operación + zona a la vez, no uno
      solo a la vez).
- [ ] `GET /inmobiliarias/:id/propiedades` — ruta anidada para el "Sitio del
      vendedor" (`tpo.md` § Pantallas mínimas), reusando el mismo paginado.
- [ ] Ordenamiento por precio, fecha de publicación o superficie (`sort`).

**Documentación oficial**: [Express](https://expressjs.com/) ·
[TypeORM QueryBuilder](https://typeorm.io/select-query-builder)

## Paso 3 — Validación: DTO o schema antes del service

Repaso de lo visto en `clases/04-typeorm/`/`clases/06-apis-rest/`
(`class-validator`) y `clases/02-js-ts-herramientas/`/`clases/05-rest-express/`
(Zod). Todo body de entrada se valida **antes** de llamar al service — el
service nunca recibe datos sin validar. Elegir uno de los dos enfoques, no
hace falta usar ambos.

**Opción A — DTO con `class-validator`** (mismo patrón que
`06-apis-rest/ejercicios/src/controllers/propiedades.dto.ts`):

```ts
// dto/propiedad.dto.ts
export class CreatePropiedadDto {
  @IsString() @IsNotEmpty() titulo!: string;
  @IsEnum(TipoPropiedad) tipo!: TipoPropiedad;
  @IsNumber() @IsPositive() precio!: number;
  @IsInt() inmobiliariaId!: number;
}
```

```ts
// controllers/propiedades.controller.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

const dto = plainToInstance(CreatePropiedadDto, req.body);
const errors = await validate(dto);

if (errors.length > 0) {
  return res.status(400).json({ error: "Datos inválidos", details: errors });
}
// dto validado → recién ahora se llama al service
```

**Opción B — schema con Zod** (mismo patrón que Clase 5,
`01-crud/schemas.ts`):

```ts
// schemas/propiedad.schema.ts
export const CreatePropiedadSchema = z.object({
  titulo: z.string().min(1),
  tipo: z.nativeEnum(TipoPropiedad),
  precio: z.number().positive(),
  inmobiliariaId: z.number().int(),
});
```

```ts
// controllers/propiedades.controller.ts
const resultado = CreatePropiedadSchema.safeParse(req.body);

if (!resultado.success) {
  return res.status(400).json({ error: resultado.error.issues });
}
// resultado.data → ya validado y tipado
```

`safeParse` nunca tira excepción — a diferencia de `.parse()`, que hay que
envolver en `try/catch`.

Checklist:

- [ ] Un DTO/schema por cada entidad que se crea/actualiza vía
      `POST`/`PATCH` (Propiedad, SolicitudVisita, Comentario, Reseña).
- [ ] Validar en el controller antes de llamar al service — nunca dejar
      pasar un body inválido a la capa de negocio.

**Documentación oficial**:
[class-validator](https://github.com/typestack/class-validator) ·
[Zod](https://zod.dev/)

## Paso 4 — Documentación de la API: OpenAPI + Swagger UI

Repaso de lo visto en `05-rest-express/ejemplos/src/04-openapi`: un schema
se registra una sola vez y sirve para dos cosas — validar (Paso 3) y
documentar. Nadie escribe el YAML a mano. Si el equipo validó con
`class-validator` en vez de Zod, no hace falta migrar: alcanza con describir
la misma estructura una vez más en un schema de Zod solo para documentar —
no tiene que ser el que valida.

```ts
// docs/document.ts
const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "get",
  path: "/propiedades",
  summary: "Listado de propiedades (con filtros y paginado)",
  request: { query: PropiedadQuerySchema },
  responses: {
    200: {
      description: "OK",
      content: { "application/json": { schema: PropiedadListSchema } },
    },
  },
});

export function buildOpenApiDocument() {
  return new OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: "3.0.0",
    info: { title: "TPO API", version: "1.0.0" },
  });
}
```

```ts
// app.ts
import swaggerUi from "swagger-ui-express";

app.use("/docs", swaggerUi.serve, swaggerUi.setup(buildOpenApiDocument()));
```

Checklist:

- [ ] Registrar al menos dos endpoints propios en el `registry` — uno del
      Interesado, uno del Vendedor (protegido).
- [ ] Levantar `/docs` y confirmar que ambos aparecen documentados con sus
      responses (incluido el 401/403 si corresponde).

**Documentación oficial**:
[OpenAPI Specification](https://swagger.io/specification/) ·
[zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi) ·
[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

## Paso 5 — JWT: login del Vendedor y rutas protegidas

Tema nuevo — no se vio en clases anteriores. Se aplica solo al lado del
**Vendedor**: el **Interesado** nunca se loguea (`tpo.md` § Usuarios →
Interesado — actúa sin cuenta), así que sus rutas (ver propiedad, comentar,
pedir visita, dejar reseña) quedan siempre públicas.

**Qué es un JWT**: un token firmado por el servidor
(`header.payload.signature`) que el cliente guarda y reenvía en cada
request (`Authorization: Bearer <token>`); el servidor lo verifica con una
clave secreta sin necesitar guardar sesión en la base — stateless.

| Parte | Qué contiene | Ejemplo (TPO) |
|---|---|---|
| **Header** | algoritmo de firma + tipo | `{ "alg": "HS256", "typ": "JWT" }` |
| **Payload** | datos (claims) | `{ vendedorId: 12, exp: 123456 }` |
| **Signature** | header+payload firmados con la clave secreta | detecta si el token fue alterado |

Header y payload van en base64 — **no encriptados**: nunca poner datos
sensibles ahí (contraseñas, tarjetas). La signature es lo único que
garantiza que no fue modificado.

Paquetes que hacen falta (no vistos antes): `jsonwebtoken` (firmar/verificar
el token) y `bcrypt` (hashear la contraseña — **nunca** se guarda en texto
plano).

```ts
// routes/auth.routes.ts
router.post("/auth/registro", async (req, res) => {
  const { nombre, apellido, email, password, nombreFantasia } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const vendedor = await VendedorRepository.save({ nombre, apellido, email, passwordHash });
  await InmobiliariaRepository.save({ nombreFantasia, vendedorId: vendedor.id, /* ... */ });
  res.status(201).json({ id: vendedor.id, email: vendedor.email });
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const vendedor = await VendedorRepository.findByEmail(email);
  const valido = vendedor && (await bcrypt.compare(password, vendedor.passwordHash));
  if (!valido) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ vendedorId: vendedor.id }, process.env.JWT_SECRET!, {
    expiresIn: "2h",
  });
  res.json({ token });
});
```

```ts
// middlewares/requireAuth.ts
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) return res.status(401).json({ error: "Falta token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { vendedorId: number };
    req.vendedorId = payload.vendedorId; // requiere extender el tipo Request
    next();
  } catch {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}
```

```ts
// routes/propiedades.routes.ts
router.get("/propiedades", propiedadesController.list); // público (Interesado)
router.post("/mis-propiedades", requireAuth, propiedadesController.create); // Vendedor
router.patch("/mis-propiedades/:id", requireAuth, propiedadesController.update); // Vendedor
```

Un `id` en la URL nunca prueba de quién es el recurso — eso lo dice el
token. La verificación es una regla de negocio: va en el **service**, no
directo en el controller:

```ts
// services/propiedades.service.ts
export async function esPropietario(propiedadId: number, vendedorId: number) {
  const inmobiliaria = await InmobiliariaRepository.findByVendedorId(vendedorId);
  const propiedad = await PropiedadRepository.findById(propiedadId);
  return propiedad.inmobiliariaId === inmobiliaria.id;
}
```

```ts
// controllers/propiedades.controller.ts
export async function update(req: Request, res: Response) {
  const ok = await propiedadesService.esPropietario(Number(req.params.id), req.vendedorId!);
  if (!ok) return res.status(403).json({ error: "No pertenece a tu inmobiliaria" });
  // ... continúa con el update
}
```

Checklist:

- [ ] Contraseña siempre hasheada con `bcrypt`, nunca en texto plano ni en
      ningún response.
- [ ] `JWT_SECRET` sale de una variable de entorno (`.env`), no hardcodeado.
- [ ] Token con expiración (`expiresIn`).
- [ ] 401 si falta el header `Authorization` o el token es inválido/expiró.
- [ ] Rutas de "Mis propiedades", "Solicitudes de visita", "Consultas",
      "Actividad" y "Reportes" (`tpo.md` § Pantallas mínimas → Para el
      Vendedor) protegidas con `requireAuth`.
- [ ] Rutas del Interesado (listado, detalle, comentar, pedir visita, dejar
      reseña) **sin** `requireAuth`.
- [ ] Cada acción protegida limitada a los recursos de la propia
      inmobiliaria del token, no de cualquier `id` que venga en la URL/body.

**Documentación oficial**:
[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) ·
[jwt.io/introduction](https://jwt.io/introduction) ·
[bcrypt](https://www.npmjs.com/package/bcrypt)

---

## Cómo se usa esta clase

Trabajo en equipos sobre el propio repo del TPO, con esta guía como consulta
y el docente circulando para dudas puntuales — no hay una entrega para esta
clase en sí. El objetivo es llegar encaminados a la 1° entrega del TPO
(Clase 8).

## Material de referencia (clases anteriores)

- `clases/02-js-ts-herramientas/` — validación con Zod.
- `clases/04-typeorm/` — entidades, relaciones, migraciones con TypeORM,
  validación con `class-validator`.
- `clases/05-rest-express/` — routing, middlewares, manejo de errores con
  Express, documentación OpenAPI generada desde Zod.
- `clases/06-apis-rest/` — repository + service + controller en capas,
  paginado con `findAndCount`, validación con DTO, sobre el mismo dominio
  del TPO (`Propiedad`/`Inmobiliaria`) — la referencia más directa para los
  Pasos 1, 2 y 3 de esta guía.
