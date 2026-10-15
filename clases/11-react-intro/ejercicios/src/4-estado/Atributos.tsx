type AtributosProps = {
  barrio: string;
  ambientes: number | null;
  superficieCubierta: number | null;
  superficieTotal: number;
  descripcion: string;
};

export default function Atributos({
  barrio,
  ambientes,
  superficieCubierta,
  superficieTotal,
  descripcion,
}: AtributosProps) {
  return (
    <>
      <p className="atributos">
        {barrio} · {ambientes} ambientes · {superficieCubierta} m² cubiertos · {superficieTotal} m²
        totales
      </p>
      <p>{descripcion}</p>
    </>
  );
}
