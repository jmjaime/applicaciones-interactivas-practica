// Ejercicio 4.2 — ver README.md de esta carpeta.
type MeInteresaProps = {
  interesados: number;
};

export default function MeInteresa({ interesados }: MeInteresaProps) {
  // TODO: botón que se marca y desmarca, y el contador de interesados que lo refleja
  return <p className="mensaje">Pendiente: {interesados} interesados</p>;
}
