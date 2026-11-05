import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { EJERCICIOS } from "./ejercicios";
import Indice from "./Indice";
import "./estilos.css";

// Cada carpeta es una app independiente, con su propio router, montada bajo /<id>/
// (p. ej. /2/propiedades/3). Por el basename, adentro de cada una las rutas empiezan en "/".
const id = window.location.pathname.split("/")[1];
const ejercicio = EJERCICIOS.find((e) => e.id === id);
const root = createRoot(document.getElementById("root")!);

if (!ejercicio) {
  root.render(
    <StrictMode>
      <Indice />
    </StrictMode>,
  );
} else {
  document.title = ejercicio.titulo;
  ejercicio.cargar().then(({ rutas }) => {
    const router = createBrowserRouter(rutas, { basename: `/${ejercicio.id}` });
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
        <a className="volver" href="/">
          ← Ejercicios
        </a>
      </StrictMode>,
    );
  });
}
