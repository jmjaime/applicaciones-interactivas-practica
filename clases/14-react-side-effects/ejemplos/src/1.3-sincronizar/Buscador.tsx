import { useEffect, useRef, useState } from "react";

export default function Buscador() {
  const [texto, setTexto] = useState("");
  const [clicks, setClicks] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Los tres casos del array de dependencias, para mirar en la consola:
  useEffect(() => {
    console.log("sin array: después de cada render");
  });

  useEffect(() => {
    console.log("[]: solo al montar");
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    console.log(`[texto]: cambió a "${texto}"`);
    document.title = texto ? `Buscando "${texto}"` : "Propiedades";
  }, [texto]);

  return (
    <main className="contenido">
      <h1>Buscador</h1>
      <p className="nota">Mirar la consola y el título de la pestaña.</p>
      <div className="filtros">
        <input ref={inputRef} placeholder="Barrio o título…" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button className="boton" onClick={() => setClicks(clicks + 1)}>
          Contador: {clicks}
        </button>
      </div>
    </main>
  );
}
