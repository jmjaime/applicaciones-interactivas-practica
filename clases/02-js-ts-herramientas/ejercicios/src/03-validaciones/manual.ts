import { Router } from "express";

export const validacionManualRouter = Router();

validacionManualRouter.post("/comentarios-manual", (req, res) => {
  // TODO: leer autor y contenido de req.body y validar a mano (sin
  // librerías) que:
  // - autor sea un string no vacío
  // - contenido sea un string no vacío y de máximo 280 caracteres
  // Si algo falla, responder 400 con { "error": "<mensaje>" }.
  // Si todo está bien, responder 201 con { autor, contenido }.
  res.status(501).json({ error: "TODO: Implement /comentarios-manual" });
});
