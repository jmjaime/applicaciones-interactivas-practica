import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { eventosRouter } from "./1.1-eventos/example";
import { sesionRouter } from "./3.1-sesion-cookie/example";
import { jwtRouter } from "./3.2-jwt/example";

export const app = express();

app.use(express.json());

app.use(eventosRouter);
app.use(sesionRouter);
app.use(jwtRouter);

app.use(errorHandler);
