// Errores de dominio que el error handler centralizado (middlewares/errorHandler.ts)
// traduce a status HTTP. El service los lanza; el controller no hace
// try/catch — Express 5 reenvía solo el rechazo de una promesa async al
// middleware de errores (a diferencia de Express 4, que necesitaba
// wrappers para esto).
export class NotFoundError extends Error {}
export class ConflictError extends Error {}
