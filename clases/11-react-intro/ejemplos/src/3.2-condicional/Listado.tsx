import type { Propiedad } from "../types";
import Card from "./Card";

type ListadoProps = {
  propiedades: Propiedad[];
  favoritos: number[];
};

export default function Listado({ propiedades, favoritos }: ListadoProps) {
  // Return temprano: si no hay nada, el componente entero es otro.
  if (propiedades.length === 0) {
    return <p className="mensaje">No hay propiedades con esos filtros.</p>;
  }

  return (
    <section className="listado">
      {propiedades.map((p) => (
        <Card key={p.id} propiedad={p} esFavorita={favoritos.includes(p.id)} />
      ))}
    </section>
  );
}
