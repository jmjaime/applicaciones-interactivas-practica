// Ejercicio 2.1: Componentes y props — ver README.md de esta carpeta.
// Punto de partida: el 1.1 resuelto, todo en un solo componente.
import { propiedad } from "../datos/propiedad";

export default function Detalle() {
  const { inmobiliaria } = propiedad;

  // TODO: reemplazar cada bloque por su componente (Encabezado, Atributos, DatosInmobiliaria)
  //       y cada <section className="panel"> con título por un <Panel>.
  return (
    <main className="detalle">
      <div className="principal">
        <img className="foto-principal" src={propiedad.fotos[0]} alt={propiedad.titulo} />
      </div>

      <section className="panel encabezado">
        <span className={propiedad.operacion === "Venta" ? "badge venta" : "badge alquiler"}>
          {propiedad.operacion}
        </span>
        <h1>{propiedad.titulo}</h1>
        <span className="precio">
          {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
        </span>
      </section>

      <section className="panel">
        <h2>Características</h2>
        <p className="atributos">
          {propiedad.barrio} · {propiedad.ambientes} ambientes · {propiedad.superficieCubierta} m²
          cubiertos · {propiedad.superficieTotal} m² totales
        </p>
        <p>{propiedad.descripcion}</p>
      </section>

      <section className="panel">
        <h2>Inmobiliaria</h2>
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
      </section>
    </main>
  );
}
