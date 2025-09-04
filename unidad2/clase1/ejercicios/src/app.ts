import express from "express";
import productsRouter from "./routes/products.routes";

export function createApp() {
  const app = express();
  app.use(express.json());
  // TODO: Add router
  return app;
}
