// El formulario del Ejercicio 3 resuelto. Para el integrador hay que adaptarlo: ver README.md.
import { useState } from "react";
import type { Moneda, NuevaPropiedad, Operacion, TipoPropiedad } from "../types";

type PublicarPropiedadProps = {
  onPublicar: (propiedad: NuevaPropiedad) => void;
};

// Los números se guardan como string, tal cual los devuelve el input.
type FormPropiedad = {
  titulo: string;
  tipo: TipoPropiedad;
  operacion: Operacion;
  precio: string;
  moneda: Moneda;
  ambientes: string;
  superficieCubierta: string;
  superficieTotal: string;
};

const FORM_INICIAL: FormPropiedad = {
  titulo: "",
  tipo: "Departamento",
  operacion: "Venta",
  precio: "",
  moneda: "USD",
  ambientes: "",
  superficieCubierta: "",
  superficieTotal: "",
};

function validar(form: FormPropiedad) {
  const errores: Partial<Record<keyof FormPropiedad, string>> = {};
  const esTerreno = form.tipo === "Terreno";
  if (!form.titulo.trim()) errores.titulo = "El título es obligatorio";
  if (!(Number(form.precio) > 0)) errores.precio = "El precio tiene que ser mayor a 0";
  if (!(Number(form.superficieTotal) > 0)) errores.superficieTotal = "La superficie total tiene que ser mayor a 0";
  if (!esTerreno) {
    const cubierta = Number(form.superficieCubierta);
    if (!(cubierta > 0)) errores.superficieCubierta = "La superficie cubierta tiene que ser mayor a 0";
    else if (cubierta > Number(form.superficieTotal))
      errores.superficieCubierta = "La superficie cubierta no puede superar la total";
    if (form.ambientes !== "" && !(Number.isInteger(Number(form.ambientes)) && Number(form.ambientes) >= 1))
      errores.ambientes = "Los ambientes tienen que ser un entero mayor o igual a 1";
  }
  return errores;
}

function aPropiedad(form: FormPropiedad): NuevaPropiedad {
  const esTerreno = form.tipo === "Terreno";
  return {
    titulo: form.titulo.trim(),
    tipo: form.tipo,
    operacion: form.operacion,
    precio: Number(form.precio),
    moneda: form.moneda,
    ambientes: esTerreno || form.ambientes === "" ? null : Number(form.ambientes),
    superficieCubierta: esTerreno ? null : Number(form.superficieCubierta),
    superficieTotal: Number(form.superficieTotal),
  };
}

export default function PublicarPropiedad({ onPublicar }: PublicarPropiedadProps) {
  const [form, setForm] = useState<FormPropiedad>(FORM_INICIAL);
  const [intentoPublicar, setIntentoPublicar] = useState(false);

  const errores = validar(form);
  const esValido = Object.keys(errores).length === 0;
  const esTerreno = form.tipo === "Terreno";

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIntentoPublicar(true);
    if (!esValido) return;
    onPublicar(aPropiedad(form));
    setForm(FORM_INICIAL);
    setIntentoPublicar(false);
  }

  function error(campo: keyof FormPropiedad) {
    return intentoPublicar && errores[campo] && <p className="error">{errores[campo]}</p>;
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>🏠 Publicar propiedad</h2>

      <label>
        Título
        <input name="titulo" value={form.titulo} onChange={handleChange} />
      </label>
      {error("titulo")}

      <div className="fila-campos">
        <label>
          Tipo
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Local">Local</option>
          </select>
        </label>

        <fieldset>
          <legend>Operación</legend>
          <label>
            <input type="radio" name="operacion" value="Venta" checked={form.operacion === "Venta"} onChange={handleChange} />{" "}
            Venta
          </label>
          <label>
            <input
              type="radio"
              name="operacion"
              value="Alquiler"
              checked={form.operacion === "Alquiler"}
              onChange={handleChange}
            />{" "}
            Alquiler
          </label>
        </fieldset>
      </div>

      <div className="fila-campos">
        <label>
          Precio
          <input name="precio" type="number" value={form.precio} onChange={handleChange} />
        </label>
        <label>
          Moneda
          <select name="moneda" value={form.moneda} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
          </select>
        </label>
      </div>
      {error("precio")}

      <div className="fila-campos">
        {!esTerreno && (
          <>
            <label>
              Ambientes (opcional)
              <input name="ambientes" type="number" value={form.ambientes} onChange={handleChange} />
            </label>
            <label>
              Superficie cubierta (m²)
              <input name="superficieCubierta" type="number" value={form.superficieCubierta} onChange={handleChange} />
            </label>
          </>
        )}
        <label>
          Superficie total (m²)
          <input name="superficieTotal" type="number" value={form.superficieTotal} onChange={handleChange} />
        </label>
      </div>
      {error("ambientes")}
      {error("superficieCubierta")}
      {error("superficieTotal")}

      <button type="submit" className="boton primario">
        Publicar
      </button>
    </form>
  );
}
