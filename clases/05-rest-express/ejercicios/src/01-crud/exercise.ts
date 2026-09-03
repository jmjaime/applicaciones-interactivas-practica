import { Router } from "express";
import { authors, Author } from "../data";

export const authorsRouter = Router();

// Scaffolding: siguiente id disponible — no es parte del ejercicio.
let nextId = Math.max(...authors.map((a) => a.id)) + 1;

authorsRouter.get("/authors", (req, res) => {
  // TODO 1.1 / 1.3: si viene `req.query.nationality`, devolver solo los
  // authors con esa nacionalidad. Sin el query param, devolver todos.
  res.status(501).json({ error: "TODO: Implement GET /authors" });
});

authorsRouter.get("/authors/:id", (req, res) => {
  // TODO 1.2: buscar el author por id (Number(req.params.id)). Si no
  // existe, responder 404 con { error: "Author no encontrado" }. Si
  // existe, responderlo con 200.
  res.status(501).json({ error: "TODO: Implement GET /authors/:id" });
});

authorsRouter.post("/authors", (req, res) => {
  // TODO 1.1: validar que `req.body.name` y `req.body.nationality` estén
  // presentes — si falta alguno, 400 con { error: "..." }. Si están, crear
  // un Author nuevo con `nextId++`, agregarlo a `authors` (push) y
  // responder 201 con el author creado.
  res.status(501).json({ error: "TODO: Implement POST /authors" });
});
