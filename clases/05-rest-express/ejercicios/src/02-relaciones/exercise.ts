import { Router } from "express";
import { books, collections } from "../data";

export const collectionsRouter = Router();

collectionsRouter.get("/collections/:id/books", (req, res) => {
  // TODO 2.1: buscar la collection por id. Si no existe, 404 con
  // { error: "Collection no encontrada" }. Si existe, devolver los Book
  // cuyo id está en `collection.bookIds` (usar `books` de "../data").
  res.status(501).json({ error: "TODO: Implement GET /collections/:id/books" });
});

collectionsRouter.get("/books", (req, res) => {
  // TODO 2.2: mismos datos que 2.1, otro camino — si viene
  // `req.query.collectionId`, buscar esa collection y devolver sus Book
  // (mismo criterio que GET /collections/:id/books, pero por query param).
  // Si no existe la collection, 404. Sin el query param, devolver todos
  // los `books`.
  res.status(501).json({ error: "TODO: Implement GET /books" });
});

collectionsRouter.post("/collections/:id/books", (req, res) => {
  // TODO 2.3: buscar la collection por id (404 si no existe) y el book por
  // `req.body.bookId` (404 si no existe). Si ambos existen, agregar el
  // bookId a `collection.bookIds` (si no estaba ya) y responder 201 con la
  // collection actualizada.
  res.status(501).json({ error: "TODO: Implement POST /collections/:id/books" });
});

collectionsRouter.delete("/collections/:id/books/:bookId", (req, res) => {
  // TODO 2.3: buscar la collection por id (404 si no existe). Sacar el
  // bookId de `collection.bookIds` (filter) y responder 204 sin body.
  res.status(501).json({ error: "TODO: Implement DELETE /collections/:id/books/:bookId" });
});
