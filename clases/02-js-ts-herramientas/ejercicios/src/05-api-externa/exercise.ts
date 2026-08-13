import { Router } from "express";
import { obtenerClima } from "./openMeteoClient";

export const apiExternaRouter = Router();

apiExternaRouter.get("/clima/:ciudad/resumen", async (req, res) => {
  const clima = await obtenerClima(req.params.ciudad);
  if (!clima) {
    return res.status(404).json({ error: "Ciudad no encontrada" });
  }

  // TODO: a partir de `clima`, armar { ciudad, resumen } donde `resumen`
  // es un string con template literals tipo "18°C en Córdoba, viento 12 km/h"
  // (temperatura y viento sin decimales — Math.round). Usá destructuring
  // para sacar `temperature` y `windspeed` de `clima.current_weather`
  // en vez de escribir clima.current_weather.temperature dos veces.
  res.status(501).json({ error: "TODO: Implement GET /clima/:ciudad/resumen", clima });
});
