import type { ComponentType } from "react";
import Ejemplo11 from "./1.1-snapshot/Ejemplo";
import Ejemplo12 from "./1.2-objetos-arrays/Ejemplo";
import Ejemplo21 from "./2.1-compartir/Ejemplo";
import Ejemplo31 from "./3.1-controlado/Ejemplo";
import Ejemplo32 from "./3.2-formdata/Ejemplo";
import Ejemplo41 from "./4.1-refs/Ejemplo";

type Ejemplo = {
  id: string;
  bloque: string;
  titulo: string;
  componente: ComponentType;
};

export const EJEMPLOS: Ejemplo[] = [
  { id: "1.1", bloque: "1 · Estado en profundidad", titulo: "Snapshot", componente: Ejemplo11 },
  { id: "1.2", bloque: "1 · Estado en profundidad", titulo: "Filtros y comparador", componente: Ejemplo12 },
  { id: "2.1", bloque: "2 · Compartir estado", titulo: "Listado y panel", componente: Ejemplo21 },
  { id: "3.1", bloque: "3 · Formularios", titulo: "Pedir visita (controlado)", componente: Ejemplo31 },
  { id: "3.2", bloque: "3 · Formularios", titulo: "Hacer consulta (FormData)", componente: Ejemplo32 },
  { id: "4.1", bloque: "4 · Refs", titulo: "Foco en el error", componente: Ejemplo41 },
];
