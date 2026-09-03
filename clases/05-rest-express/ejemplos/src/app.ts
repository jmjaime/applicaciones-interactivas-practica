import express from "express";
import swaggerUi from "swagger-ui-express";
import { loggingMiddleware } from "./middlewares/logging";
import { errorHandler } from "./middlewares/errorHandler";
import { crudRouter } from "./01-crud/example";
import { relacionesRouter } from "./02-relaciones/example";
import { middlewaresRouter } from "./03-middlewares/example";
import { buildOpenApiDocument } from "./04-openapi/document";

export const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.use(crudRouter);
app.use(relacionesRouter);
app.use(middlewaresRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(buildOpenApiDocument()));

// Middleware de 4 parámetros: siempre al final, después de todas las rutas.
app.use(errorHandler);
