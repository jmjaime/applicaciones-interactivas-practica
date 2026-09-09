import { RequestHandler } from "express";

// Mismo patrón que clases/05-rest-express/ejemplos/src/middlewares/logging.ts,
// con el agregado de status code y tiempo de respuesta usando el evento
// `finish` de `res` — se dispara cuando la respuesta ya se mandó, así que
// loggea lo que realmente pasó, no lo que se pidió.
export const loggingMiddleware: RequestHandler = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${ms}ms`);
  });
  next();
};
