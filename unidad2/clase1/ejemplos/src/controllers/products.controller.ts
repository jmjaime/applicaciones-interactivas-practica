import { Request, Response } from "express";
import {
  deleteProduct,
  findProduct,
  listAllProducts,
  saveProduct,
} from "../services/products.service";

export function listProducts(req: Request, res: Response) {
  const name = typeof req.query.name === "string" ? req.query.name : undefined;
  const category =
    typeof req.query.category === "string" ? req.query.category : undefined;
  const minPrice =
    typeof req.query.minPrice === "string"
      ? Number(req.query.minPrice)
      : undefined;
  const maxPrice =
    typeof req.query.maxPrice === "string"
      ? Number(req.query.maxPrice)
      : undefined;
  const products = listAllProducts({ name, category, minPrice, maxPrice });
  res.json(products);
}

export function getProductById(req: Request, res: Response) {
  const product = findProduct(req.params.id);
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
}

export function createProduct(req: Request, res: Response) {
  const { name, price, category } = (req.body ?? {}) as Partial<{
    name: string;
    price: number;
    category: string;
  }>;
  if (!name || typeof price !== "number" || !category) {
    return res.status(400).json({
      error: "name (string), price (number) y category (string) requeridos",
    });
  }
  const created = saveProduct({ name, price, category });
  res.status(201).json(created);
}

export function removeProduct(req: Request, res: Response) {
  const ok = deleteProduct(req.params.id);
  if (!ok) return res.status(404).json({ error: "Producto no encontrado" });
  res.status(204).end();
}
