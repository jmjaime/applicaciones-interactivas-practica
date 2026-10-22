import { useState } from "react";

export type FormVisita = {
  nombre: string;
  telefono: string;
  fecha: string; // "AAAA-MM-DD", lo que devuelve un <input type="date">
  franja: string;
  mensaje: string;
};

const FORM_VACIO: FormVisita = { nombre: "", telefono: "", fecha: "", franja: "mañana", mensaje: "" };

// La fecha de hoy en hora local, con el mismo formato que el input date.
// (toISOString() usa UTC: de noche en Argentina ya devolvería mañana.)
function hoy() {
  return new Date().toLocaleDateString("en-CA");
}

function validar(form: FormVisita) {
  const errores: Partial<Record<keyof FormVisita, string>> = {};
  if (!form.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!/^[\d\s-]{8,}$/.test(form.telefono)) errores.telefono = "Teléfono inválido (al menos 8 dígitos)";
  if (!form.fecha || form.fecha <= hoy()) errores.fecha = "La fecha tiene que ser futura";
  return errores;
}

type PedirVisitaProps = {
  onEnviar: (visita: FormVisita) => void;
};

export default function PedirVisita({ onEnviar }: PedirVisitaProps) {
  const [form, setForm] = useState<FormVisita>(FORM_VACIO);
  const [intentoEnviar, setIntentoEnviar] = useState(false);

  // Derivados: se recalculan con cada tecla, nunca quedan desincronizados del form.
  const errores = validar(form);
  const esValido = Object.keys(errores).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // la clave sale del atributo name
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // sin esto, el navegador recarga la página y se pierde el estado
    setIntentoEnviar(true);
    if (!esValido) return;
    onEnviar(form);
    setForm(FORM_VACIO);
    setIntentoEnviar(false);
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>📅 Pedir visita</h2>

      <label>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label>
      {intentoEnviar && errores.nombre && <p className="error">{errores.nombre}</p>}

      <label>
        Teléfono
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </label>
      {intentoEnviar && errores.telefono && <p className="error">{errores.telefono}</p>}

      <label>
        Fecha
        <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
      </label>
      {intentoEnviar && errores.fecha && <p className="error">{errores.fecha}</p>}

      <fieldset>
        <legend>Franja horaria</legend>
        <label>
          <input type="radio" name="franja" value="mañana" checked={form.franja === "mañana"} onChange={handleChange} />{" "}
          Mañana
        </label>
        <label>
          <input type="radio" name="franja" value="tarde" checked={form.franja === "tarde"} onChange={handleChange} />{" "}
          Tarde
        </label>
      </fieldset>

      <label>
        Mensaje (opcional)
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={2} />
      </label>

      <button type="submit" className="boton primario" disabled={intentoEnviar && !esValido}>
        Pedir visita
      </button>
    </form>
  );
}
