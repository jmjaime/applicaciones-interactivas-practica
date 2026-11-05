import { useActionState } from "react";
import { API_URL } from "../comun/api";

const PROPIEDAD_ID = 3;

type Valores = { nombre: string; telefono: string; fecha: string };

type EstadoForm = {
  valores: Valores;
  errores: Partial<Record<keyof Valores, string>>;
  errorGeneral: string | null;
  enviada: boolean;
};

const VALORES_VACIOS: Valores = { nombre: "", telefono: "", fecha: "" };
const ESTADO_INICIAL: EstadoForm = { valores: VALORES_VACIOS, errores: {}, errorGeneral: null, enviada: false };

// Una action recibe el estado anterior y el FormData. Lo que devuelve es el nuevo estado.
async function pedirVisita(_anterior: EstadoForm, formData: FormData): Promise<EstadoForm> {
  const valores: Valores = {
    nombre: String(formData.get("nombre")),
    telefono: String(formData.get("telefono")),
    fecha: String(formData.get("fecha")),
  };

  try {
    const res = await fetch(`${API_URL}/properties/${PROPIEDAD_ID}/visit-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valores),
    });
    if (res.status === 400) {
      const { errores } = await res.json();
      return { valores, errores, errorGeneral: null, enviada: false };
    }
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return { ...ESTADO_INICIAL, enviada: true };
  } catch (e) {
    const errorGeneral = e instanceof Error ? e.message : "Error desconocido";
    return { valores, errores: {}, errorGeneral, enviada: false };
  }
}

export default function PedirVisita() {
  const [estado, action, pendiente] = useActionState(pedirVisita, ESTADO_INICIAL);

  return (
    <main className="contenido">
      {/* action, no onSubmit: React hace el preventDefault y arma el FormData. */}
      {/* noValidate: en esta demo se quiere ver la validación del backend. */}
      <form action={action} className="formulario angosto" noValidate>
        <h2>📅 Pedir visita</h2>
        {estado.enviada && <p className="aviso">Solicitud enviada ✅</p>}
        {estado.errorGeneral && <p className="error">{estado.errorGeneral}</p>}

        <label>
          Nombre
          <input name="nombre" defaultValue={estado.valores.nombre} />
        </label>
        {estado.errores.nombre && <p className="error">{estado.errores.nombre}</p>}

        <label>
          Teléfono
          <input name="telefono" defaultValue={estado.valores.telefono} />
        </label>
        {estado.errores.telefono && <p className="error">{estado.errores.telefono}</p>}

        <label>
          Fecha
          <input name="fecha" type="date" defaultValue={estado.valores.fecha} />
        </label>
        {estado.errores.fecha && <p className="error">{estado.errores.fecha}</p>}

        <button type="submit" className="boton primario" disabled={pendiente}>
          {pendiente ? "Enviando…" : "Pedir visita"}
        </button>
      </form>
    </main>
  );
}
