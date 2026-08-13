import { Router } from "express";

export interface Tarea {
  id: number;
  titulo: string;
  estado: "pendiente" | "en-curso" | "hecha";
  prioridad: "alta" | "media" | "baja";
}

export const tareas: Tarea[] = [
  { id: 1, titulo: "Preparar el TPO", estado: "pendiente", prioridad: "alta" },
  { id: 2, titulo: "Repasar Express", estado: "en-curso", prioridad: "media" },
  { id: 3, titulo: "Leer sobre Zod", estado: "hecha", prioridad: "baja" },
];

export const filtrarModificarRouter = Router();

filtrarModificarRouter.get("/tareas", (req, res) => {
  const { estado } = req.query;
  const resultado = estado ? tareas.filter((t) => t.estado === estado) : tareas;
  res.json(resultado);
});

filtrarModificarRouter.get("/tareas/:id/resumen", (req, res) => {
  const tarea = tareas.find((t) => t.id === Number(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const { id, titulo } = tarea; // subconjunto de propiedades, no el objeto entero
  res.json({ id, titulo });
});

filtrarModificarRouter.patch("/tareas/:id", (req, res) => {
  const indice = tareas.findIndex((t) => t.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tareas[indice] = { ...tareas[indice], ...req.body }; // copia y pisa lo que vino
  res.json(tareas[indice]);
});

// 🔧 Probá vos: agregar GET /tareas?prioridad=alta (mismo patrón que ?estado=)
// y notar que se puede combinar con el filtro de estado sin tocar la lógica existente.
