import { Link } from 'react-router-dom'

export function NotFoundPage() {
    return (
        <div className="example-container">
            <h2>404 - Página no encontrada</h2>
            <p style={{ color: '#888' }}>La página que buscas no existe.</p>
            <Link to="/">
                <button style={{ marginTop: '1rem' }}>🏠 Volver al inicio</button>
            </Link>
        </div>
    );
}

