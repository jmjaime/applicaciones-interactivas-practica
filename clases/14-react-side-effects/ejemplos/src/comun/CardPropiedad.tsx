import type { Propiedad } from "../types";
import { formatearPrecio } from "./formato";

// La card de las clases 11 y 12, sin estado: la usan casi todos los ejemplos.
// Hacerla clickeable (envolverla en un <Link>) lo decide cada página.
export default function CardPropiedad({ propiedad }: { propiedad: Propiedad }) {
  return (
    <article className="card">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div className="card-body">
        <div className="card-precio">
          <strong>{formatearPrecio(propiedad.precio, propiedad.moneda)}</strong>
          <span className={propiedad.operacion === "Venta" ? "badge venta" : "badge"}>{propiedad.operacion}</span>
        </div>
        <h2>{propiedad.titulo}</h2>
        <p>
          {propiedad.tipo} · {propiedad.barrio}
          {propiedad.ambientes !== null && ` · ${propiedad.ambientes} amb.`}
        </p>
      </div>
    </article>
  );
}
