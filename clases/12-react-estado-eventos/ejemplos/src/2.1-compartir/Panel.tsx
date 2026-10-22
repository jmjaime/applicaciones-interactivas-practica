import { useState } from "react";
import type { Propiedad } from "../types";

type PanelProps = {
  propiedad: Propiedad;
  esFavorita: boolean;
  onToggleFavorito: () => void;
};

export default function Panel({ propiedad, esFavorita, onToggleFavorito }: PanelProps) {
  // Estado local: la nota es solo del panel, nadie más la lee.
  const [nota, setNota] = useState("");

  return (
    <aside className="panel">
      <img src={propiedad.foto} alt={propiedad.titulo} />
      <div className="card-precio">
        <h2>{propiedad.titulo}</h2>
        <button
          type="button"
          className={esFavorita ? "fav activo" : "fav"}
          aria-label="Favorito"
          onClick={onToggleFavorito}
        >
          ❤️
        </button>
      </div>
      <p>
        {propiedad.tipo} en {propiedad.operacion.toLowerCase()} · {propiedad.barrio}
      </p>
      <p>
        <strong>
          {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
        </strong>
        {propiedad.ambientes !== null && ` · ${propiedad.ambientes} amb.`}
        {propiedad.superficieCubierta !== null && ` · ${propiedad.superficieCubierta} m²`}
      </p>
      <label>
        📝 Nota personal
        <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={3} />
      </label>
    </aside>
  );
}
