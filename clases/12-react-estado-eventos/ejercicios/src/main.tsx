import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EJERCICIOS } from "./ejercicios";
import Indice from "./Indice";
import "./estilos.css";

// Cada carpeta es una app independiente: se elige con ?ej=N en la URL
// (sin router a propósito: alcanza con leer el parámetro de la URL).
const id = new URLSearchParams(window.location.search).get("ej");
const ejercicio = EJERCICIOS.find((e) => e.id === id);
const Ejercicio = ejercicio ? ejercicio.componente : Indice;

if (ejercicio) document.title = ejercicio.titulo;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Ejercicio />
    {ejercicio && (
      <a className="volver" href="/">
        ← Ejercicios
      </a>
    )}
  </StrictMode>,
);
