import type { Propiedad } from "../types";

// Lo que arma el padre en cada render: los datos de la propiedad + el puntaje.
export type PropiedadComparada = Propiedad & { puntaje: number };

type ComparadorProps = {
  propiedades: PropiedadComparada[];
  onQuitar: (id: number) => void;
  onPuntuar: (id: number, puntaje: number) => void;
  onOrdenarPorPrecio: () => void;
};

export default function Comparador({ propiedades, onQuitar, onPuntuar, onOrdenarPorPrecio }: ComparadorProps) {
  if (propiedades.length === 0) {
    return <p className="comparador vacio">⚖️ Comparador vacío: agregar hasta 3 propiedades.</p>;
  }

  return (
    <section className="comparador">
      <div className="comparador-titulo">
        <h2>⚖️ Comparador ({propiedades.length}/3)</h2>
        <button type="button" className="boton" onClick={onOrdenarPorPrecio}>
          Ordenar por precio
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Propiedad</th>
            <th>Precio</th>
            <th>Ambientes</th>
            <th>Puntaje</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((p) => (
            <tr key={p.id}>
              <td>{p.titulo}</td>
              <td>
                {p.moneda} {p.precio.toLocaleString("es-AR")}
              </td>
              <td>{p.ambientes ?? "—"}</td>
              <td>
                <select value={p.puntaje} onChange={(e) => onPuntuar(p.id, Number(e.target.value))}>
                  <option value={0}>Sin puntuar</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {"⭐".repeat(n)}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button type="button" className="boton" onClick={() => onQuitar(p.id)}>
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
