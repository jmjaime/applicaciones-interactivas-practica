import express from "express";
import { coursesRouter } from "./routes/courses.routes";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/status", (_req, res) => res.status(200).json({ ok: true }));
  app.use("/api/courses", coursesRouter);

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      res.status(500).json({
        error: { code: "INTERNAL_ERROR", message: "unexpected error" },
      });
    }
  );

  return app;
}
