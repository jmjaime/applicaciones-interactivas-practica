import { Router } from "express";

export const expressBasicoRouter = Router();

expressBasicoRouter.post("/eco", (_req, res) => {
  // TODO: leer el campo "texto" de req.body y responder con status 200
  // un JSON { "recibido": <texto> }. Ver README.md de esta carpeta.
  res.status(501).json({ error: "TODO: Implement /eco" });
});
