type HeaderProps = {
  cantidadFavoritos: number;
};

export default function Header({ cantidadFavoritos }: HeaderProps) {
  return (
    <header className="header">
      <strong>🏠 Inmobi</strong>
      <span className="contador">❤️ {cantidadFavoritos}</span>
    </header>
  );
}
