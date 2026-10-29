// La forma de cada objeto de datos/propiedades.json: la de las clases 11 y 12,
// más la inmobiliaria que la publica y una descripción para el detalle.
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

export type Resena = {
  id: number;
  autor: string;
  texto: string;
  calificacion: number; // entero de 1 a 5
};

// datos/inmobiliarias.json: el "sitio del vendedor" del TPO.
export type Inmobiliaria = {
  id: number;
  nombre: string;
  descripcion: string;
  telefono: string;
  email: string;
  resenas: Resena[];
};
