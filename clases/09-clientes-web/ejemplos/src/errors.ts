// Error con status HTTP propio — lo que el middleware de manejo de errores
// centralizado (ver middlewares/errorHandler.ts) sabe traducir a res.status().
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
