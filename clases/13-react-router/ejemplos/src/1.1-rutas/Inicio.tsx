import CardPropiedad from "../comun/CardPropiedad";
import { propiedades } from "../datos";
import Header from "./Header";

export default function Inicio() {
  return (
    <>
      <Header />
      <main className="contenido">
        <h1>Propiedades</h1>
        <div className="listado">
          {propiedades.map((p) => (
            <CardPropiedad key={p.id} propiedad={p} />
          ))}
        </div>
      </main>
    </>
  );
}
