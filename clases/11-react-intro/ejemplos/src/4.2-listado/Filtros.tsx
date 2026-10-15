// Inputs controlados: muestran lo que dice el estado de App y avisan cada cambio.
type FiltrosProps = {
  texto: string;
  operacion: string;
  soloFavoritos: boolean;
  resultados: string;
  onTextoChange: (texto: string) => void;
  onOperacionChange: (operacion: string) => void;
  onSoloFavoritosChange: (soloFavoritos: boolean) => void;
};

export default function Filtros(props: FiltrosProps) {
  return (
    <div className="filtros">
      <input
        type="search"
        placeholder="Buscar por título o barrio…"
        value={props.texto}
        onChange={(e) => props.onTextoChange(e.target.value)}
      />
      <select value={props.operacion} onChange={(e) => props.onOperacionChange(e.target.value)}>
        <option value="">Venta y alquiler</option>
        <option value="Venta">Venta</option>
        <option value="Alquiler">Alquiler</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={props.soloFavoritos}
          onChange={(e) => props.onSoloFavoritosChange(e.target.checked)}
        />{" "}
        Solo favoritos
      </label>
      <span>{props.resultados}</span>
    </div>
  );
}
