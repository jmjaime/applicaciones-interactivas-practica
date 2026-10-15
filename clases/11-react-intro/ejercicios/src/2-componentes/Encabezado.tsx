// Ya resuelto: el modelo a seguir para Atributos, DatosInmobiliaria y Panel.
type EncabezadoProps = {
  titulo: string;
  operacion: string;
  precio: number;
  moneda: string;
};

export default function Encabezado({ titulo, operacion, precio, moneda }: EncabezadoProps) {
  return (
    <section className="panel encabezado">
      <span className={operacion === "Venta" ? "badge venta" : "badge alquiler"}>{operacion}</span>
      <h1>{titulo}</h1>
      <span className="precio">
        {moneda} {precio.toLocaleString("es-AR")}
      </span>
    </section>
  );
}
