import type { Inmobiliaria } from "../../types";
import "./card-inmobiliaria.css";

export default function CardInmobiliaria({ inmobiliaria }: { inmobiliaria: Inmobiliaria }) {
  return (
    <article className="ficha">
      <h3 className="titulo">{inmobiliaria.nombre}</h3>
      <p>{inmobiliaria.descripcion}</p>
    </article>
  );
}
