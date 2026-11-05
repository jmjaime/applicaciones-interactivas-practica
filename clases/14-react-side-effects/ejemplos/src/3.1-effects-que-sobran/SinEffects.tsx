import { useState } from "react";
import type { Propiedad } from "../types";

// La nota vive en su propio componente: con otra key, React lo monta de cero.
function Nota() {
  const [nota, setNota] = useState("");
  return <textarea placeholder="Nota personal…" value={nota} onChange={(e) => setNota(e.target.value)} />;
}

export default function SinEffects({ propiedades }: { propiedades: Propiedad[] }) {
  const [operacion, setOperacion] = useState("");
  const [elegida, setElegida] = useState<Propiedad | null>(null);
  const [aviso, setAviso] = useState("");

  console.log("render sin effects");

  // ✅ 1. Derivado: se calcula durante el render.
  const visibles = propiedades.filter((p) => !operacion || p.operacion === operacion);

  // ✅ 3. Lo que pasa por un click va en el handler.
  function contactar() {
    setAviso(`Se avisó a la inmobiliaria por "${elegida?.titulo}"`);
  }

  return (
    <>
      <select value={operacion} onChange={(e) => setOperacion(e.target.value)}>
        <option value="">Todas</option>
        <option value="Venta">Venta</option>
        <option value="Alquiler">Alquiler</option>
      </select>
      <ul>
        {visibles.map((p) => (
          <li key={p.id}>
            <button className="boton" onClick={() => setElegida(p)}>
              {p.titulo}
            </button>
          </li>
        ))}
      </ul>
      {elegida && (
        <div className="formulario">
          <strong>{elegida.titulo}</strong>
          {/* ✅ 2. La key (Clase 12) reinicia el estado al cambiar de propiedad. */}
          <Nota key={elegida.id} />
          <button className="boton primario" onClick={contactar}>
            Contactar
          </button>
        </div>
      )}
      {aviso && <p className="aviso">{aviso}</p>}
    </>
  );
}
