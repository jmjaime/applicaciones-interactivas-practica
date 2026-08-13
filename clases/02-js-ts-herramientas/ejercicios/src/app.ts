import express from "express";
import { expressBasicoRouter } from "./01-express-basico/exercise";
import { validacionManualRouter } from "./03-validaciones/manual";
import { validacionZodRouter } from "./03-validaciones/zod";
import { filtrarModificarRouter } from "./04-filtrar-modificar/exercise";
import { apiExternaRouter } from "./05-api-externa/exercise";
import { integradorRouter } from "./06-integrador/exercise";

export const app = express();

app.use(express.json());

app.use(expressBasicoRouter);
app.use(validacionManualRouter);
app.use(validacionZodRouter);
app.use(filtrarModificarRouter);
app.use(apiExternaRouter);
app.use(integradorRouter);
