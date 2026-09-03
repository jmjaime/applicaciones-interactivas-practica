import { extendZodWithOpenApi, OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { CollectionSchema } from "./exercise";
import { z } from "zod";

extendZodWithOpenApi(z);

// Exportado: 05-integrador/document.ts registra PATCH /authors/{id} en el
// mismo registry, así /docs termina mostrando los dos endpoints juntos.
export const registry = new OpenAPIRegistry();

// TODO 4.2: registrar el path con `registry.registerPath({...})` — mismo
// código que el demo de `ejemplos/04-openapi/document.ts` (POST /artists),
// acá para `POST /collections`: body con `CollectionSchema`, respuestas
// 201 (con CollectionSchema) y 400.

export function buildOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: { title: "Librería API — Clase 5", version: "1.0.0" },
  });
}
