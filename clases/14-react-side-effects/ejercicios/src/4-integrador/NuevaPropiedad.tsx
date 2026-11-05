import { useActionState } from "react";
import { useNavigate } from "react-router";
import CamposPropiedad from "../comun/CamposPropiedad";
import { API_URL } from "../comun/api";
import { aDatos, leerValores, VALORES_VACIOS, type ErroresPropiedad, type ValoresPropiedad } from "../comun/propiedadForm";

type EstadoForm = {
  valores: ValoresPropiedad;
  errores: ErroresPropiedad;
  errorGeneral: string | null;
};

const ESTADO_INICIAL: EstadoForm = { valores: VALORES_VACIOS, errores: {}, errorGeneral: null };

export default function NuevaPropiedad() {
  const navigate = useNavigate();

  async function publicar(_anterior: EstadoForm, formData: FormData): Promise<EstadoForm> {
    const valores = leerValores(formData);
    try {
      const res = await fetch(`${API_URL}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aDatos(valores)),
      });
      if (res.status === 400) {
        const { errores } = await res.json();
        return { valores, errores, errorGeneral: null };
      }
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const nueva = await res.json();
      navigate(`/propiedades/${nueva.id}`, { replace: true });
      return { valores, errores: {}, errorGeneral: null };
    } catch (e) {
      return { valores, errores: {}, errorGeneral: e instanceof Error ? e.message : "Error desconocido" };
    }
  }

  const [estado, action, pendiente] = useActionState(publicar, ESTADO_INICIAL);

  return (
    <form action={action} className="formulario" noValidate>
      <h2>🏠 Nueva propiedad</h2>
      {estado.errorGeneral && <p className="error">{estado.errorGeneral}</p>}
      <CamposPropiedad valores={estado.valores} errores={estado.errores} />
      <div className="botones">
        <button type="submit" className="boton primario" disabled={pendiente}>
          {pendiente ? "Publicando…" : "Publicar"}
        </button>
        <button type="button" className="boton" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
