import { Link, useSearchParams } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { propiedades } from "../datos";

// Los mismos filtros del 1.2 de la Clase 12, pero en la URL en vez de en un useState:
// se pueden compartir como link, sobreviven al F5 y el botón "Atrás" los respeta.
export default function Listado() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Lo que no está en la URL es "sin filtro". Siempre son strings.
  const operacion = searchParams.get("operacion") ?? "";
  const tipo = searchParams.get("tipo") ?? "";
  const texto = searchParams.get("q") ?? "";

  function cambiarFiltro(clave: string, valor: string, reemplazar = false) {
    const nuevos = new URLSearchParams(searchParams); // copia: no se muta el original
    if (valor) nuevos.set(clave, valor);
    else nuevos.delete(clave); // filtro vacío = fuera de la URL
    // replace: el texto cambia con cada tecla; sin esto, "Atrás" desharía letra por letra.
    setSearchParams(nuevos, { replace: reemplazar });
  }

  // Derivado, como en la Clase 12: la lista filtrada no se guarda en ningún lado.
  const visibles = propiedades.filter(
    (p) =>
      (!operacion || p.operacion === operacion) &&
      (!tipo || p.tipo === tipo) &&
      p.titulo.toLowerCase().includes(texto.toLowerCase()),
  );

  return (
    <>
      <div className="filtros">
        <select value={operacion} onChange={(e) => cambiarFiltro("operacion", e.target.value)}>
          <option value="">Venta y alquiler</option>
          <option value="Venta">Venta</option>
          <option value="Alquiler">Alquiler</option>
        </select>
        <select value={tipo} onChange={(e) => cambiarFiltro("tipo", e.target.value)}>
          <option value="">Todos los tipos</option>
          <option>Departamento</option>
          <option>Casa</option>
          <option>Local</option>
          <option>Terreno</option>
        </select>
        <input
          type="search"
          placeholder="Buscar…"
          value={texto}
          onChange={(e) => cambiarFiltro("q", e.target.value, true)}
        />
        {searchParams.size > 0 && <Link to="/">Limpiar filtros</Link>}
      </div>
      {visibles.length === 0 ? (
        <p className="mensaje">No hay propiedades con esos filtros.</p>
      ) : (
        <div className="listado">
          {visibles.map((p) => (
            <Link key={p.id} to={`/propiedades/${p.id}`}>
              <CardPropiedad propiedad={p} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

// 🔧 Probar:
//   1. Filtrar por "Alquiler" + "Departamento", copiar la URL y abrirla en otra pestaña: mismos resultados.
//   2. Filtrar, entrar a una propiedad y volver con el botón Atrás del navegador: los filtros siguen ahí.
//   3. Escribir en el buscador y apretar Atrás: con replace vuelve al estado anterior a escribir;
//      sacar el `true` del onChange del input y probar de nuevo.
//   4. Agregar un orden por precio (?orden=asc|desc) con [...visibles].sort().
