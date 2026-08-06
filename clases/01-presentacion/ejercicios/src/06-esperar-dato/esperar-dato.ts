function obtenerDatoAsync(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("dato"), 50));
}

export async function procesarDato(): Promise<string> {
  // TODO: completar (ver README.md) — pista: await
  return "";
}
