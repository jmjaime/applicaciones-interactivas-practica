import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EJEMPLOS } from "./ejemplos";
import Indice from "./Indice";
import "./estilos.css";

// Cada ejemplo es una app independiente: se elige con ?ej=N.M en la URL
// (sin router a propósito: alcanza con leer el parámetro de la URL).
const id = new URLSearchParams(window.location.search).get("ej");
const ejemplo = EJEMPLOS.find((e) => e.id === id);
const Ejemplo = ejemplo ? ejemplo.componente : Indice;

if (ejemplo) document.title = `${ejemplo.id} · ${ejemplo.titulo}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Ejemplo />
    {ejemplo && (
      <a className="volver" href="/">
        ← Ejemplos
      </a>
    )}
  </StrictMode>,
);
