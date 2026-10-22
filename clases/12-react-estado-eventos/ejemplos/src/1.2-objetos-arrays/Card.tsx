import type { Propiedad } from "../types";

type CardProps = {
  propiedad: Propiedad;
  esFavorita: boolean;
  enComparador: boolean;
  comparadorLleno: boolean;
  onToggleFavorito: () => void;
  onComparar: () => void;
};

export default function Card(props: CardProps) {
  const { propiedad } = props;
  return (
    <article className="card">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div className="card-body">
        <div className="card-precio">
          <strong>
            {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
          </strong>
          <button
            className={props.esFavorita ? "fav activo" : "fav"}
            type="button"
            aria-label="Favorito"
            onClick={props.onToggleFavorito}
          >
            ❤️
          </button>
        </div>
        <h2>{propiedad.titulo}</h2>
        <p>
          {propiedad.barrio} · {propiedad.operacion}
        </p>
        <button
          type="button"
          className="boton"
          disabled={props.enComparador || props.comparadorLleno}
          onClick={props.onComparar}
        >
          {props.enComparador ? "✔ En el comparador" : "⚖️ Comparar"}
        </button>
      </div>
    </article>
  );
}
