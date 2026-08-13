import { Router } from "express";
import { z } from "zod";

// El schema define la validación una sola vez y también sirve para
// inferir el tipo TS (CrearTarea) — no se duplica una interfaz a mano.
export const crearTareaSchema = z.object({
  titulo: z.string().trim().min(1, "titulo es requerido"),
});
export type CrearTarea = z.infer<typeof crearTareaSchema>;

export const validacionZodRouter = Router();

validacionZodRouter.post("/tareas-zod", (req, res) => {
  const resultado = crearTareaSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({ error: resultado.error.issues });
  }

  const tarea: CrearTarea = resultado.data;
  res.status(201).json(tarea);
});

// 🔧 Probá vos: agregar .max(80) al validador de "titulo" y ver el mensaje
// de error que genera Zod solo, sin escribir el if a mano.
