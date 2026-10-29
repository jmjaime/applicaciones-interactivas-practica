import { Link, useParams } from "react-router";
import CardPropiedad from "../comun/CardPropiedad";
import { buscarInmobiliaria, propiedades } from "../datos";
import Header from "./Header";

// Otra ruta con :id, con otro significado: acá es el id de la inmobiliaria.
export default function SitioVendedor() {
  const { id } = useParams();
  const inmobiliaria = buscarInmobiliaria(Number(id));

  if (!inmobiliaria) {
    return (
      <>
        <Header />
        <main className="contenido mensaje">
          <p>No existe la inmobiliaria {id}.</p>
        </main>
      </>
    );
  }

  const suyas = propiedades.filter((p) => p.inmobiliariaId === inmobiliaria.id);

  return (
    <>
      <Header />
      <main className="contenido">
        <section className="inmobiliaria-header">
          <h1>{inmobiliaria.nombre}</h1>
          <p>{inmobiliaria.descripcion}</p>
          <p>
            📞 {inmobiliaria.telefono} · ✉️ {inmobiliaria.email}
          </p>
        </section>
        <h2>Sus propiedades</h2>
        <div className="listado">
          {suyas.map((p) => (
            <Link key={p.id} to={`/propiedades/${p.id}`}>
              <CardPropiedad propiedad={p} />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
