// Ejercicios 3.1 y 3.2 — ver README.md de esta carpeta.
// Punto de partida: el 2.1 resuelto. Detalle ya usa Galeria, Tags y Consultas:
// lo que falta está adentro de cada uno de esos componentes.
import { propiedad } from "../datos/propiedad";
import Atributos from "./Atributos";
import Consultas from "./Consultas";
import DatosInmobiliaria from "./DatosInmobiliaria";
import Encabezado from "./Encabezado";
import Galeria from "./Galeria";
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
        <Consultas consultas={propiedad.consultas} />
      </Panel>
    </main>
  );
}
