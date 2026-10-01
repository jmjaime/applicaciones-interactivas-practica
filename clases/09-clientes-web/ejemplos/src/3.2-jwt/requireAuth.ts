import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./auth.service";

// Suma `sellerId` al tipo de Request, para que los controllers lo lean tipado.
declare global {
  namespace Express {
    interface Request {
      sellerId?: string;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization; // "Bearer <token>"
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ error: "Falta el token" });
    return;
  }

  try {
    // Verifica la firma Y el vencimiento (exp). No consulta ninguna base.
    const payload = jwt.verify(token, jwtSecret());
    req.sellerId = payload.sub as string;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o vencido", detail: (err as Error).message });
  }
}
