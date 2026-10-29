// Ejercicio 1.1: El detalle en JSX — ver README.md de esta carpeta.
import { propiedad } from "../datos/propiedad";

export default function Detalle() {
  return (
    <main className="detalle">
      <div className="principal">
        <img className="foto-principal" src={propiedad.fotos[0]} alt={propiedad.titulo} />
      </div>

      <section className="panel encabezado">
        <h1>{propiedad.titulo}</h1>
        <h3>{propiedad.barrio}</h3>
        <p>{propiedad.descripcion}</p>
        <p className="precio">
          {propiedad.moneda} {propiedad.precio.toLocaleString("es-AR")}
        </p>
      </section>

      <section className="panel">
        <h2>Características</h2>
        <ul>
          <li>{propiedad.ambientes} ambientes</li>
          <li>{propiedad.superficieCubierta} m² cubiertos</li>
          <li>{propiedad.superficieTotal} m² totales</li>
          <li>Publicado el {propiedad.inmobiliaria.nombre}</li>
        </ul>
      </section>

      <section className="panel">
        <h2>Inmobiliaria</h2>
        <p>
         Email: <a href={`mailto:${propiedad.inmobiliaria.email}`}>{propiedad.inmobiliaria.email}</a>
        </p>
        <p>Teléfono: <a href={`tel:${propiedad.inmobiliaria.telefono}`}>{propiedad.inmobiliaria.telefono}</a></p>
        <p>
          Calificación: <strong>{propiedad.inmobiliaria.calificacion}</strong> ({propiedad.inmobiliaria.cantidadResenas} reseñas)
        </p>
      </section>
    </main>
  );
}
