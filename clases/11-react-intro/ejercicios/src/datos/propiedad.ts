import type { PropiedadDetalle } from "../types";

// Los datos del detalle, como los devolvería GET /properties/:id de la API.
// Se pueden editar libremente para probar casos (sin tags, sin consultas, etc.).
export const propiedad: PropiedadDetalle = {
  id: 1,
  titulo: "Departamento luminoso con balcón",
  descripcion:
    "Tres ambientes al frente, con balcón corrido y cocina integrada. A dos cuadras del subte D y de Plaza Güemes. Edificio con portería y laundry.",
  tipo: "Departamento",
  operacion: "Alquiler",
  precio: 650000,
  moneda: "ARS",
  barrio: "Palermo",
  ambientes: 3,
  superficieCubierta: 68,
  superficieTotal: 75,
  tags: ["balcón", "admite mascotas", "apto profesional"],
  fotos: [
    "https://picsum.photos/seed/detalle1/800/500",
    "https://picsum.photos/seed/detalle2/800/500",
    "https://picsum.photos/seed/detalle3/800/500",
    "https://picsum.photos/seed/detalle4/800/500",
  ],
  interesados: 12,
  inmobiliaria: {
    nombre: "Inmobiliaria del Sol",
    telefono: "011-5555-5555",
    email: "info@inmobiliariadelsol.com",
    calificacion: 4.5,
    cantidadResenas: 12,
  },
  consultas: [
    {
      id: 1,
      autor: "ana",
      fecha: "2026-10-02",
      texto: "¿Admite mascotas grandes?",
      respuesta: "Sí, sin restricción de tamaño.",
    },
    {
      id: 2,
      autor: "luis",
      fecha: "2026-10-05",
      texto: "¿Las expensas están incluidas en el precio?",
      respuesta: null,
    },
    {
      id: 3,
      autor: "marta",
      fecha: "2026-10-09",
      texto: "¿Se puede visitar un sábado a la mañana?",
      respuesta: "Sí, se coordina desde el botón de pedir visita.",
    },
  ],
};
