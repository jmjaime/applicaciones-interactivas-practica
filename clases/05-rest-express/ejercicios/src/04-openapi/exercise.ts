import { Router } from "express";
import { z } from "zod";
import { collections } from "../data";

// TODO 4.1: declarar el schema con Zod — un objeto con `name` (string, no
// vacío). Mismo patrón que `ArtistSchema` de la teoría
// (`z.object({ name: z.string(), genre: z.string() })`), acá con un solo
// campo. Exportado: `document.ts` lo registra para generar el spec.
export const CollectionSchema = z.object({});

export const collectionSchemaRouter = Router();

let nextId = Math.max(...collections.map((c) => c.id)) + 1;

collectionSchemaRouter.post("/collections", (req, res) => {
  // TODO 4.1: validar `req.body` con `CollectionSchema.safeParse(...)`. Si
  // falla, 400 con `{ error: resultado.error.issues }`. Si es válido,
  // crear una Collection nueva con `nextId++`, `bookIds: []`, agregarla a
  // `collections` (push) y responder 201 con la collection creada.
  res.status(501).json({ error: "TODO: Implement POST /collections" });
});
