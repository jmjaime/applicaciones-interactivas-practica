import { Router } from "express";
import { z } from "zod";
import { authors } from "../data";
import { HttpError } from "./errors";

// TODO 5.3: declarar el schema con Zod para el body de PATCH — mismos
// campos que Author (`name`, `nationality`) pero todos opcionales, porque
// PATCH solo manda lo que cambia (`z.object({...}).partial()`).
export const AuthorPatchSchema = z.object({});

export const integradorRouter = Router();

integradorRouter.patch("/authors/:id", (req, res, next) => {
  // TODO 5.3: buscar el author por id. Si no existe, `next(new
  // HttpError(404, "Author no encontrado"))`. Si existe, validar
  // `req.body` con `AuthorPatchSchema.safeParse(...)` — si falla, 400 con
  // `{ error: resultado.error.issues }`. Si es válido, pisar el author
  // (`Object.assign` o spread) con los campos que vinieron y responder 200
  // con el author actualizado.
  next(new HttpError(501, "TODO: Implement PATCH /authors/:id"));
});

integradorRouter.delete("/authors/:id", (req, res, next) => {
  // TODO 5.1: buscar el índice del author por id. Si no existe,
  // `next(new HttpError(404, "Author no encontrado"))`. Si existe,
  // sacarlo de `authors` con `splice` y responder 204 sin body.
  next(new HttpError(501, "TODO: Implement DELETE /authors/:id"));
});
