// Scaffolding ya armado — no es parte del ejercicio.
// Error con status HTTP propio — lo que errorHandler.ts sabe traducir a
// res.status().
export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
