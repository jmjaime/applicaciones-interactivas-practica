// Componente Navigation - Sistema de navegación simple entre páginas
interface Props {
    paginaActual: string
    cambiarPagina: (pagina: string) => void
}

function Navigation({ paginaActual, cambiarPagina }: Props) {
    const paginas = [
        { id: 'home', titulo: '🏠 Inicio', descripcion: 'Página principal' },
        { id: 'basico', titulo: '1️⃣ Básico', descripcion: 'Componente simple' },
        { id: 'props', titulo: '2️⃣ Props', descripcion: 'Pasar datos' },
        { id: 'estado', titulo: '3️⃣ Estado', descripcion: 'useState hook' },
        { id: 'listas', titulo: '4️⃣ Listas', descripcion: 'Renderizar arrays' },
        { id: 'eventos', titulo: '5️⃣ Eventos', descripcion: 'Interactividad' }
    ]

    return (
        <nav className="navigation">
            <div className="nav-container">
                {paginas.map(pagina => (
                    <button
                        key={pagina.id}
                        className={`nav-button ${paginaActual === pagina.id ? 'active' : ''}`}
                        onClick={() => cambiarPagina(pagina.id)}
                        title={pagina.descripcion}
                    >
                        {pagina.titulo}
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default Navigation
