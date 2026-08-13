# 5. API externa

`openMeteoClient.ts` (dos llamadas encadenadas a Open-Meteo: geocoding +
forecast, sin API key) + `example.ts` (`GET /clima/:ciudad`). Corresponde
al Bloque 5 de `../../../slides/clase2-slides.html`.

```bash
npm run dev
# GET http://localhost:3000/clima/cordoba
# GET http://localhost:3000/clima/asdasdasd   → 404, ciudad no encontrada
```

## Sin internet

Si no hay salida a Open-Meteo (por ejemplo, sin conexión), reemplazar
temporalmente el cuerpo de `obtenerClima` en `openMeteoClient.ts` por un
valor fijo:

```ts
export async function obtenerClima(_ciudad: string): Promise<ClimaActual> {
  return { current_weather: { temperature: 18, windspeed: 12, weathercode: 1 } };
}
```
