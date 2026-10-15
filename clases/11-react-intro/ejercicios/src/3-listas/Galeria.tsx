// Ejercicio 3.1 — ver README.md de esta carpeta.
type GaleriaProps = {
  fotos: string[];
  titulo: string;
};

export default function Galeria({ fotos, titulo }: GaleriaProps) {
  return (
    <>
      <img className="foto-principal" src={fotos[0]} alt={titulo} />
      {/* TODO: una miniatura por cada foto */}
    </>
  );
}
