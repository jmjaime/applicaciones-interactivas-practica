import type { Inmobiliaria } from "../../types";
import estilos from "./CardInmobiliaria.module.css";

export default function CardInmobiliaria({ inmobiliaria }: { inmobiliaria: Inmobiliaria }) {
  return (
    <article className={estilos.ficha}>
      <h3 className={estilos.titulo}>{inmobiliaria.nombre}</h3>
      <p>{inmobiliaria.descripcion}</p>
    </article>
  );
}
