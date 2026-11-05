import { useEffect, useState } from "react";

const FOTOS = [1, 2, 3, 4].map((n) => `https://picsum.photos/seed/prop${n}/400/260`);

export default function Carrusel() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      console.log("tick");
      // Con función: el effect corre una sola vez y `indice` quedaría congelado en 0 (la foto del render).
      setIndice((i) => (i + 1) % FOTOS.length);
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setIndice((i) => (i + 1) % FOTOS.length);
      if (e.key === "ArrowLeft") setIndice((i) => (i - 1 + FOTOS.length) % FOTOS.length);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="carrusel">
      <img src={FOTOS[indice]} alt={`Foto ${indice + 1}`} />
      <p>
        Foto {indice + 1} de {FOTOS.length} · también con ← y →
      </p>
    </div>
  );
}
