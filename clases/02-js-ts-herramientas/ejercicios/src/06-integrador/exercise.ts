import { Router } from "express";
import { z } from "zod";

// Dado: el schema y la validación. El ejercicio es la parte de abajo.
const crearTareaSchema = z.object({
  titulo: z.string().trim().min(1, "titulo es requerido"),
  prioridad: z.enum(["alta", "media", "baja"]).default("media"),
});

export const integradorRouter = Router();

integradorRouter.post("/tareas", (req, res) => {
  const resultado = crearTareaSchema.safeParse(req.body);
  if (!resultado.success) {
    return res.status(400).json({ error: resultado.error.issues[0].message });
  }

  // TODO: importar `tareas` de "../04-filtrar-modificar/exercise", crear
  // una tarea nueva con id = el mayor id existente en `tareas` + 1 (o 1 si
  // está vacío), estado = "pendiente", y titulo/prioridad de
  // resultado.data. Agregarla con push, y responder 201 con la tarea
  // creada.
  res.status(501).json({ error: "TODO: Implement POST /tareas" });
});
