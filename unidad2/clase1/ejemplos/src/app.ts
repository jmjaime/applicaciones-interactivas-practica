import express from "express";
import usersRouter from "./routes/users.routes";
import { errorHandler, requestLogger } from "./middlewares";
import boomRouter from "./routes/boom.routes";
import homeRouter from "./routes/home.routes";
import pingRouter from "./routes/ping.routes";
import productsRouter from "./routes/products.routes";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(requestLogger);
  app.use("/", homeRouter);
  app.use("/ping", pingRouter);
  app.use("/products", productsRouter);
  app.use("/users", usersRouter);
  app.use("/boom", boomRouter);
  app.use(errorHandler);
  return app;
}
