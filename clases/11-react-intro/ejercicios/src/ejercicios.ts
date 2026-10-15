import type { ComponentType } from "react";
import Detalle1 from "./1-jsx/Detalle";
import Detalle2 from "./2-componentes/Detalle";
import Detalle3 from "./3-listas/Detalle";
import Detalle4 from "./4-estado/Detalle";
import MisPropiedades from "./5-integrador/MisPropiedades";

type Ejercicio = {
  id: string;
  carpeta: string;
  titulo: string;
  componente: ComponentType;
};

export const EJERCICIOS: Ejercicio[] = [
  { id: "1", carpeta: "1-jsx", titulo: "1.1 · El detalle en JSX", componente: Detalle1 },
  { id: "2", carpeta: "2-componentes", titulo: "2.1 · Componentes y props", componente: Detalle2 },
  { id: "3", carpeta: "3-listas", titulo: "3.1 Galería y tags · 3.2 Consultas", componente: Detalle3 },
  { id: "4", carpeta: "4-estado", titulo: "4.1 Galería interactiva · 4.2 Me interesa y respuestas", componente: Detalle4 },
  { id: "5", carpeta: "5-integrador", titulo: "Integrador · Mis propiedades", componente: MisPropiedades },
];
