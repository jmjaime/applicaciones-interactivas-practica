// 2.1 · Compartir estado: Listado y Panel son hermanos y necesitan los mismos datos.
// El estado sube al ancestro común (este componente) y baja por props; los cambios suben por callbacks.
//
//            Ejemplo   ← seleccionadaId, favoritos
//          /    |    \
//    Header  Listado  Panel
import { useState } from "react";
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import Listado from "./Listado";
import Panel from "./Panel";

const lista: Propiedad[] = propiedades;

export default function Ejemplo() {
  // Se guarda el id, no el objeto: la propiedad se busca en cada render.
  const [seleccionadaId, setSeleccionadaId] = useState<number | null>(null);
  const [favoritos, setFavoritos] = useState<number[]>([]);
  // Solo para la demo: alternar el Panel con y sin key sin tocar el código.
  const [conKey, setConKey] = useState(false);

  const seleccionada = lista.find((p) => p.id === seleccionadaId);

  function toggleFavorito(id: number) {
    setFavoritos(favoritos.includes(id) ? favoritos.filter((f) => f !== id) : [...favoritos, id]);
  }

  return (
    <>
      <header className="header">
        <strong>🏠 Inmobi</strong>
        <span className="contador">❤️ {favoritos.length}</span>
      </header>
      <main className="contenido">
        <label className="opcion-demo">
          <input type="checkbox" checked={conKey} onChange={(e) => setConKey(e.target.checked)} /> Panel con{" "}
          <code>key={"{seleccionada.id}"}</code>
        </label>
        <div className="dos-columnas">
          <Listado
            propiedades={lista}
            seleccionadaId={seleccionadaId}
            favoritos={favoritos}
            onSeleccionar={setSeleccionadaId}
            onToggleFavorito={toggleFavorito}
          />
          {seleccionada ? (
            <Panel
              key={conKey ? seleccionada.id : undefined}
              propiedad={seleccionada}
              esFavorita={favoritos.includes(seleccionada.id)}
              onToggleFavorito={() => toggleFavorito(seleccionada.id)}
            />
          ) : (
            <p className="mensaje">Elegir una propiedad de la lista.</p>
          )}
        </div>
      </main>
    </>
  );
}

// 🔧 Probar:
//   1. Marcar ❤️ en el listado y en el panel: es el mismo estado, se actualizan los dos y el header.
//   2. React DevTools → Components → Ejemplo: seleccionadaId y favoritos viven acá; Listado no tiene estado.
//   3. Sin key: escribir una nota, elegir otra propiedad → la nota queda. Con key: se reinicia.
//   4. Mover la nota al padre como un objeto { [id]: texto } para que cada propiedad recuerde la suya
//      (el estado sube cuando otro necesita leerlo… o cuando tiene que sobrevivir al cambio de panel).
//   5. Sacar el e.stopPropagation() del ❤️ en Listado: el click también selecciona la fila.
