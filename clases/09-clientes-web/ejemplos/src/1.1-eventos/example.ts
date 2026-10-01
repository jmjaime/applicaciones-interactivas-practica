import { Router } from "express";
import { activities, comments, newId } from "../data";
import { HttpError } from "../errors";
import { activityService } from "./activity.service";
import { events } from "./events";

export const eventosRouter = Router();

function saveComment(propertyId: string, body: { authorName?: string; content?: string }) {
  if (!body.authorName || !body.content) {
    throw new HttpError(400, "authorName y content son obligatorios");
  }
  const comment = { id: newId(), propertyId, authorName: body.authorName, content: body.content, createdAt: new Date() };
  comments.push(comment);
  return comment;
}

// Versión síncrona: el service de comentarios llama directo a Actividad.
// Si Actividad falla, el cliente recibe un 500... aunque el comentario
// ya se guardó.
eventosRouter.post("/sync/properties/:id/comments", (req, res) => {
  const comment = saveComment(req.params.id, req.body);
  activityService.register("COMMENT", comment.id);
  res.status(201).json(comment);
});

// Versión con eventos: solo avisa que algo pasó. No conoce a Actividad ni
// a ningún otro interesado en el evento.
eventosRouter.post("/events/properties/:id/comments", (req, res) => {
  const comment = saveComment(req.params.id, req.body);
  events.emit("comment.created", comment);
  res.status(201).json(comment);
});

// Suscriptor: vive "en otro módulo". Si falla, el error queda acá.
events.on("comment.created", (comment) => {
  try {
    activityService.register("COMMENT", comment.id);
  } catch (err) {
    console.error(`[activity] no se registró el comentario ${comment.id}:`, (err as Error).message);
  }
});

// 🔧 Probá vos: sumar un segundo suscriptor sin tocar la ruta de arriba,
// p. ej. un "mail al vendedor":
// events.on("comment.created", (c) => console.log(`📧 Nueva consulta: ${c.content}`));

eventosRouter.get("/activity", (_req, res) => {
  res.json(activities);
});

eventosRouter.get("/comments", (_req, res) => {
  res.json(comments);
});

// Rutas de apoyo para la demo: tirar abajo / levantar Actividad.
eventosRouter.post("/demo/activity/down", (_req, res) => {
  activityService.setDown(true);
  res.json({ activity: "down" });
});

eventosRouter.post("/demo/activity/up", (_req, res) => {
  activityService.setDown(false);
  res.json({ activity: "up" });
});
