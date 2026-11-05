import { useEffect, useState } from "react";
import type { Propiedad } from "../types";

export default function ConEffects({ propiedades }: { propiedades: Propiedad[] }) {
  const [operacion, setOperacion] = useState("");
  const [visibles, setVisibles] = useState<Propiedad[]>([]);
  const [elegida, setElegida] = useState<Propiedad | null>(null);
  const [nota, setNota] = useState("");
  const [contactar, setContactar] = useState(false);
  const [aviso, setAviso] = useState("");

  console.log("render con effects");

  // ❌ 1. Un dato que se puede calcular, copiado en otro estado: un render de más en cada cambio.
  useEffect(() => {
    setVisibles(propiedades.filter((p) => !operacion || p.operacion === operacion));
  }, [propiedades, operacion]);

  // ❌ 2. Resetear estado "a mano" cuando cambia la propiedad.
  useEffect(() => {
    setNota("");
  }, [elegida]);

  // ❌ 3. Lo que pasa por un click, disparado con un estado-bandera.
  useEffect(() => {
    if (contactar) {
      setAviso(`Se avisó a la inmobiliaria por "${elegida?.titulo}"`);
      setContactar(false);
    }
  }, [contactar, elegida]);

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
          <textarea placeholder="Nota personal…" value={nota} onChange={(e) => setNota(e.target.value)} />
          <button className="boton primario" onClick={() => setContactar(true)}>
            Contactar
          </button>
        </div>
      )}
      {aviso && <p className="aviso">{aviso}</p>}
    </>
  );
}
