import { Router } from "express";

export const validacionManualRouter = Router();

validacionManualRouter.post("/tareas-manual", (req, res) => {
  const { titulo } = req.body;

  if (typeof titulo !== "string" || titulo.trim().length === 0) {
    return res.status(400).json({ error: "titulo es requerido" });
  }

  res.status(201).json({ titulo });
});
