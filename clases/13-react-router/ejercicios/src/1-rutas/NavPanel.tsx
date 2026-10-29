// Ejercicio 1 · ver README.md de esta carpeta.
// Sin layout todavía: cada página dibuja su propia NavPanel.
export default function NavPanel() {
  // TODO (1): estos <a> recargan la página entera. Pasarlos a <Link>.
  return (
    <nav className="nav-panel">
      <strong>🏠 Mi inmobiliaria</strong>
      <a href="/1/">Mis propiedades</a>
      <a href="/1/visitas">Visitas</a>
      <a href="/1/consultas">Consultas</a>
      <a href="/1/reportes">Reportes</a>
    </nav>
  );
}
