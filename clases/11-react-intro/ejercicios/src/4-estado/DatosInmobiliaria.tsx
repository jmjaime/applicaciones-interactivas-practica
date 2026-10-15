import type { Inmobiliaria } from "../types";

type DatosInmobiliariaProps = {
  inmobiliaria: Inmobiliaria;
};

export default function DatosInmobiliaria({ inmobiliaria }: DatosInmobiliariaProps) {
  return (
    <>
      <p>
        <strong>{inmobiliaria.nombre}</strong>
      </p>
      <p className="calificacion">
        ★ {inmobiliaria.calificacion} ({inmobiliaria.cantidadResenas} reseñas)
      </p>
      <p>
        📞 <a href={`tel:${inmobiliaria.telefono}`}>{inmobiliaria.telefono}</a>
      </p>
      <p>
        ✉️ <a href={`mailto:${inmobiliaria.email}`}>{inmobiliaria.email}</a>
      </p>
    </>
  );
}
