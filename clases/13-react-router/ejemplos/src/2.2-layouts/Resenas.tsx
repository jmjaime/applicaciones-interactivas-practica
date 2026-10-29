import { useParams } from "react-router";
import { buscarInmobiliaria } from "../datos";

export default function Resenas() {
  const { id } = useParams();
  const resenas = buscarInmobiliaria(Number(id))?.resenas ?? [];

  if (resenas.length === 0) return <p className="mensaje">Todavía no tiene reseñas.</p>;

  return (
    <ul className="resenas">
      {resenas.map((r) => (
        <li key={r.id}>
          {"★".repeat(r.calificacion)}
          {"☆".repeat(5 - r.calificacion)} <strong>{r.autor}</strong>: {r.texto}
        </li>
      ))}
    </ul>
  );
}
