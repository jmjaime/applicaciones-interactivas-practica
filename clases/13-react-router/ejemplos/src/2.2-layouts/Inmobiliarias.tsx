import { Link } from "react-router";
import { inmobiliarias } from "../datos";

export default function Inmobiliarias() {
  return (
    <>
      <h1>Inmobiliarias</h1>
      <ul>
        {inmobiliarias.map((i) => (
          <li key={i.id}>
            <Link to={`/inmobiliarias/${i.id}`}>{i.nombre}</Link> · {i.descripcion}
          </li>
        ))}
      </ul>
    </>
  );
}
