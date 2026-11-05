// La forma de cada propiedad que devuelve la API: la de la Clase 13.
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
  inmobiliariaId: number;
  descripcion: string;
};
