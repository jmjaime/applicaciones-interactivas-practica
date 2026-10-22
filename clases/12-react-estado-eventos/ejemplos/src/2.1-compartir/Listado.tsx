import type { Propiedad } from "../types";

type ListadoProps = {
  propiedades: Propiedad[];
  seleccionadaId: number | null;
  favoritos: number[];
  onSeleccionar: (id: number) => void;
  onToggleFavorito: (id: number) => void;
};

// No guarda nada: qué está seleccionado y qué es favorito lo decide el padre.
export default function Listado({ propiedades, seleccionadaId, favoritos, onSeleccionar, onToggleFavorito }: ListadoProps) {
  return (
    <ul className="lista-items">
      {propiedades.map((p) => (
        <li
          key={p.id}
          className={p.id === seleccionadaId ? "item seleccionado" : "item"}
          onClick={() => onSeleccionar(p.id)}
        >
          <img src={p.foto} alt="" />
          <div>
            <strong>{p.titulo}</strong>
            <small>
              {p.barrio} · {p.moneda} {p.precio.toLocaleString("es-AR")}
            </small>
          </div>
          <button
            type="button"
            className={favoritos.includes(p.id) ? "fav activo" : "fav"}
            aria-label="Favorito"
            onClick={(e) => {
              e.stopPropagation(); // que el click en ❤️ no seleccione también la fila
              onToggleFavorito(p.id);
            }}
          >
            ❤️
          </button>
        </li>
      ))}
    </ul>
  );
}
