// 2.2 · Props: el mismo componente Card, tres propiedades distintas.
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import Header from "../2.1-componentes/Header";
import Card from "./Card";
import Seccion from "./Seccion";

const lista: Propiedad[] = propiedades;

export default function Ejemplo() {
  return (
    <>
      <Header />
      <main className="contenido">
        <Seccion titulo="Destacadas">
          <div className="listado">
            <Card propiedad={lista[0]} esFavorita={false} />
            <Card propiedad={lista[1]} esFavorita={true} />
            <Card propiedad={lista[4]} esFavorita={false} />
          </div>
        </Seccion>
      </main>
    </>
  );
}

// 🔧 Probar:
//   1. Borrar esFavorita={…} de una card: TypeScript marca el error antes de ejecutar.
//   2. Pasar esFavorita="true" (string): tampoco compila. ¿Por qué el string no alcanza?
//   3. Envolver otra lista en un segundo <Seccion titulo="En alquiler">: mismo componente, otro contenido.
//   4. React DevTools → Components: seleccionar cada Card y mirar sus props.
