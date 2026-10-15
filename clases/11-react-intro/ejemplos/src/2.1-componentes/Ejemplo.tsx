// 2.1 · Componentes: la pantalla del listado partida en piezas con nombre.
//   Ejemplo (App)
//   ├── Header
//   ├── Filtros
//   └── section.listado
//       └── Card × 3
import Card from "./Card";
import Filtros from "./Filtros";
import Header from "./Header";

export default function Ejemplo() {
  return (
    <>
      <Header />
      <main className="contenido">
        <Filtros />
        <section className="listado">
          <Card />
          <Card />
          <Card />
        </section>
      </main>
    </>
  );
}

// 🔧 Probar:
//   1. Renombrar Card a card (la función y el uso): React lo trata como etiqueta HTML y no muestra nada.
//   2. Sacar el Fragment (<>…</>) del return: dos elementos raíz, no compila.
//   3. Extraer el <h2>/<p> de la card a un componente CardInfo.tsx y usarlo adentro de Card.
