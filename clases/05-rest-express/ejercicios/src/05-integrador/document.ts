import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registry } from "../04-openapi/document";
import { AuthorPatchSchema } from "./exercise";
import { z } from "zod";

extendZodWithOpenApi(z);

// TODO 5.4: registrar el path con `registry.registerPath({...})` — mismo
// `registry` de 04-openapi (importado arriba, no uno nuevo), así
// /docs muestra POST /collections y PATCH /authors/{id} juntos. Método
// "patch", path "/authors/{id}", body con `AuthorPatchSchema`, respuestas
// 200 (con AuthorPatchSchema) y 404. `buildOpenApiDocument()` ya está
// armado en `04-openapi/document.ts` — no hace falta repetirlo
// acá, solo importarlo donde se sirve `/docs` (`app.ts`).
