import { Router } from "express";

export interface Tarea {
  id: number;
  titulo: string;
  estado: "pendiente" | "en-curso" | "hecha";
  prioridad: "alta" | "media" | "baja";
}

// Scaffolding ya armado — no es parte del ejercicio. Exportado porque el
// integrador (06-integrador/) agrega tareas nuevas acá.
export const tareas: Tarea[] = [
  { id: 1, titulo: "Preparar el TPO", estado: "pendiente", prioridad: "alta" },
  { id: 2, titulo: "Repasar Express", estado: "en-curso", prioridad: "media" },
  { id: 3, titulo: "Leer sobre Zod", estado: "hecha", prioridad: "baja" },
];

export const filtrarModificarRouter = Router();

filtrarModificarRouter.get("/tareas", (req, res) => {
  // TODO: filtrar por `req.query.prioridad` (si vino) igual que el ejemplo
  // filtra por `estado` — mismo patrón, otro campo.
  res.status(501).json({ error: "TODO: Implement GET /tareas" });
});

filtrarModificarRouter.get("/tareas/:id/detalle", (req, res) => {
  // TODO: buscar la tarea por id. Si no existe, 404 con
  // { error: "Tarea no encontrada" }. Si existe, devolver SOLO
  // { titulo, estado } (destructuring) — no el objeto entero.
  res.status(501).json({ error: "TODO: Implement GET /tareas/:id/detalle" });
});

filtrarModificarRouter.delete("/tareas/:id", (req, res) => {
  // TODO: buscar el índice de la tarea por id. Si no existe, 404. Si
  // existe, sacarla de `tareas` con splice y responder 204 sin body
  // (res.status(204).end()).
  res.status(501).json({ error: "TODO: Implement DELETE /tareas/:id" });
});
