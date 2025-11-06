export function HomePage() {
    return (
        <div className="example-container">
            <h2>Bienvenido a los Ejemplos de React - Clase III</h2>
            <p>
                Este proyecto contiene ejemplos interactivos de los conceptos avanzados de React:
            </p>

            <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
                <section>
                    <h3 style={{ color: '#646cff' }}>🌐 Context API</h3>
                    <p>
                        Aprende a compartir estado entre componentes sin prop drilling:
                    </p>
                    <ul>
                        <li><strong>1.1 Tema:</strong> Sistema de temas light/dark</li>
                        <li><strong>1.2 Auth:</strong> Autenticación con login/logout</li>
                        <li><strong>1.3 Cart:</strong> Carrito de compras con useReducer</li>
                    </ul>
                </section>

                <section>
                    <h3 style={{ color: '#646cff' }}>🎣 Custom Hooks</h3>
                    <p>
                        Crea hooks reutilizables para lógica compartida:
                    </p>
                    <ul>
                        <li><strong>2.1 LocalStorage:</strong> Persistir estado automáticamente</li>
                        <li><strong>2.2 Fetch:</strong> Hook para llamadas HTTP</li>
                        <li><strong>2.3 Debounce:</strong> Retrasar ejecución de funciones</li>
                        <li><strong>2.4 Toggle:</strong> Manejar valores booleanos</li>
                    </ul>
                </section>

                <section>
                    <h3 style={{ color: '#646cff' }}>🛣️ React Router</h3>
                    <p>
                        Implementa navegación en Single Page Applications:
                    </p>
                    <ul>
                        <li><strong>3.1 Usuarios:</strong> Rutas dinámicas con useParams</li>
                        <li><strong>3.2 Productos:</strong> Rutas anidadas con Outlet</li>
                        <li><strong>3.3 Posts:</strong> Data loading con loaders</li>
                    </ul>
                </section>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#2a2a2a', borderRadius: '8px' }}>
                <h3>🎯 Cómo usar este proyecto</h3>
                <ol>
                    <li>Usa los links de navegación arriba para ver cada ejemplo</li>
                    <li>Cada ejemplo es interactivo - prueba todos los botones y controles</li>
                    <li>Lee las explicaciones al final de cada ejemplo</li>
                    <li>Inspecciona el código fuente para entender la implementación</li>
                    <li>Experimenta modificando los valores y viendo los resultados</li>
                </ol>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#1a1a1a', border: '1px solid #646cff', borderRadius: '8px' }}>
                <h3>📚 Recursos</h3>
                <p>Consulta el README.md para:</p>
                <ul>
                    <li>Descripción detallada de cada ejemplo</li>
                    <li>Conceptos de React explicados</li>
                    <li>Estructura del proyecto</li>
                    <li>Instrucciones de instalación</li>
                </ul>
            </div>
        </div>
    );
}

