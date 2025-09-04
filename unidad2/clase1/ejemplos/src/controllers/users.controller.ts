import { Request, Response } from "express";
import { findUser, listAllUsers, saveUser } from "../services/users.service";

export function listUsers(req: Request, res: Response) {
  const q = typeof req.query.name === "string" ? req.query.name : undefined;
  res.json(listAllUsers(q));
}

export function getUserById(req: Request, res: Response) {
  const user = findUser(req.params.id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
}

export function createUser(req: Request, res: Response) {
  const created = saveUser(req.body as { name: string; email: string });
  res.status(201).json(created);
}
