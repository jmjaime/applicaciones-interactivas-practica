import { RequestHandler } from "express";

// TODO 5.2: loggear `req.method` y `req.path` con `console.log` y llamar a
// `next()` — sin next(), la request se cuelga (mismo caso visto en la
// teoría de middlewares).
export const loggingMiddleware: RequestHandler = (req, res, next) => {
  next();
};
