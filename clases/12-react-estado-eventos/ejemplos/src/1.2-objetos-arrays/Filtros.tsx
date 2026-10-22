// Los tres useState de los filtros del 4.2 (clase pasada), ahora un solo objeto:
// cambian juntos y viajan juntos como una sola prop.
export type FiltrosListado = {
  texto: string;
  operacion: string;
  soloFavoritos: boolean;
};

type FiltrosProps = {
  filtros: FiltrosListado;
  resultados: string;
  onChange: (filtros: FiltrosListado) => void;
};

export default function Filtros({ filtros, resultados, onChange }: FiltrosProps) {
  return (
    <div className="filtros">
      <input
        type="search"
        placeholder="Buscar por título o barrio…"
        value={filtros.texto}
        onChange={(e) => onChange({ ...filtros, texto: e.target.value })}
      />
      <select
        value={filtros.operacion}
        onChange={(e) => onChange({ ...filtros, operacion: e.target.value })}
      >
        <option value="">Venta y alquiler</option>
        <option value="Venta">Venta</option>
        <option value="Alquiler">Alquiler</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={filtros.soloFavoritos}
          onChange={(e) => onChange({ ...filtros, soloFavoritos: e.target.checked })}
        />{" "}
        Solo favoritos
      </label>
      <span>{resultados}</span>
    </div>
  );
}
