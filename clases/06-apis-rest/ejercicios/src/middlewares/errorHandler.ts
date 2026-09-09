import { ErrorRequestHandler } from "express";
import { NotFoundError, ConflictError } from "../errors/propiedades.errors";

// Middleware de errores centralizado (4 parámetros: Express lo reconoce
// por la firma, no por dónde se registra). Mismo patrón que
// clases/05-rest-express/ejemplos/src/03-middlewares — acá mapea los
// errores de dominio de Propiedades a su status HTTP.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: { code: "NOT_FOUND", message: err.message } });
  }
  if (err instanceof ConflictError) {
    return res.status(409).json({ error: { code: "CONFLICT", message: err.message } });
  }

  console.error(err);
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "unexpected error" },
  });
};
