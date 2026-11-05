import type { ErroresPropiedad, ValoresPropiedad } from "./propiedadForm";

type CamposPropiedadProps = {
  valores: ValoresPropiedad;
  errores: ErroresPropiedad;
};

// Los campos del formulario de propiedad, no controlados: cada uno con su name.
// React resetea el form al terminar una action, y entonces cada campo vuelve a su defaultValue.
// Un <select> no toma un defaultValue nuevo sin remontarse: por eso lleva el valor como key.
export default function CamposPropiedad({ valores, errores }: CamposPropiedadProps) {
  function error(campo: keyof ValoresPropiedad) {
    return errores[campo] && <p className="error">{errores[campo]}</p>;
  }

  return (
    <>
      <label>
        Título
        <input name="titulo" defaultValue={valores.titulo} />
      </label>
      {error("titulo")}

      <div className="fila-campos">
        <label>
          Tipo
          <select key={valores.tipo} name="tipo" defaultValue={valores.tipo}>
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Local">Local</option>
          </select>
        </label>
        <label>
          Operación
          <select key={valores.operacion} name="operacion" defaultValue={valores.operacion}>
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        </label>
      </div>

      <div className="fila-campos">
        <label>
          Precio
          <input name="precio" type="number" defaultValue={valores.precio} />
        </label>
        <label>
          Moneda
          <select key={valores.moneda} name="moneda" defaultValue={valores.moneda}>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </label>
      </div>
      {error("precio")}

      <div className="fila-campos">
        <label>
          Ambientes (opcional)
          <input name="ambientes" type="number" defaultValue={valores.ambientes} />
        </label>
        <label>
          Superficie cubierta (m²)
          <input name="superficieCubierta" type="number" defaultValue={valores.superficieCubierta} />
        </label>
        <label>
          Superficie total (m²)
          <input name="superficieTotal" type="number" defaultValue={valores.superficieTotal} />
        </label>
      </div>
      {error("ambientes")}
      {error("superficieCubierta")}
      {error("superficieTotal")}
    </>
  );
}
