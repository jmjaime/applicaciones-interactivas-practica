import { formatearPrecio } from "../../comun/formato";
import type { Propiedad } from "../../types";
// El import devuelve un objeto: nombre de la clase en el .css → nombre único generado.
import estilos from "./CardPropiedad.module.css";

export default function CardPropiedad({ propiedad }: { propiedad: Propiedad }) {
  return (
    <article className={estilos.ficha}>
      <h3 className={estilos.titulo}>{propiedad.titulo}</h3>
      <p>{formatearPrecio(propiedad.precio, propiedad.moneda)}</p>
    </article>
  );
}
