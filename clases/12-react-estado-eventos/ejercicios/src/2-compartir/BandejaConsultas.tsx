// Ejercicio 2: Bandeja de consultas — ver README.md de esta carpeta.
import { consultas } from "../datos/consultas";
import ListaConsultas from "./ListaConsultas";
import PanelConsulta from "./PanelConsulta";

export default function BandejaConsultas() {
  // TODO: las consultas tienen que poder cambiar (al responder)
  // TODO: el panel tiene que mostrar la consulta seleccionada en la lista, no siempre la primera

  return (
    <main className="panel-vendedor">
      <h1>Consultas</h1>
      <div className="bandeja">
        <ListaConsultas consultas={consultas} />
        <PanelConsulta consulta={consultas[0]} />
      </div>
    </main>
  );
}
