import express from "express";
import { expressBasicoRouter } from "./01-express-basico/example";
import { validacionManualRouter } from "./03-validaciones/manual";
import { validacionZodRouter } from "./03-validaciones/zod";
import { filtrarModificarRouter } from "./04-filtrar-modificar/example";
import { apiExternaRouter } from "./05-api-externa/example";

export const app = express();

app.use(express.json());

app.use(expressBasicoRouter);
app.use(validacionManualRouter);
app.use(validacionZodRouter);
app.use(filtrarModificarRouter);
app.use(apiExternaRouter);
