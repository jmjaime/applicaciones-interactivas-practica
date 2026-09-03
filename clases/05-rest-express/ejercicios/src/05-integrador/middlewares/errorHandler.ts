import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors";

// TODO 5.2: middleware de 4 parámetros. Si `err` es instancia de
// `HttpError`, responder `res.status(err.status).json({ error: err.message })`.
// Si no, loggear el error y responder 500 con `{ error: "Error interno" }`.
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ error: "TODO: Implement errorHandler" });
};
