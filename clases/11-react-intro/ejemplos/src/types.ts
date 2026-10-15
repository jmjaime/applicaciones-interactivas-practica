// La forma de cada objeto de datos/propiedades.json (el mismo de la clase pasada).
export type Propiedad = {
  id: number;
  titulo: string;
  tipo: string;
  operacion: string;
  precio: number;
  moneda: string;
  barrio: string;
  ambientes: number | null; // null en locales y terrenos
  superficieCubierta: number | null; // null en terrenos
  tags: string[];
  foto: string;
};
