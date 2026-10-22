// Integrador: Mis propiedades — ver README.md de esta carpeta.
// Punto de partida: el integrador de la Clase 11 resuelto (listado, acciones, resumen y filtro)
// y el formulario del Ejercicio 3 (PublicarPropiedad.tsx), todavía sin usar.
import { useState } from "react";
import { misPropiedades } from "../datos/mis-propiedades";
import { ESTADOS, type EstadoPropiedad, type MiPropiedad } from "../types";
import FilaPropiedad from "./FilaPropiedad";
import ResumenEstados from "./ResumenEstados";

export default function MisPropiedades() {
  const [propiedades, setPropiedades] = useState<MiPropiedad[]>(misPropiedades);
  const [filtro, setFiltro] = useState<EstadoPropiedad | "">("");
  // TODO (5): qué formulario está abierto (ninguno, alta, o la edición de una propiedad)

  const visibles = filtro ? propiedades.filter((p) => p.estado === filtro) : propiedades;

  function cambiarEstado(id: number, estado: EstadoPropiedad) {
    setPropiedades(propiedades.map((p) => (p.id === id ? { ...p, estado } : p)));
  }

  // TODO (5): alta de una propiedad nueva
  // TODO (5): edición de una propiedad existente

  return (
    <main className="panel-vendedor">
      <div className="titulo-con-accion">
        <h1>Mis propiedades</h1>
        {/* TODO (5): botón "+ Nueva propiedad" */}
      </div>

      <ResumenEstados propiedades={propiedades} />

      <div className="filtros">
        <select value={filtro} onChange={(e) => setFiltro(e.target.value as EstadoPropiedad | "")}>
          <option value="">Todos</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {visibles.length === 0 ? (
        <p className="mensaje">No hay propiedades en ese estado.</p>
      ) : (
        visibles.map((p) => (
          <FilaPropiedad key={p.id} propiedad={p} onCambiarEstado={(estado) => cambiarEstado(p.id, estado)} />
        ))
      )}
    </main>
  );
}
