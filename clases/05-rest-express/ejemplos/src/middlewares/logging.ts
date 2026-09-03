import { RequestHandler } from "express";

// app.use(loggingMiddleware) sin prefijo: se aplica a todas las rutas de la app.
export const loggingMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
