import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Una sola vez por proyecto, antes de usar `.openapi()` en cualquier schema.
extendZodWithOpenApi(z);

// El mismo schema valida el body acá (POST /artists) y, en 04-openapi/,
// se registra para generar la documentación — una sola declaración, dos
// usos (más el tipo inferido, `ArtistInput`).
export const ArtistSchema = z
  .object({
    name: z.string().min(1).openapi({ example: "Rosalía" }),
    genre: z.string().min(1).openapi({ example: "flamenco pop" }),
  })
  .openapi("Artist");

export type ArtistInput = z.infer<typeof ArtistSchema>;
