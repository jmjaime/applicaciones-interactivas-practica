import { inmobiliarias, propiedades } from "../datos";
import CardInmobiliariaGlobal from "./global/CardInmobiliaria";
import CardPropiedadGlobal from "./global/CardPropiedad";
import CardInmobiliariaModule from "./modules/CardInmobiliaria";
import CardPropiedadModule from "./modules/CardPropiedad";

export default function Comparacion() {
  return (
    <main className="contenido">
      <h1>4.1 · CSS global vs. CSS Modules</h1>
      <div className="detalle">
        <section>
          <h2>Con CSS global</h2>
          <CardPropiedadGlobal propiedad={propiedades[0]} />
          <CardInmobiliariaGlobal inmobiliaria={inmobiliarias[0]} />
        </section>
        <section>
          <h2>Con CSS Modules</h2>
          <CardPropiedadModule propiedad={propiedades[0]} />
          <CardInmobiliariaModule inmobiliaria={inmobiliarias[0]} />
        </section>
      </div>
    </main>
  );
}

// 🔧 Probar:
//   1. DevTools → Elements: inspeccionar los dos títulos de la izquierda (class="titulo": color y tamaño de un
//      archivo, mayúsculas del otro) y los de la derecha (class="_titulo_xxxx_1", una clase distinta por archivo).
//   2. Invertir el orden de los dos imports de global/: cambia qué .titulo gana en color y tamaño.
//   3. console.log(estilos) en modules/CardPropiedad.tsx: un objeto { titulo: "_titulo_…", … }.
//   4. Escribir estilos.titlo (con un typo): no hay error de compilación, la clase queda undefined y el estilo no se aplica.
