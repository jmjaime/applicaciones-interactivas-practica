import express from "express";
import cors from "cors";
import { router as productsRouter } from "./routes/products.routes";
import { router as categoriesRouter } from "./routes/categories.routes";
import { router as paymentsRouter } from "./routes/payments.routes";
import { router as statusRouter } from "./routes/status.routes";
import { router as tagsRouter } from "./routes/tags.routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Swagger UI
  const openapiPath = path.join(__dirname, "../openapi-min.yaml");
  const openapiDocument = YAML.load(openapiPath);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

  app.use("/api/products", productsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/tags", tagsRouter);
  app.use("/api/payments", paymentsRouter);
  app.use("/api/status", statusRouter);

  return app;
}
