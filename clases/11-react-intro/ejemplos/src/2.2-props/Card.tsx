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
          <button className={esFavorita ? "fav activo" : "fav"} type="button" aria-label="Favorito">
            ❤️
          </button>
        </div>
        <h2>{propiedad.titulo}</h2>
        <p>
          {propiedad.barrio} · {propiedad.operacion}
        </p>
      </div>
    </article>
  );
}
