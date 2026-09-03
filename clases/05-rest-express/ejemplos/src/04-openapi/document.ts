import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { ArtistSchema } from "../01-crud/schemas";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/artists",
  summary: "Crear un artista",
  request: {
    body: {
      content: { "application/json": { schema: ArtistSchema } },
    },
  },
  responses: {
    201: {
      description: "Creado",
      content: { "application/json": { schema: ArtistSchema } },
    },
    400: { description: "Body inválido" },
  },
});

// `generateDocument()` produce el JSON completo — nadie lo escribió a mano,
// sale del mismo schema que ya valida el body en 01-crud/example.ts
// (POST /artists). Este tema no repite esa ruta, solo la documenta.
export function buildOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Streaming API — Clase 5",
      version: "1.0.0",
      description: "Documento generado desde schemas de Zod (code-first)",
    },
  });
}
