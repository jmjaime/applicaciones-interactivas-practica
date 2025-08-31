## Clase 3 — API Express + Jest

Este proyecto contiene una API mínima en Node.js/Express escrita en TypeScript, con entorno de testing usando Jest y Supertest.

### Estructura del proyecto

```
unidad1/clase3/
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ config/
│  │  └─ env.ts
│  └─ routes/
│     ├─ health/
│     │  ├─ health.ts
│     │  └─ health.spec.ts
│     └─ echo/            ← carpeta para el ejercicio `GET /echo`
├─ jest.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

- **src/app.ts**: inicializa y compone la app de Express (rutas, middlewares, etc.).
- **src/server.ts**: arranque del servidor HTTP.
- **src/config/env.ts**: manejo de variables de entorno.
- **src/routes/**: rutas de la API y sus tests asociados.

### Scripts (package.json)

En `package.json` están definidos los siguientes comandos:

- **build**: compila TypeScript a JavaScript en `dist/`.
- **start**: ejecuta el servidor compilado desde `dist/server.js`.
- **dev**: ejecuta el servidor en modo desarrollo con `ts-node`.
- **test**: ejecuta la suite de tests con Jest.

Comandos exactos:

```bash
npm run build
npm run start
npm run dev
npm run test
```

### Cómo ejecutar

1. Desarrollo:

```bash
npm run dev
```

2. Tests:

```bash
npm run test
```

3. Producción:

```bash
npm run build
npm run start
```

---

## Ejercicio incremental (1/2)

- Paso 1: crear endpoint `GET /echo?msg=...` que devuelva `{ msg }`
- Paso 2: si falta `msg`, responder 400 con `{ error: "msg is required" }`

---

## Ejercicio incremental (2/2)

- Paso 3: agregar endpoint `POST /sum` que reciba `{ a, b }` y devuelva `{ result }`
- Paso 4: escribir tests para `GET /echo` y `POST /sum`

### Sugerencias de implementación

- Ubicar `GET /echo` dentro de `src/routes/echo/` (por ejemplo, `echo.ts` y su test `echo.spec.ts`).
- Para `POST /sum`, crear una nueva carpeta `sum` en `routes/`.
- Usar Supertest para probar respuestas HTTP, códigos de estado y payloads JSON.

### Referencia rápida: obtener parámetros en Express

- Documentación relevante:

  - Express 5 — `req.query`: `https://expressjs.com/en/5x/api.html#req.query`
  - Express 5 — `req.params`: `https://expressjs.com/en/5x/api.html#req.params`
  - Express 5 — `express.json()` (middleware): `https://expressjs.com/en/5x/api.html#express.json`
  - Express 5 — Objeto Request: `https://expressjs.com/en/5x/api.html#req`
  - Supertest — API: `https://github.com/ladjs/supertest#readme`

- Ejemplo de lectura de query param:

```ts
import { Request, Response, Router } from "express";
const router = Router();

router.get("/demo", (req: Request, res: Response) => {
  const q = req.query["q"]; // por ejemplo, /demo?q=algo
  // usar/validar q según necesidad...
  res.sendStatus(204);
});
```

- Ejemplo de lectura de JSON body (requiere `express.json()`):

```ts
router.post("/demo-json", (req: Request, res: Response) => {
  const payload = req.body; // e.g., { "x": 1, "y": 2 }
  // validar tipos y contenido...
  res.sendStatus(204);
});
```

### Ejemplos esperados (referenciales)

- `GET /echo?msg=hola` → 200 `{ "msg": "hola" }`
- `GET /echo` (sin `msg`) → 400 `{ "error": "msg is required" }`
- `POST /sum` con body `{ "a": 2, "b": 3 }` → 200 `{ "result": 5 }`
