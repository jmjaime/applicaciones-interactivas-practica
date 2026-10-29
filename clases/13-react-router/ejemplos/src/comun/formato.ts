// 650000, "ARS" → "ARS 650.000"
export function formatearPrecio(precio: number, moneda: string): string {
  return `${moneda} ${precio.toLocaleString("es-AR")}`;
}
