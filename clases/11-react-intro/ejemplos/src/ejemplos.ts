import type { ComponentType } from "react";
import Ejemplo11 from "./1.1-jsx/Ejemplo";
import Ejemplo21 from "./2.1-componentes/Ejemplo";
import Ejemplo22 from "./2.2-props/Ejemplo";
import Ejemplo31 from "./3.1-listas/Ejemplo";
import Ejemplo32 from "./3.2-condicional/Ejemplo";
import Ejemplo41 from "./4.1-estado/Ejemplo";
import Ejemplo42 from "./4.2-listado/Ejemplo";

type Ejemplo = {
  id: string;
  bloque: string;
  titulo: string;
  componente: ComponentType;
};

export const EJEMPLOS: Ejemplo[] = [
  { id: "1.1", bloque: "1 · React y JSX", titulo: "JSX", componente: Ejemplo11 },
  { id: "2.1", bloque: "2 · Componentes y props", titulo: "Componentes", componente: Ejemplo21 },
  { id: "2.2", bloque: "2 · Componentes y props", titulo: "Props", componente: Ejemplo22 },
  { id: "3.1", bloque: "3 · Listas y condicional", titulo: "Listas", componente: Ejemplo31 },
  { id: "3.2", bloque: "3 · Listas y condicional", titulo: "Condicional", componente: Ejemplo32 },
  { id: "4.1", bloque: "4 · Eventos y estado", titulo: "Estado", componente: Ejemplo41 },
  { id: "4.2", bloque: "4 · Eventos y estado", titulo: "Listado completo", componente: Ejemplo42 },
];
