interface GeocodingResponse {
  results?: { latitude: number; longitude: number }[];
}

export interface ClimaActual {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

// Dos llamadas encadenadas: primero geocoding (ciudad → coordenadas),
// después el forecast con esas coordenadas. Open-Meteo no requiere API key.
// Devuelve null si la ciudad no existe — mismo criterio "no encontrado"
// que las rutas del Bloque 4, sin lanzar excepciones propias.
export async function obtenerClima(ciudad: string): Promise<ClimaActual | null> {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1`,
  );
  const geo: GeocodingResponse = await geoResponse.json();
  const ubicacion = geo.results?.[0];
  if (!ubicacion) {
    return null;
  }

  const forecastResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${ubicacion.latitude}&longitude=${ubicacion.longitude}&current_weather=true`,
  );
  return forecastResponse.json();
}
