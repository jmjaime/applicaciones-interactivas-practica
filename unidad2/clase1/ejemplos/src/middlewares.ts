import { Request, Response, NextFunction } from "express";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const startedAt = Date.now();
  console.log(`[req] ${req.method} ${req.originalUrl}`);
  req.on("end", () => {
    console.log(`[req] done in ${Date.now() - startedAt}ms`);
  });
  next();
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status =
    typeof (err as any)?.statusCode === "number"
      ? (err as any).statusCode
      : 500;
  const message = (err as any)?.message ?? "Error desconocido";
  res.status(status).json({ error: message });
}
