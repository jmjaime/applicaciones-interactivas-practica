// Los datos de prueba, tipados. Hacen de "backend": más adelante estas
// búsquedas pasan a ser requests a la API.
import type { Inmobiliaria, Propiedad } from "../types";
import inmobiliariasJson from "./inmobiliarias.json";
import propiedadesJson from "./propiedades.json";

export const propiedades: Propiedad[] = propiedadesJson;
export const inmobiliarias: Inmobiliaria[] = inmobiliariasJson;

export function buscarPropiedad(id: number): Propiedad | undefined {
  return propiedades.find((p) => p.id === id);
}

export function buscarInmobiliaria(id: number): Inmobiliaria | undefined {
  return inmobiliarias.find((i) => i.id === id);
}
