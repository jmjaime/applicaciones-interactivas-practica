// Este archivo NO se monta en la app — es standalone, a propósito, para
// practicar arreglar errores de ESLint sin tocar el servidor.
// Correr `npm run lint` y arreglar los 3 errores que tira, sin cambiar el
// comportamiento de las funciones (devuelven lo mismo antes y después).
import { Router } from "express"; // no se usa en este archivo

export function calcularDescuento(precio: number, porcentaje: number) {
  const impuesto = 0.21; // no se usa en el cálculo — variable sin uso
  return precio - precio * (porcentaje / 100);
}

export function formatearRespuesta(datos: any) {
  // "any" tapa cualquier error de tipos en el resto de la función
  return { ok: true, datos };
}
