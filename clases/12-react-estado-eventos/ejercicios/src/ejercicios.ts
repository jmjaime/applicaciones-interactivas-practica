import type { ComponentType } from "react";
import SolicitudesVisita from "./1-estado/SolicitudesVisita";
import BandejaConsultas from "./2-compartir/BandejaConsultas";
import Publicar3 from "./3-formularios/Publicar";
import Publicar4 from "./4-refs/Publicar";
import MisPropiedades from "./5-integrador/MisPropiedades";

type Ejercicio = {
  id: string;
  carpeta: string;
  titulo: string;
  componente: ComponentType;
};

export const EJERCICIOS: Ejercicio[] = [
  { id: "1", carpeta: "1-estado", titulo: "1 · Solicitudes de visita", componente: SolicitudesVisita },
  { id: "2", carpeta: "2-compartir", titulo: "2 · Bandeja de consultas", componente: BandejaConsultas },
  { id: "3", carpeta: "3-formularios", titulo: "3 · Publicar propiedad", componente: Publicar3 },
  { id: "4", carpeta: "4-refs", titulo: "4 · Foco en el error", componente: Publicar4 },
  { id: "5", carpeta: "5-integrador", titulo: "Integrador · Mis propiedades (alta y edición)", componente: MisPropiedades },
];
