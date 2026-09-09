import express from "express";
import { propiedadesRouter } from "./routes/propiedades.routes";
import { loggingMiddleware } from "./middlewares/logging";
import { errorHandler } from "./middlewares/errorHandler";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(loggingMiddleware);

  app.get("/api/status", (_req, res) => res.status(200).json({ ok: true }));
  app.use("/api/propiedades", propiedadesRouter);

  app.use(errorHandler);

  return app;
}
