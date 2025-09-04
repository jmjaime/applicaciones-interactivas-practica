import { Router } from "express";

class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const router = Router();

router.get("/", () => {
  throw new AppError("Algo salió mal (boom)", 418);
});

router.get("/:code", (req) => {
  const code = Number(req.params.code);
  const status = Number.isFinite(code) ? code : 500;
  throw new AppError(`Error de prueba con status ${status}`, status);
});

export default router;
