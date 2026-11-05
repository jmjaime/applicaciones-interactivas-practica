// Lo que necesita un formulario de propiedad con Form Actions, ya resuelto.
import type { DatosPropiedad, Moneda, Operacion, TipoPropiedad } from "../types";

// Los valores tal cual los devuelven los inputs: todo string.
export type ValoresPropiedad = {
  titulo: string;
  tipo: string;
  operacion: string;
  precio: string;
  moneda: string;
  ambientes: string;
  superficieCubierta: string;
  superficieTotal: string;
};

// Los errores que devuelve la API en un 400: { errores: { titulo: "…", … } }
export type ErroresPropiedad = Partial<Record<keyof ValoresPropiedad, string>>;

export const VALORES_VACIOS: ValoresPropiedad = {
  titulo: "",
  tipo: "Departamento",
  operacion: "Venta",
  precio: "",
  moneda: "USD",
  ambientes: "",
  superficieCubierta: "",
  superficieTotal: "",
};

export function leerValores(formData: FormData): ValoresPropiedad {
  const campo = (nombre: keyof ValoresPropiedad) => String(formData.get(nombre) ?? "");
  return {
    titulo: campo("titulo"),
    tipo: campo("tipo"),
    operacion: campo("operacion"),
    precio: campo("precio"),
    moneda: campo("moneda"),
    ambientes: campo("ambientes"),
    superficieCubierta: campo("superficieCubierta"),
    superficieTotal: campo("superficieTotal"),
  };
}

// Lo que se manda en el body del request.
export function aDatos(valores: ValoresPropiedad): DatosPropiedad {
  const numeroONull = (valor: string) => (valor === "" ? null : Number(valor));
  return {
    titulo: valores.titulo.trim(),
    tipo: valores.tipo as TipoPropiedad,
    operacion: valores.operacion as Operacion,
    precio: Number(valores.precio),
    moneda: valores.moneda as Moneda,
    ambientes: numeroONull(valores.ambientes),
    superficieCubierta: numeroONull(valores.superficieCubierta),
    superficieTotal: Number(valores.superficieTotal),
  };
}

// Para precargar el formulario de edición.
export function aValores(datos: DatosPropiedad): ValoresPropiedad {
  return {
    titulo: datos.titulo,
    tipo: datos.tipo,
    operacion: datos.operacion,
    precio: String(datos.precio),
    moneda: datos.moneda,
    ambientes: datos.ambientes === null ? "" : String(datos.ambientes),
    superficieCubierta: datos.superficieCubierta === null ? "" : String(datos.superficieCubierta),
    superficieTotal: String(datos.superficieTotal),
  };
}
