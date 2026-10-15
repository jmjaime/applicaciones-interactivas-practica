// Integrador: Mis propiedades — ver README.md de esta carpeta.
// Se arma desde cero: los componentes, sus archivos y el estado los decide cada quien.
import { misPropiedades } from "../datos/mis-propiedades";

export default function MisPropiedades() {
  return (
    <main className="panel-vendedor">
      <h1>Mis propiedades</h1>
      {/* TODO */}
      <p className="mensaje">Pendiente: {misPropiedades.length} propiedades</p>
    </main>
  );
}
