import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { EJEMPLOS } from "./ejemplos";
import Indice from "./Indice";
import "./estilos.css";

// Cada ejemplo es una app independiente, con su propio router, montada bajo /<id>/
// (p. ej. /2.1/propiedades/3). El basename hace que, adentro del ejemplo,
// las rutas empiecen en "/" como en una app real.
const id = window.location.pathname.split("/")[1];
const ejemplo = EJEMPLOS.find((e) => e.id === id);
const root = createRoot(document.getElementById("root")!);

if (!ejemplo) {
  root.render(
    <StrictMode>
      <Indice />
    </StrictMode>,
  );
} else {
  document.title = `${ejemplo.id} · ${ejemplo.titulo}`;
  ejemplo.cargar().then(({ rutas }) => {
    const router = createBrowserRouter(rutas, { basename: `/${ejemplo.id}` });
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
        {/* <a> a propósito: sale de la app del ejemplo y vuelve al índice */}
        <a className="volver" href="/">
          ← Ejemplos
        </a>
      </StrictMode>,
    );
  });
}
