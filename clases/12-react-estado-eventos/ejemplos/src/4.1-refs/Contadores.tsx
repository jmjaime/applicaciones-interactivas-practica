// Los dos contadores del checkpoint: los dos sobreviven entre renders, solo uno pide re-render.
import { useRef, useState } from "react";

export default function Contadores() {
  const [enEstado, setEnEstado] = useState(0);
  const enRef = useRef(0);

  return (
    <div className="contadores">
      <section>
        <h2>useRef</h2>
        <button onClick={() => (enRef.current = enRef.current + 1)}>ref: {enRef.current}</button>
      </section>
      <section>
        <h2>useState</h2>
        <button onClick={() => setEnEstado(enEstado + 1)}>estado: {enEstado}</button>
      </section>
    </div>
  );
}
