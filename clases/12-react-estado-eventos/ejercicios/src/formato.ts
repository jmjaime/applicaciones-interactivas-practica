// "2026-10-31T15:00" → "sáb 31/10 15:00"
export function formatearFecha(iso: string): string {
  const fecha = new Date(iso);
  const dia = fecha.toLocaleDateString("es-AR", { weekday: "short" });
  const hora = String(fecha.getHours()).padStart(2, "0") + ":" + String(fecha.getMinutes()).padStart(2, "0");
  return `${dia} ${fecha.getDate()}/${fecha.getMonth() + 1} ${hora}`;
}

// 650000, "ARS" → "ARS 650.000"
export function formatearPrecio(precio: number, moneda: string): string {
  return `${moneda} ${precio.toLocaleString("es-AR")}`;
}
