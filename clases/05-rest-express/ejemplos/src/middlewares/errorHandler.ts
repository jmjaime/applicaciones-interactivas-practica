import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors";

// Middleware de 4 parámetros: Express lo reconoce por la firma y lo salta
// hasta acá con next(err). Se monta al final de app.ts, después de las rutas.
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Error interno" });
};

// 🔧 Probá vos: comentar `app.use(errorHandler)` en app.ts y volver a pedir
// GET /artists/999/tracks — sin el middleware, Express usa su manejador por
// defecto (stack trace en HTML, nada de JSON).
