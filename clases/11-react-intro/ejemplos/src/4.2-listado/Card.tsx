import type { Propiedad } from "../types";

type CardProps = {
  propiedad: Propiedad;
  esFavorita: boolean;
  onToggleFavorito: () => void;
};

// No sabe cómo se guardan los favoritos: recibe el dato y una función para avisar.
export default function Card({ propiedad, esFavorita, onToggleFavorito }: CardProps) {
  return (
    <article className="card">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div className="card-body">
        <div className="card-precio">
          <strong>
            {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
          </strong>
          <button
            className={esFavorita ? "fav activo" : "fav"}
            type="button"
            aria-label="Favorito"
            onClick={onToggleFavorito}
          >
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
