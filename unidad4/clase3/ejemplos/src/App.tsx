import { Link, useLocation, Outlet } from 'react-router-dom'
import './App.css'

function App() {
    const location = useLocation()

    return (
        <div className="app">
            <header style={{ marginBottom: '2rem' }}>
                <h1>🚀 React Clase III - Ejemplos</h1>
                <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                    Context API, Custom Hooks y React Router
                </p>
            </header>

            <nav className="nav">
                <Link
                    to="/"
                    className={location.pathname === '/' ? 'active' : ''}
                >
                    🏠 Home
                </Link>

                <span style={{ padding: '0.5rem', color: '#888' }}>Context API:</span>
                <Link
                    to="/context/theme"
                    className={location.pathname === '/context/theme' ? 'active' : ''}
                >
                    1.1 Tema
                </Link>
                <Link
                    to="/context/auth"
                    className={location.pathname === '/context/auth' ? 'active' : ''}
                >
                    1.2 Auth
                </Link>
                <Link
                    to="/context/cart"
                    className={location.pathname === '/context/cart' ? 'active' : ''}
                >
                    1.3 Cart
                </Link>

                <span style={{ padding: '0.5rem', color: '#888' }}>Custom Hooks:</span>
                <Link
                    to="/hooks/localstorage"
                    className={location.pathname === '/hooks/localstorage' ? 'active' : ''}
                >
                    2.1 LocalStorage
                </Link>
                <Link
                    to="/hooks/fetch"
                    className={location.pathname === '/hooks/fetch' ? 'active' : ''}
                >
                    2.2 Fetch
                </Link>
                <Link
                    to="/hooks/debounce"
                    className={location.pathname === '/hooks/debounce' ? 'active' : ''}
                >
                    2.3 Debounce
                </Link>
                <Link
                    to="/hooks/toggle"
                    className={location.pathname === '/hooks/toggle' ? 'active' : ''}
                >
                    2.4 Toggle
                </Link>

                <span style={{ padding: '0.5rem', color: '#888' }}>React Router:</span>
                <Link
                    to="/router/users"
                    className={location.pathname.startsWith('/router/users') ? 'active' : ''}
                >
                    3.1 Usuarios
                </Link>
                <Link
                    to="/router/products"
                    className={location.pathname.startsWith('/router/products') ? 'active' : ''}
                >
                    3.2 Productos
                </Link>
                <Link
                    to="/router/posts"
                    className={location.pathname.startsWith('/router/posts') ? 'active' : ''}
                >
                    3.3 Posts
                </Link>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer style={{ marginTop: '3rem', padding: '2rem', textAlign: 'center', color: '#666', borderTop: '1px solid #444' }}>
                <p>React Clase III - Ejemplos Interactivos</p>
                <p style={{ fontSize: '0.9em' }}>
                    Context API · Custom Hooks · React Router
                </p>
            </footer>
        </div>
    )
}

export default App

