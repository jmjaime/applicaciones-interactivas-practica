// 3.2 · Renderizado condicional: ternario, && y return temprano.
import propiedades from "../datos/propiedades.json";
import type { Propiedad } from "../types";
import Listado from "./Listado";

const lista: Propiedad[] = propiedades;

// Todavía sin estado: los favoritos son una constante (cambiarla a mano y guardar).
const favoritos: number[] = [];

export default function Ejemplo() {
  return (
    <>
      <header className="header">
        <strong>🏠 Inmobi</strong>
        {favoritos.length > 0 && <span className="contador">❤️ {favoritos.length}</span>}
      </header>
      <main className="contenido">
        <Listado propiedades={lista} favoritos={favoritos} />
      </main>
    </>
  );
}

// 🔧 Probar:
//   1. favoritos = [2, 5]: aparece el contador y el ❤️ en el título de esas dos cards.
//   2. Pasar propiedades={[]} al Listado: se ve el mensaje de lista vacía.
//   3. Las propiedades 4 y 7 no tienen tags: no se dibuja la <ul> vacía.
//   4. Sacar el "> 0" de la condición del header: con favoritos vacío aparece un "0" suelto
//      (React no dibuja false, pero sí el número 0). Por eso la condición es un booleano.
