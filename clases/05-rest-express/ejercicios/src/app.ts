import express from "express";
import swaggerUi from "swagger-ui-express";
import { authorsRouter } from "./01-crud/exercise";
import { collectionsRouter } from "./02-relaciones/exercise";
import { collectionSchemaRouter } from "./04-openapi/exercise";
import { buildOpenApiDocument } from "./04-openapi/document";
import { integradorRouter } from "./05-integrador/exercise";
import { loggingMiddleware } from "./05-integrador/middlewares/logging";
import { errorHandler } from "./05-integrador/middlewares/errorHandler";
import "./05-integrador/document"; // registra PATCH /authors/{id} en el registry de 04

export const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.use(authorsRouter);
app.use(collectionsRouter);
app.use(collectionSchemaRouter);
app.use(integradorRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(buildOpenApiDocument()));

// Middleware de 4 parámetros: siempre al final, después de todas las rutas.
app.use(errorHandler);
