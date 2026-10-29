import { useNavigate } from "react-router";
import FormularioPropiedad from "../comun/FormularioPropiedad";
import { crearPropiedad } from "../datos/repositorio";
import type { DatosPropiedad } from "../types";

export default function NuevaPropiedad() {
  const navigate = useNavigate();

  function guardar(datos: DatosPropiedad) {
    const nueva = crearPropiedad(datos);
    navigate(`/propiedades/${nueva.id}`, { replace: true });
  }

  return (
    <FormularioPropiedad
      titulo="🏠 Nueva propiedad"
      textoBoton="Publicar"
      onGuardar={guardar}
      onCancelar={() => navigate(-1)}
    />
  );
}
