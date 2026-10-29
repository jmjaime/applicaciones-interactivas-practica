import Header from "./Header";

export default function ComoPublicar() {
  return (
    <>
      <Header />
      <main className="contenido">
        <h1>Cómo publicar</h1>
        <ol>
          <li>Registrarse como vendedor y crear la inmobiliaria.</li>
          <li>Cargar la propiedad desde "Mis propiedades".</li>
          <li>Responder consultas y confirmar visitas desde el panel.</li>
        </ol>
      </main>
    </>
  );
}
