import type { NuevaPropiedad } from "../types";

type PublicarPropiedadProps = {
  onPublicar: (propiedad: NuevaPropiedad) => void;
};

// El markup ya está: falta que sea un formulario controlado, con sus validaciones.
export default function PublicarPropiedad({ onPublicar }: PublicarPropiedadProps) {
  // TODO: el estado del formulario
  // TODO: los errores de validación (calculados)
  // TODO: el submit (sin recargar la página) que llama a onPublicar y vacía el formulario
  void onPublicar; // borrar esta línea al usar onPublicar

  return (
    <form className="formulario">
      <h2>🏠 Publicar propiedad</h2>

      <label>
        Título
        <input name="titulo" />
      </label>

      <div className="fila-campos">
        <label>
          Tipo
          <select name="tipo">
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Local">Local</option>
          </select>
        </label>

        <fieldset>
          <legend>Operación</legend>
          <label>
            <input type="radio" name="operacion" value="Venta" /> Venta
          </label>
          <label>
            <input type="radio" name="operacion" value="Alquiler" /> Alquiler
          </label>
        </fieldset>
      </div>

      <div className="fila-campos">
        <label>
          Precio
          <input name="precio" type="number" />
        </label>
        <label>
          Moneda
          <select name="moneda">
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </label>
      </div>

      <div className="fila-campos">
        <label>
          Ambientes (opcional)
          <input name="ambientes" type="number" />
        </label>
        <label>
          Superficie cubierta (m²)
          <input name="superficieCubierta" type="number" />
        </label>
        <label>
          Superficie total (m²)
          <input name="superficieTotal" type="number" />
        </label>
      </div>

      <button type="submit" className="boton primario">
        Publicar
      </button>
    </form>
  );
}
