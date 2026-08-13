interface GeocodingResponse {
  results?: { latitude: number; longitude: number; name: string }[];
}

export interface ClimaActual {
  ciudad: string;
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

// Scaffolding ya armado (mismas dos llamadas que
// ejemplos/src/05-api-externa/openMeteoClient.ts) — no es parte del
// ejercicio. El ejercicio es exercise.ts. Devuelve null si la ciudad no
// existe, mismo criterio "no encontrado" que el resto de la clase.
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
  const forecast = await forecastResponse.json();
  return { ciudad: ubicacion.name, current_weather: forecast.current_weather };
}
