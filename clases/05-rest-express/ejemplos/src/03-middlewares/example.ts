import { Router } from "express";
import { HttpError } from "../errors";

export const middlewaresRouter = Router();

// Ruta pensada solo para disparar el middleware de errores en aislamiento,
// sin depender de otro tema de la demo.
middlewaresRouter.get("/demo/error", (_req, _res, next) => {
  next(new HttpError(400, "Error de ejemplo, provocado a propósito"));
});

// 🔧 Probá vos: cambiar el `next(new HttpError(...))` acá por
// `throw new Error("boom")` y ver que errorHandler.ts lo agarra igual —
// por la rama del 500, no la de HttpError.
