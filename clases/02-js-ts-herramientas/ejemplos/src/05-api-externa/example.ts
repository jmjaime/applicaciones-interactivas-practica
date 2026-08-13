import { Router } from "express";
import { obtenerClima } from "./openMeteoClient";

export const apiExternaRouter = Router();

apiExternaRouter.get("/clima/:ciudad", async (req, res) => {
  const clima = await obtenerClima(req.params.ciudad);
  if (!clima) {
    return res.status(404).json({ error: "Ciudad no encontrada" });
  }
  res.json(clima);
});
