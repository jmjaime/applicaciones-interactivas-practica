// Ejercicio 1.1: El detalle en JSX — ver README.md de esta carpeta.
import { propiedad } from "../datos/propiedad";

export default function Detalle() {
  return (
    <main className="detalle">
      <div className="principal">
        <img className="foto-principal" src={propiedad.fotos[0]} alt={propiedad.titulo} />
      </div>

      <section className="panel encabezado">
        {/* TODO: badge con la operación, con la clase según sea venta o alquiler */}
        {/* TODO: título de la propiedad */}
        {/* TODO: precio con moneda y separador de miles */}
      </section>

      <section className="panel">
        <h2>Características</h2>
        {/* TODO: barrio, ambientes y superficies en una línea */}
        {/* TODO: descripción */}
      </section>

      <section className="panel">
        <h2>Inmobiliaria</h2>
        {/* TODO: nombre, calificación con cantidad de reseñas, teléfono y email clickeables */}
      </section>
    </main>
  );
}
