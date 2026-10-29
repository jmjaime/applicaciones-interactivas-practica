import { inmobiliarias } from "../datos";
import Header from "./Header";

export default function Inmobiliarias() {
  return (
    <>
      <Header />
      <main className="contenido">
        <h1>Inmobiliarias</h1>
        <ul>
          {inmobiliarias.map((i) => (
            <li key={i.id}>
              <strong>{i.nombre}</strong> · {i.descripcion}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
