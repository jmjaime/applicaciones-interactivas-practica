// Por ahora solo estructura: los filtros todavía no hacen nada (eso es estado, en el 4.2).
export default function Filtros() {
  return (
    <div className="filtros">
      <input type="search" placeholder="Buscar por título o barrio…" />
      <select>
        <option value="">Venta y alquiler</option>
        <option value="Venta">Venta</option>
        <option value="Alquiler">Alquiler</option>
      </select>
      <label>
        <input type="checkbox" /> Solo favoritos
      </label>
    </div>
  );
}
