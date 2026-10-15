// Ejercicios 4.1 y 4.2 — ver README.md de esta carpeta.
// Punto de partida: el 3.1 y el 3.2 resueltos.
import { propiedad } from "../datos/propiedad";
import Atributos from "./Atributos";
import Consultas from "./Consultas";
import DatosInmobiliaria from "./DatosInmobiliaria";
import Encabezado from "./Encabezado";
import Galeria from "./Galeria";
import MeInteresa from "./MeInteresa";
import Panel from "./Panel";
import Tags from "./Tags";

export default function Detalle() {
  return (
    <main className="detalle">
      <div className="principal">
        <Galeria fotos={propiedad.fotos} titulo={propiedad.titulo} />
        <Tags tags={propiedad.tags} />
      </div>

      <Encabezado
        titulo={propiedad.titulo}
        operacion={propiedad.operacion}
        precio={propiedad.precio}
        moneda={propiedad.moneda}
      />

      <section className="panel">
        <MeInteresa interesados={propiedad.interesados} />
      </section>

      <Panel titulo="Características">
        <Atributos
          barrio={propiedad.barrio}
          ambientes={propiedad.ambientes}
          superficieCubierta={propiedad.superficieCubierta}
          superficieTotal={propiedad.superficieTotal}
          descripcion={propiedad.descripcion}
        />
      </Panel>

      <Panel titulo="Inmobiliaria">
        <DatosInmobiliaria inmobiliaria={propiedad.inmobiliaria} />
      </Panel>

      <Panel titulo={`Consultas (${propiedad.consultas.length})`}>
        <Consultas
          consultas={propiedad.consultas}
          nombreInmobiliaria={propiedad.inmobiliaria.nombre}
        />
      </Panel>
    </main>
  );
}
