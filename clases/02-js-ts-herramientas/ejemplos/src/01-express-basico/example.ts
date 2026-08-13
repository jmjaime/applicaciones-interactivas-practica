import { Router } from "express";

export const expressBasicoRouter = Router();

expressBasicoRouter.get("/saludo/:nombre", (req, res) => {
  res.json({ mensaje: `Hola, ${req.params.nombre}` });
});

// 🔧 Probá vos: agregar GET /saludo (sin :nombre) que salude "Hola, mundo"
// — Express matchea rutas más específicas antes que las generales.
