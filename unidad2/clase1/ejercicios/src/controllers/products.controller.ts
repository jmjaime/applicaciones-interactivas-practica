import { Request, Response } from "express";

export function listProducts(_req: Request, res: Response) {
  // TODO: implementar el listado con filtros opcionales ?name, ?category, ?minPrice, ?maxPrice
  res.status(501).json({ error: "TODO: implementar listProducts" });
}

export function getProductById(_req: Request, res: Response) {
  // TODO: implementar obtención por id y responder 404 cuando no exista
  res.status(501).json({ error: "TODO: implementar getProductById" });
}

export function createProduct(_req: Request, res: Response) {
  // TODO: validar name (string), price (number) y category (string) y crear producto
  res.status(501).json({ error: "TODO: implementar createProduct" });
}

export function removeProduct(_req: Request, res: Response) {
  // TODO: eliminar por id; responder 204 si elimina y 404 si no existe
  res.status(501).json({ error: "TODO: implementar removeProduct" });
}
