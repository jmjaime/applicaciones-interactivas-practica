// No controlado: sin useState ni onChange. El DOM guarda los valores y se leen una sola vez, al enviar.
export type NuevaConsulta = {
  nombre: string;
  texto: string;
};

type HacerConsultaProps = {
  onEnviar: (consulta: NuevaConsulta) => void;
};

export default function HacerConsulta({ onEnviar }: HacerConsultaProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget); // lee cada campo por su name
    onEnviar({ nombre: String(datos.get("nombre")), texto: String(datos.get("texto")) });
    e.currentTarget.reset(); // vaciar el form es tarea del DOM, no del estado
  }

  // required: validación nativa del navegador; alcanza para un form así de simple.
  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>💬 Hacer una consulta</h2>
      <label>
        Nombre
        <input name="nombre" required />
      </label>
      <label>
        Consulta
        <textarea name="texto" rows={3} required />
      </label>
      <button type="submit" className="boton primario">
        Enviar consulta
      </button>
    </form>
  );
}
