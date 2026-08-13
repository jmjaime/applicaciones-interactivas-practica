import { Router } from "express";
import { z } from "zod";

// TODO: completar el schema — autor: string no vacío; contenido: string no
// vacío y de máximo 280 caracteres (usar .max(280, "mensaje")).
const comentarioSchema = z.object({});

export const validacionZodRouter = Router();

validacionZodRouter.post("/comentarios-zod", (req, res) => {
  const resultado = comentarioSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({ error: resultado.error.issues });
  }
  res.status(201).json(resultado.data);
});
