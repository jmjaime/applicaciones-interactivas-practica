import type { Propiedad } from "../types";

type CardProps = {
  propiedad: Propiedad;
  esFavorita: boolean;
};

export default function Card({ propiedad, esFavorita }: CardProps) {
  return (
    <article className="card">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div className="card-body">
        <div className="card-precio">
          <strong>
            {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
          </strong>
          {/* Ternario: una cosa o la otra */}
          <span className={propiedad.operacion === "Venta" ? "badge venta" : "badge"}>
            {propiedad.operacion === "Venta" ? "En venta" : "En alquiler"}
          </span>
        </div>
        <h2>
          {/* &&: algo o nada */}
          {esFavorita && "❤️ "}
          {propiedad.titulo}
        </h2>
        <p>{propiedad.barrio}</p>
        {propiedad.tags.length > 0 && (
          <ul className="tags">
            {propiedad.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
