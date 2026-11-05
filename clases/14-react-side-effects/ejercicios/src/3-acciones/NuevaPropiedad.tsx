import { useNavigate } from "react-router";
import CamposPropiedad from "../comun/CamposPropiedad";
import { VALORES_VACIOS } from "../comun/propiedadForm";

export default function NuevaPropiedad() {
  const navigate = useNavigate();

  // TODO (3): publicar con POST /properties usando una form action y useActionState.

  return (
    <form className="formulario">
      <h2>🏠 Nueva propiedad</h2>
      {/* TODO (3): valores y errores salen del estado de la action; un error general (sin conexión) va acá. */}
      <CamposPropiedad valores={VALORES_VACIOS} errores={{}} />
      <div className="botones">
        <button type="submit" className="boton primario">
          Publicar
        </button>
        <button type="button" className="boton" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
