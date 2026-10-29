import { formatearPrecio } from "../../comun/formato";
import type { Propiedad } from "../../types";
import "./card-propiedad.css";

export default function CardPropiedad({ propiedad }: { propiedad: Propiedad }) {
  return (
    <article className="ficha">
      <h3 className="titulo">{propiedad.titulo}</h3>
      <p>{formatearPrecio(propiedad.precio, propiedad.moneda)}</p>
    </article>
  );
}
