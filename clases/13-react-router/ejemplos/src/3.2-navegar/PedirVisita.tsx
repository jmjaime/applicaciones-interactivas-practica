import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { buscarPropiedad } from "../datos";
import { registrarSolicitud } from "./solicitudes";

// Versión corta del formulario controlado de la Clase 12 (3.1): el foco acá es qué pasa después del submit.
export default function PedirVisita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", telefono: "", fecha: "" });
  const propiedad = buscarPropiedad(Number(id));

  if (!propiedad) return <p className="mensaje">No existe la propiedad {id}.</p>;

  const hoy = new Date().toISOString().slice(0, 10);
  const esValido = form.nombre.trim() !== "" && form.telefono.trim() !== "" && form.fecha > hoy;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!esValido) return;
    registrarSolicitud({ propiedadId: Number(id), ...form });
    // replace: el formulario sale del historial, "Atrás" no vuelve a un form ya enviado.
    // state: un dato para la página de destino, que no queda en la URL.
    navigate(`/propiedades/${id}`, { replace: true, state: { fechaVisita: form.fecha } });
  }

  return (
    <form className="formulario angosto" onSubmit={handleSubmit}>
      <h2>Pedir visita · {propiedad.titulo}</h2>
      <label>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label>
      <label>
        Teléfono
        <input name="telefono" value={form.telefono} onChange={handleChange} />
      </label>
      <label>
        Fecha (futura)
        <input name="fecha" type="date" min={hoy} value={form.fecha} onChange={handleChange} />
      </label>
      <div className="acciones">
        <button type="submit" className="boton primario" disabled={!esValido}>
          Pedir visita
        </button>
        {/* -1 = una entrada atrás en el historial, como el botón del navegador */}
        <button type="button" className="boton" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

// 🔧 Probar:
//   1. Pedir una visita y apretar Atrás: no vuelve al formulario. Sacar `replace: true` y repetir.
//   2. Mandar el usuario al listado en vez de al detalle: navigate("/").
//   3. Entrar directo a /3.2/propiedades/2/visita en una pestaña nueva y apretar "Cancelar":
//      navigate(-1) sale de la app (no hay nada antes en el historial). ¿Qué conviene en ese caso?
