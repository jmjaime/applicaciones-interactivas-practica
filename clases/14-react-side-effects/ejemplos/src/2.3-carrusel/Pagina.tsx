import { useState } from "react";
import Carrusel from "./Carrusel";

export default function Pagina() {
  const [visible, setVisible] = useState(true);

  return (
    <main className="contenido">
      <h1>Fotos de la propiedad</h1>
      <div className="filtros">
        <button className="boton" onClick={() => setVisible(!visible)}>
          {visible ? "Ocultar carrusel" : "Mostrar carrusel"}
        </button>
      </div>
      {visible && <Carrusel />}
    </main>
  );
}
