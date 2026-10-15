// Ejercicio 4.1 — ver README.md de esta carpeta.
// Punto de partida: el 3.1 resuelto (galería estática, siempre la primera foto).
type GaleriaProps = {
  fotos: string[];
  titulo: string;
};

export default function Galeria({ fotos, titulo }: GaleriaProps) {
  // TODO: recordar qué foto es la principal, y cambiarla con las miniaturas y los botones ‹ ›
  const indice = 0;

  return (
    <>
      <img className="foto-principal" src={fotos[indice]} alt={titulo} />
      {/* TODO: controles ‹ N / M › (div.galeria-controles) */}
      <ul className="miniaturas">
        {fotos.map((foto, i) => (
          <li key={foto}>
            <img
              className={i === indice ? "miniatura activa" : "miniatura"}
              src={foto}
              alt={`Foto ${i + 1} de ${fotos.length}`}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
